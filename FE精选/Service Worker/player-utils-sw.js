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
let broadcastChannel = null;  // 用于页面间通信
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
        'audio/', 'video/',
        'application/x-mpegurl',  // HLS
        'application/dash+xml',   // DASH
        'application/vnd.apple.mpegurl'
    ];

    if (mediaContentTypes.some(type => accept.includes(type))) {
        return true;
    }

    // 3. 基于文件扩展名判断（后备方案）
    const pathname = new URL(url).pathname;
    const mediaExtensions = [
        // 视频
        '.mp4', '.webm', '.avi', '.mkv', '.mov', '.m4v', '.flv', '.wmv',
        // 音频
        '.mp3', '.wav', '.ogg', '.m4a', '.aac', '.flac',
        // 流媒体/字幕
        '.m3u8', '.mpd', '.vtt', '.srt'
    ];

    return mediaExtensions.some(ext => pathname.endsWith(ext));
}
// 判断是否为XRH请求（通常用于跨域请求）
function isXHRRequest(request) {
    return request.destination === '' && request.mode === 'cors';
}
/** 请求处理函数 */
// 为XHR请求添加请求头（只接修改Headers）
function cloneRequestForXHR(originalRequest) {
    //1.从原始请求复制headers 
    const headers = new Headers(originalRequest.headers);
    //2.添加/覆盖 XHR特定的headers
    Object.entries(xhrHeaders).forEach(([key, value]) => {
        headers.set(key, String(value));
    })
    // 3.返回新的Request对象 Request构造函数优势
    // 第一个参数复制所有属性（method,url,body等）
    // 第二个参数只覆盖headers,其他属性保持不变
    return new Request(originalRequest, { headers: headers });
}
// 为Media请求处理 - 使用URL参数方式  
function createRequestForMedia(originalRequest) {
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
// Fetch事件处理  
async function handleFetch(event) {
    const request = event.request;
    const url = request.url;
    const clientId = event.clientId; // 请求来源的客户端ID  
    // 只处理来自监控页面的请求  
    if (!MONITORED_CLIENTS.has(clientId)) {
        return fetch(request);
    }
    // 只处理m3u8请求  
    if (isVideoStreamRequest(url)) {
        await waitForHeadersReady(); // 等待请求头准备  
        // 判断请求类型并添加对应的请求头  
        if (isXHRRequest(request)) {
            const newRequest = cloneRequestForXHR(request);
            return fetch(newRequest);
        } else if (isMediaRequest(request)) {
            const newRequest = createRequestForMedia(request);
            return fetch(newRequest);
        }
    }
    return fetch(request);
}
/** 消息处理 */
function handleMessage(event) {
    const data = event.data;
    switch (data.type) {
        case 'SET_HEADERS':
            // 接收页面发送的请求头  
            mediaHeaders = data.mediaHeaders || {};
            xhrHeaders = data.xhrHeaders || {};
            isIOS = data.isIOS || false;
            headersReady = true;
            break;
        case 'PAGE_LOAD':
            // 页面加载通知  
            activePages.add(data.pageId);
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
// 激活事件  
self.addEventListener('activate', (event) => {
    console.log("Service Worker激活成功");
    event.waitUntil(self.clients.claim()); // 立即接管所有客户端
});
// 拦截Fetch请求  
self.addEventListener('fetch', (event) => {
    if (isVideoStreamRequest(event.request.url)) {
        event.respondWith(handleFetch(event));
    }
});
// 监听消息  
self.addEventListener("message", handleMessage);


/* ---核心功能函数结束--- */
