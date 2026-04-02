const { resolve } = require("path");
const { URLSearchParams } = require("url");

/* ---全局变量配置开始--- */
const CACHE_NAME = 'player-utils-sw-cache-v1';  // 缓存名称
const VIDEO_EXTENSIONS = ['.m3u8'];  // 要拦截的视频扩展名
const MONITORED_PAGES = new Set();  // 要监控的页面集合
const MONITORED_CLIENTS = new Map();  // 客户端ID到页面ID的映射

let mediaHeaders = {};  // 媒体请求的请求头
let xhrHeaders = {};    // XHR请求的请求头
let isIOS = false;      // 是否是iOS设备
let activeConnections = new Map();  // 活跃连接记录
let broadcastChannel = null;  // 用于页面间通信 用于跨页面通信BroadcastChannel 实例
let headersReady = false;  // 请求头是否已准备好
let activePages = new Set();  // 活跃页面集合
let unregisterTimer = null;  // 卸载定时器
let receivedHeadersHash = null;  // 已收到请求头的哈希值 
/* ---全局变量配置结束--- */
/* ---核心功能函数开始--- */
/*1.请求类型判断函数*/
// 判断是否为m3u8视频流请求  
function isVideoStreamRequest(url) {
    if (!url) return false;
    const urlStr = String(url).toLowerCase();
    return VIDEO_EXTENSIONS.some(ext => {
        return urlStr.includes(ext) &&
            (urlStr.includes('.m3u8') ||
                urlStr.includes('m3u8?'));
    });
}
// 判断是否为Media请求   
// function isMediaRequest(request) {
//     const destination = request.destination;
//     const mode = request.mode;

//     const isMediaDest = destination === 'video' || destination === 'audio' || destination === 'track';
//     const isNoCors = mode === 'no-cors';

//     console.log('请求分析:', {
//         url: request.url,
//         destination: destination,
//         mode: mode,
//         isMediaDest: isMediaDest,
//         isNoCors: isNoCors
//     });

//     return isMediaDest || isNoCors;
// }
// 判断是否为Media请求，优化后函数  
function isMediaRequest(request) {
    const url = request.url.toLowerCase();
    const destination = request.destination || '';
    const accept = request.headers.get('Accept') || '';

    // 1. 基于destination判断（最可靠）
    const mediaDestinations = ['audio', 'video', 'track'];
    if (mediaDestinations.includes(destination)) {
        return true;
    }

    // 2. 基于Content-Type/Accept头部判断
    const mediaContentTypes = [
        'audio/', 'video/', // 音频/视频类型
        'application/x-mpegurl',  // HLS流媒体
        'application/dash+xml',   // DASH流媒体
        'application/vnd.apple.mpegurl' // Apple流媒体
    ];

    // 检查Accept头是否包含媒体类型
    if (mediaContentTypes.some(type => accept.includes(type))) {
        return true;
    }

    // 3. 基于文件扩展名判断（后备方案）
    let pathname;
    try {
        pathname = new URL(url).pathname.toLowerCase(); // 获取URL路径并转为小写
    } catch (e) {
        // 无效URL格式，跳过扩展名判断
        return false;
    }

    // 使用Set优化查找性能
    const mediaExtensions = new Set([
        // 视频扩展名
        '.mp4', '.webm', '.avi', '.mkv', '.mov', '.m4v', '.flv', '.wmv',
        // 音频扩展名
        '.mp3', '.wav', '.ogg', '.m4a', '.aac', '.flac',
        // 流媒体/字幕扩展名
        '.m3u8', '.mpd', '.vtt', '.srt'
    ]);

    // 检查文件扩展名是否为媒体格式
    for (const ext of mediaExtensions) {
        if (pathname.endsWith(ext)) {
            return true;
        }
    }
    return false;
}
// 判断是否为XRH请求（通常用于跨域请求）
function isXHRRequest(request) {
    // 请求目标  
    // const destination = request.destination; // 请求目标  
    // const mode = request.mode; // 请求模式  

    // const isEmptyDest = destination === ''; // 判断是否为空目标（XHR特征）
    // const isCors = mode === 'cors'; // 判断是否为CORS模式（跨域请求）
    // return isEmptyDest && isCors;  // 同时满足这两个条件则为XHR请求
    return request.destination === '' && request.mode === 'cors';
}
/** 请求处理函数 */
// 为XHR请求添加请求头（直接修改Headers）
function cloneRequestForXHR(originalRequest) {
    try {

        //1.从原始请求复制headers  处理XHR请求，使用XHR专用请求头
        const headers = new Headers(originalRequest.headers);
        //2.添加/覆盖 XHR特定的headers 遍历xhrHeaders对象，将所有请求头添加到新的Headers中
        // Object.entries(xhrHeaders) 是将对象转换为键值对数组，且是二维数组
        Object.entries(xhrHeaders).forEach(([key, value]) => {
            if (value !== undefined && value !== null) {
                headers.set(key, String(value)); // 设置请求头  
                console.log(`添加XHR请求头：${key}=${value}`);
            }
        })

        // 创建新的Request对象，包含新的请求头  
        const newRequest = new Request(originalRequest, {
            headers: headers, //  使用新的headers，完全替换，不是合并（除非手动合并）  
            mode: 'cors', // 明确指定为CORS模式  
            credentials: 'omit' // 不发送凭证信息  omit 是省略的意思
        })

        // 调试日志  
        console.log('XHR新请求的请求头：', Array.from(newRequest.headers.entries()));
        console.log('XHR新请求的mode', newRequest.mode);
        return newRequest; // 返回新的请求对象

        // 3.返回新的Request对象 Request构造函数优势
        // 第一个参数复制所有属性（method,url,body等）
        // 第二个参数只覆盖headers,其他属性保持不变
        // return new Request(originalRequest, { headers: headers });
    } catch (error) {
        // console.error('克隆XHR请求失败：',error);
        return originalRequest; // 出错时返回原始请求
    }
}
// 为Media请求处理 - 使用URL参数方式  
function createRequestForMedia(originalRequest) {
    console.log('处理Media请求，使用Media专用请求头');
    // const originalUrl = originalRequest.url;  //获取原始URL  
    // console.log('原始URL：', originalUrl);
    // const params = new URLSearchParams(); // 创建URL参数对象  
    // 将mediaHeaders转为URL参数  
    // Object.entries(mediaHeaders).forEach(([key, value]) => {
    //     if (value !== undefined && value !== null) {
    //         params.append(key, String(value)); // 添加参数  
    //         console.log(`添加Media请求头参数：${key}=${value}`);
    //     }
    // });
    // const urlObj = new URL(originalUrl);// 解析原始URL  
    // const newParams = new URLSearchParams(urlObj.search); // 获取原始URL的查询参数  
    // // 将新的参数合并到原始参数中  
    // params.forEach((value, key) => {
    //     newParams.append(key, value);
    // })

    // urlObj.search = newParams.toString(); // 更新URL的查询字符串  
    // const newUrl = urlObj.toString(); // 生成新的URL
    // console.log('新URL', newUrl);

    // 创建新的Request对象，使用新的URL  
    // const newRequest = new Request(newUrl, {
    //     method: originalRequest.method, // 保持原始方法
    //     headers: originalRequest.headers,// 保持原始headers  
    //     mode: originalRequest.mode, // 保持原始mode
    //     credentials: originalRequest.credentials, // 保持原始credentials
    //     cache: originalRequest.cache, // 保持原始缓存策略  
    //     redirect: originalRequest.redirect, // 保持原始重定向策略  
    //     referrer: originalRequest.referrer,// 保持原始referrer 
    //     referrerPolicy: originalRequest.referrerPolicy, //保持原始referrer 策略  
    //     integrity: originalRequest.integrity //  保持原始完整性检查
    // })

    // 调试日志 
    // console.log('Media新请求的URL：', newRequest.url);
    // console.log('Media新请求的mode：', newRequest.mode);
    // console.log("Media新请求的destination:", newRequest.destination);
    // return newRequest; // 返回新的请求对象

    // 为媒体请求添加请求头 (通过URL参数方式)  
    const urlObj = new URL(originalRequest.url);
    const params = new URLSearchParams(urlObj.search);
    // 将请求头转为URL参数
    Object.entries(mediaHeaders).forEach(([key, value]) => {
        params.append(key, String(value));
    })
    urlObj.search = params.toString();
    const newUrl = urlObj.toString();
    return new Request(newUrl, {
        method: originalRequest.method,
        headers: originalRequest.headers,
        // 保持原始请求的其他属性
    })
}

// 为Media请求处理NEW - 使用URL参数方式
function createRequestForMedia(originalRequest) {
    try {
        // 1.日志记录，标识正在处理 Media 请求
        console.log('处理Media请求，使用Media专用请求头');

        const originalUrl = originalRequest.url;
        console.log('原始URL:', originalUrl);

        // 2.从 mediaHeaders 构造 URLSearchParams
        // mediaHeaders 应是一个对象
        const params = new URLSearchParams();
        Object.entries(mediaHeaders).forEach(([key, value]) => {
            if (value !== undefined && value !== null) {
                params.append(key, String(value));
                console.log(`添加Media请求头参数: ${key}=${value}`);
            }
        });

        // 3.解析原始 URL,获取其现有的查询参数
        const urlObj = new URL(originalUrl);
        const newParams = new URLSearchParams(urlObj.search);

        // 4.将新的参数合并到现有参数中（保留原有参数，追加新参数）
        params.forEach((value, key) => {
            append(name, value); // 会在现有参数后追加，不会覆盖已有的同名参数，设置（替换）某个参数的值，使用set(name,value)。
            newParams.append(key, value);
        });

        // 5. 更新 URL 的查询字符串，生成新的 URL
        urlObj.search = newParams.toString(); // 修改 params 后，需要重新赋值给 urlObj.search 才能让原URL对象生效
        const newUrl = urlObj.toString();
        console.log('新URL:', newUrl);

        // 6.基于新 URL 创建新的Request对象
        // 原请求的方法、头、模式等属性均被保留
        const newRequest = new Request(newUrl, {
            method: originalRequest.method,
            headers: originalRequest.headers,
            mode: originalRequest.mode,
            credentials: originalRequest.credentials,
            cache: originalRequest.cache,
            redirect: originalRequest.redirect,
            referrer: originalRequest.referrer,
            referrerPolicy: originalRequest.referrerPolicy,
            integrity: originalRequest.integrity
        });

        // 7.输出新请求的部分属性，便于调试
        console.log('Media新请求的URL:', newRequest.url);
        console.log('Media新请求的mode:', newRequest.mode);
        console.log('Media新请求的destination:', newRequest.destination);

        return newRequest;
    } catch (error) {
        // 任何异常都回退到原始请求，保证业务不中断
        console.error('创建Media请求失败:', error);
        return originalRequest;
    }
}

// 为Media请求处理 - 使用URL参数方式
// function createRequestForMedia(originalRequest) {
//     try {
//         console.log('处理Media请求，使用Media专用请求头');
//         const originalUrl = originalRequest.url; // 获取原始URL  
//         console.log('原始URL：', originalUrl);

//         const params = new URLSearchParams(); // 创建URL参数对象  
//         // 将mediaHeaders 转为 URL参数  
//         Object.entries(mediaHeaders).forEach(([key, value]) => {
//             if (value !== undefined && value !== null) {
//                 params.append(key, String(value));// 添加参数
//                 console.log(`添加Media请求头参数：${key}=${value}`);
//             }
//         })
//         const urlObj = new URL(originalUrl);// 解析原始URL  
//         const newParams = new URLSearchParams(urlObj.search);// 获取原始URL的查询参数  
//         // 将新的参数合并到原始参数中  
//         params.forEach((value, key) => {
//             newParams.append(key, value);
//         })
//         urlObj.search = newParams.toString();// 更新URL的查询字符串  
//         const newUrl = urlObj.toString(); // 生成新的URL  
//         console.log('新URL：', newUrl);
//         // 创建新的Request对象，使用新的URL  
//         const newRequest = new Request(newUrl, {
//             method: originalRequest.method, // 保持原始方法
//             headers: originalRequest.headers,// 保持原始headers
//             mode: originalRequest.mode,// 保持原始mode
//             credentials: originalRequest.credentials,//保持原始credentials
//             cache: originalRequest.cache,// 保持原始缓存策略
//             redirect: originalRequest.redirect,//保持原始重定向策略  
//             referrer: originalRequest.referrer,// 保持原始referrer策略      
//             integrity: originalRequest.integrity // 保持原始完整性检查
//         });
//         // 调试日志  
//         console.log('Media新请求的URL：', newRequest.url);
//         console.log('Media新请求的mode：', newRequest.mode);
//         console.log('Media新请求的destination:', newRequest.destination);
//         return newRequest; // 返回新的请求对象
//     } catch (error) {
//         console.error('创建Media请求失败：', error);
//         return originalRequest; // 出错时返回原始请求
//     }
// }

// 等待请求头准备就绪，异步等待函数   
async function waitForHeadersReady() {
    if (headersReady) return true; // 如果已经准备好，直接返回  
    console.log("等待请求头准备……");
    const maxWaitTime = 3000; // 最大等待时间3秒  
    const startTime = Date.now(); // 开始时间  
    // 循环等待直到headersReady变为true或超时   
    while (!headersReady && Date.now() - startTime < maxWaitTime) {
        await new Promise(resolve => setTimeout(resolve, 100)); // 每轮等待100ms，不占用 CPU 资源
    }
    // 3.循环结束后检查是成功还是超时
    if (!headersReady) {
        console.warn("等待请求头超时，使用空请求头继续");
    }
    // 返回最终状态（true 表示已准备好，false 表示超时）
    return headersReady;  // 返回是否已准备好
}

// 判断客户端是否应该被监控，用于判断是否应该监控某个客户端（通常是 Service Worker 控制下的页面或 worker）
// 定义为 async 函数，内部可以使用 await 等待异步操作。
// 函数作用 输入：`clientId`(字符串，客户端的唯一标识)，通常来自clients.matchAll() 或 clients.get() 等方法。  
// 输出：`Promise<boolean>`,表示该客户端是否应该被监控
async function shouldMonitorClient(clientId) {
    if (!clientId) return false; // 如果没有clientId,返回false  
    try {
        // 根据 clientId 获取客户端信息  
        const client = await self.clients.get(clientId); // self.clients 是 Service Worker 全局对象上的 Clients 接口，用于获取当前 Service Worker 控制下的所有客户端。 
        // self.clients.get(clientId) 返回一个 Promise,解析后得到对应的 Client 对象（例如 WindowClient 或 WorkerClient）。
        // 如果找不到对应客户端，client 为 undefined。
        if (client && client.url) {
            const pageUrl = new URL(client.url); // 解析客户端URL，解析出URL对象  
            const pagePath = pageUrl.pathname; // 获取路径  
            const pageName = pagePath.split('/').pop(); // 获取页面名称  
            // 只监控A.html和B.html  
            return pageName === 'A.html' || pageName === 'B.html'
        }
    } catch (error) {
        console.warn('获取客户端信息失败：', error);
    }
    return false; // 默认返回false
}
/* 生成请求头哈希  
* 它的作用是将一个传入的请求头（headers对象）转换成一个稳定的、与服务端一致的哈希字符串，* 常用于缓存键、签名校验或请求去重等场景。
* 接收一个 headers 对象，通常是从 HTTP 请求中提取的键值对
*/
function generateHeadersHash(headers) {
    try {
        const stableHeaders = {}; // 创建一个稳定的headers对象  
        // 提取所有键名，进行字典序排序（`sort()`）,保证无论原始对象中键的顺序如何，最终输出的顺序都一致。
        Object.keys(headers).sort().forEach(key => {
            const value = headers[key];
            // 排除undefined和函数  
            if (value !== undefined && typeof value !== 'function') {
                stableHeaders[key] = String(value); // 转为字符串
            }
        });
        const jsonStr = JSON.stringify(stableHeaders);// 所有值都是字符串的普通对象，转为JSON字符串，作为哈希的输入数据  
        // 计算哈希值
        let hash = 0; // 初始哈希值  
        // 简单的哈希算法  
        for (let i = 0; i < jsonStr.length; i++) {
            const char = jsonStr.charCodeAt(i); // 这是一个简单的非加密哈希
            hash = ((hash << 5) - hash) + char; // hash << 5 相当于乘以32，(hash << 5) - hash 就是 hash * 31
            // hash = hash & hash;
            // hash = hash & 0xffffffff;
        }
        return 'hash-' + Math.abs(hash).toString(36); // 返回基于36进制的哈希值
    } catch (error) {
        console.warn('生成请求头哈希失败：', error);
        return 'error-hash-' + Date.now(); // 出错时返回带时间戳的错误哈希
    }
}




// Fetch事件处理  
// async function handleFetch(event) {
//     const request = event.request;  // 获取请求对象
//     const url = request.url; // 获取请求URL
//     const clientId = event.clientId; // 获取请求客户端ID
//     console.log('clientId----', clientId);
//     // 只处理来自监控页面的请求  
//     if (!MONITORED_CLIENTS.has(clientId)) {
//         return fetch(request);
//     }
//     // 只处理m3u8请求  
//     if (isVideoStreamRequest(url)) {
//         await waitForHeadersReady(); // 等待请求头准备  
//         // 判断请求类型并添加对应的请求头  
//         if (isXHRRequest(request)) {
//             const newRequest = cloneRequestForXHR(request);
//             return fetch(newRequest);
//         } else if (isMediaRequest(request)) {
//             const newRequest = createRequestForMedia(request);
//             return fetch(newRequest);
//         }
//     }
//     return fetch(request);
// }
// Service Worker 中Fetch事件处理函数
// 这是一个异步函数，接收一个 fetch 事件对象event
async function handleFetch(event) {
    // 职责：拦截请求，根据条件决定是否进行特殊处理，否则直接放行
    const request = event.request; // 获取请求对象  
    const url = request.url; // 获取请求URL  
    const clientId = event.clientId; // 获取客户端ID,clientId 是发起请求的客户端（页面/worker）的唯一标识，用于区分不同的页面实例  

    console.log('Service Worker拦截到请求：', url);
    console.log('请求来源客户端ID：', clientId);
    // 检查请求是否来自被监控的页面只处理来自被监控页面的请求  
    if (clientId) {
        const pageId = MONITORED_CLIENTS.get(clientId); //根据clientId 获取页面ID
        if (!pageId) {
            console.log('客户端未在监控列表中，直接放过');
            return fetch(request); // 直接返回原始请求
        }
        const shouldMonitor = await shouldMonitorClient(clientId); // 检查是否应该监控  
        if (!shouldMonitor) {
            console.log('非监控页面请求，直接放过');
            return fetch(request); // 直接返回原始请求
        }
    } else {
        console.log('无客户端ID，直接放过');
        return fetch(request); // 直接返回原始请求
    }
    // 只处理GET请求或带Range头的请求（视频分片请求）
    if (request.method !== 'GET' && !request.headers.get('Range')) {
        // 检查请求头中是否没有Range字段  
        // Range 头用于请求部分内容（如视频/音频的断点续传、大文件分块下载）
        console.log('跳过非GET请求', url);
        return fetch(request); // 直接返回原始请求 
    }
    // 如果是视频流请求  
    if (isVideoStreamRequest(url)) {
        console.log('识别为视频流请求', url);
        await waitForHeadersReady(); // 等待请求头准备就绪  
        const isMedia = isMediaRequest(request); // 判断是否是媒体请求  
        const isXHR = isXHRRequest(request);  // 判读是否为XHR请求   
        console.log('请求类型判断', {
            isMedia: isMedia,
            isXHR: isXHR,
            isIOSDevice: isIOS
        });
        // 重要：这里简化了，实际应该根据isMedia和isXHR使用不同的处理方式  
        let newRequest = cloneRequestForXHR(request); // 使用XHR方式处理  
        try {
            console.log('开始发起请求...');
            const response = await fetch(newRequest);

            console.log('请求响应状态:', response.status, response.statusText);
            console.log('响应类型:', response.type);
            console.log('响应Content-Type:', response.headers.get('content-type'));

            return response;
        } catch (error) {
            console.log('视频流请求失败：', error);
            console.log('降级到原始请求');
            return fetch(request); // 失败时返回原始请求
        }
    }

    return fetch(request);
}
/** Service Worker消息处理 
 * 维护 Service Worker内部的状态（如请求头信息、活跃页面列表、监控客户端映射），并响应页面的生命周期事件(加载、卸载、启用监控、设置请求头)。
*/
function handleMessage(event) {
    const data = event.data;
    switch (data.type) {
        case 'SET_HEADERS':
            // 接收页面发送的请求头  
            // 用途：页面在初始化时，将需要注入到视频请求中的自定义头部（如鉴权token、用户标识等）发送给Service Worker。
            mediaHeaders = data.mediaHeaders || {};
            xhrHeaders = data.xhrHeaders || {};
            isIOS = data.isIOS || false;
            headersReady = true; // 表示头部信息已就绪
            break;
        case 'PAGE_LOAD':
            // 页面加载通知  
            // 用途：记录当前有哪些页面处于活跃状态
            activePages.add(data.pageId); // pageId：页面的唯一标识符，由页面自己生成并发送。
            break;
        case "ENABLE_MONITORING":
            // 启用页面监控
            MONITORED_PAGES.add(data.pageId);
            if (event.source.id) {
                MONITORED_CLIENTS.set(event.source.id, data.pageId);
            }
            break;
        case 'PAGE_UNLOAD':
            //页面卸载清理
            cleanupPageResources(data.pageId);
            break;

    }
}

/** Service Worker生命周期事件 */
// 安装事件
self.addEventListener('install', (event) => {
    console.log('Service Worker安装成功');
    self.skipWaiting(); // 跳过等待，立即激活
});
/** Service Worker 首次安装时触发
 * skipWaiting()：强制旧的Service Worker立刻退役，让新版本立即生效。  
 * 通常在这里进行资源预缓存
 */
// 激活事件 activate 
self.addEventListener('activate', (event) => {
    console.log("Service Worker激活成功");
    event.waitUntil(self.clients.claim()); // 立即接管所有客户端
});
/** Service Worker 激活时触发
 * clients.claim():让 Service Worker 立即控制所有打开的页面
 * 通常在这里清理旧缓存
 */
// 拦截Fetch请求  
self.addEventListener('fetch', (event) => {
    if (isVideoStreamRequest(event.request.url)) {
        event.respondWith(handleFetch(event));
    }
});
/** 作用：拦截所有网络请求  
 * isVideoStreamRequest():自定义函数，判断是否为视频流请求 
 * event.respondWith():劫持请求，返回自定义响应  
 * 常见应用：缓存策略、请求修改、离线备用
*/
// 监听消息  
self.addEventListener("message", handleMessage);
/**
 * 作用：实现页面与 Service Worker 的双向传递  
 * 页面可通过 navigator.serviceWorker.controller.postMessage() 发送消息
 * Service Worker 可向页面发送消息响应  
*/



/* ---核心功能函数结束--- */

/* > self 在 `Service Worker` 中是一个特殊的全局对象，它代表`Service Worker`自身的全* 局作用域。
* 一、`self`的由来
* 1.运行环境决定的
* Service Worker 运行在**独立的线程中**（不是主线程）
* 浏览器会为每个`Service Worker`创建一个`ServiceWorkerGlobalScope`全局环境
* `self`就是这个全局环境的引用，类似于：
* 主线程中的`window`
* Web Worker 中的`self`或`this`
* Node.js 中的 `global`
* 2.自动注入
*/
// 浏览器内部处理示意  
const serviceWorkerScope = new ServiceWorkerGlobalScope();
serviceWorkerScope.self = serviceWorkerScope;  // self 指向自身 
// 然后在这个作用域中执行你的 Service Worker 代码 
executeScriptInScope(yourCode, serviceWorkerScope);
/*
* 二、`self`的核心特性
* 1.指向`ServiceWorkerGlobalScope`  
*/
console.log(self instanceof ServiceWorkerGlobalScope); //true
console.log(self === this); // 在全局作用域中为true  
/* 包含的专有API
* Service Worker 专有方法
*/
// 事件目标方法（继承自 EventTarget）
self.addEventListener();
// 客户端管理
self.clients(); // Clients 接口  
// 注册信息  
self.registration //ServiceWorkerRegistration   

/**
 * 三、为什么需要`self`
 * 1.区分作用域
 */
//在主页面中
// window.addEventListener('load',...); 监听页面加载
// 在Service Worker 中
//self.addEventListener('install',...); // 监听 SW安装
/** 2.确保在正确的上下文中 */
// 这几种写法在 Service Worker 全局作用域中是等价的  
self.addEventListener('fetch', handler);
this.addEventListener('fetch', handler);
addEventListener('fetch', handler); // 隐式使用全局对象  

// 但在函数内部就不一样了  
function setup() {
    // 这里必须用 self,因为 this 指向函数上下文
    self.addEventListener('fetch', handler);
}

// self 是从哪里来的
/**
 * self 是浏览器在`Service Worker`运行时自动创建并注入的。让我从根源上解释：
 * 一、浏览器引擎层面的来源
*/

// 1.创建流程
// 浏览器内部的创建过程  
function createServiceWorker(scriptURL) {
    // 1.创建独立的 JavaScript 运行环境  
    const globalScope = new ServiceWorkerGlobalScope();
    // 2.自动注入 self 引用  
    Object.defineProperty(globalScope, 'self', {
        value: globalScope,
        writable: false,
        configurable: false
    })
    // 3.在这个环境中执行你的`Server Worker`代码  
    executeJavaScriptInScope(scriptCode, globalScope);
    return globalScope;
}

