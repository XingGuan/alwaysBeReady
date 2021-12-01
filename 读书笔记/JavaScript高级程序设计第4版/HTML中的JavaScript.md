<!-- START doctoc generated TOC please keep comment here to allow auto update -->
<!-- DON'T EDIT THIS SECTION, INSTEAD RE-RUN doctoc TO UPDATE -->
<!-- **Table of Contents**  *generated with [DocToc](https://github.com/thlorenz/doctoc)* -->
 ## 一、拆阅章节(第二章)  
 ### HTML中的JavaScript  
 ### **目录**
  - [HTML中的JavaScript](#html%E4%B8%AD%E7%9A%84javascript)
    - [`<script>`元素](#script%E5%85%83%E7%B4%A0)
    - [`<script>`元素有下列8个属性](#script%E5%85%83%E7%B4%A0%E6%9C%89%E4%B8%8B%E5%88%978%E4%B8%AA%E5%B1%9E%E6%80%A7)
  - [使用`<script>`的方式有两种](#%E4%BD%BF%E7%94%A8script%E7%9A%84%E6%96%B9%E5%BC%8F%E6%9C%89%E4%B8%A4%E7%A7%8D)
  - [1.通过`<script>`标签直接在网页中嵌入`JavaScript`代码。](#1%E9%80%9A%E8%BF%87script%E6%A0%87%E7%AD%BE%E7%9B%B4%E6%8E%A5%E5%9C%A8%E7%BD%91%E9%A1%B5%E4%B8%AD%E5%B5%8C%E5%85%A5javascript%E4%BB%A3%E7%A0%81)
    - [1.1.1 标签位置](#111-%E6%A0%87%E7%AD%BE%E4%BD%8D%E7%BD%AE)
    - [1.1.2 推迟执行脚本](#112-%E6%8E%A8%E8%BF%9F%E6%89%A7%E8%A1%8C%E8%84%9A%E6%9C%AC)
    - [1.1.3 异步执行脚本](#113-%E5%BC%82%E6%AD%A5%E6%89%A7%E8%A1%8C%E8%84%9A%E6%9C%AC)
    - [1.1.4 动态加载脚本](#114-%E5%8A%A8%E6%80%81%E5%8A%A0%E8%BD%BD%E8%84%9A%E6%9C%AC)
    - [1.1.5 XHTML中的变化](#115-xhtml%E4%B8%AD%E7%9A%84%E5%8F%98%E5%8C%96)
  - [2.2 行内代码与外部文件](#22-%E8%A1%8C%E5%86%85%E4%BB%A3%E7%A0%81%E4%B8%8E%E5%A4%96%E9%83%A8%E6%96%87%E4%BB%B6)
  - [2.3 文档模式](#23-%E6%96%87%E6%A1%A3%E6%A8%A1%E5%BC%8F)
  - [2.4 `<noscript>`元素](#24-noscript%E5%85%83%E7%B4%A0)
- [总结](#总结)
- [本章内容思考？](#本章内容思考)

<!-- END doctoc generated TOC please keep comment here to allow auto update -->

#### `<script>`元素  
>这个元素是由网景公司创造出来，并
最早在 Netscape Navigator 2 中实现的。后来，这个元素被正式加入到 HTML 规范。  

#### `<script>`元素有下列8个属性
+ `async:async;(只对外部脚本文件有效)` 表示应该立即开始下载脚本,但不能阻止其他页面动作,比如下载资源或等待其他脚本加载。
+ `charset`使用src属性指定代码字符集。(仅适用于外部脚本)。  
+ `crossorigin`可选。配置相关请求的CORS(跨源资源共享)设置。默认不使用CORS。`crossorigin="anonymous"`配置文件请求不必设置凭据标志。`crossorigin="use-credentials"`设置凭据标志，意味着出站请求会包含凭据。  
+ `defer:defer;`规定当前页面已完成解析后,执行脚本(仅适用于外部脚本)。
+ `integrity:可选`允许比对接收到的资源和指定的加密签名以验证子资源的完整性(SRI,Subresource Integrity)。如果接收到的资源的签名与这个属性指定的签名不匹配,则页面会报错，脚本不会执行。这个属性可以用于确保内容分发网络(CDN,Content Delivery Network)不会提供恶意内容。
+ `language`废弃。最初用于表示代码块中的脚本语言(如"JavaScript"、"JavaScript 1.2"
或"VBScript")。大多数浏览器都会忽略这个属性,不应该再使用它。
+ `src`可选。表示包含要执行的代码的外部文件。
+ `type`：可选。代替 language，表示代码块中脚本语言的内容类型（也称 MIME 类型）。按照惯例，这个值始终都是"text/javascript"，尽管"text/javascript"和"text/ecmascript"都已经废弃了。JavaScript 文件的 MIME 类型通常是"application/x-javascript"，不过给type 属性这个值有可能导致脚本被忽略。在非 IE 的浏览器中有效的其他值还有"application/javascript"和"application/ecmascript"。如果这个值是 module，则代码会被当成 ES6 模块，而且只有这时候代码中才能出现 import 和 export 关键字。
### 使用`<script>`的方式有两种  
### 1.通过`<script>`标签直接在网页中嵌入`JavaScript`代码。  
要嵌入行内`JavaScript`代码，直接把代码放在`<script>`元素中就行：
```javascript     
<script> 
 function sayHi() { 
    console.log("Hi!"); 
 } 
</script> 
```
包含在`<script>`内的代码会被从上到下解释。在上面的代码中，被解释的是一个函数定义，并且该函数会被保存在解释器环境中。**在`<script>`元素中的代码被计算完成之前,页面的其余内容不会被加载,也不会被显示。**
>注:在使用行内JavaScript代码时，要注意代码中不能出现字符串`</script>`。比如，下面的代码会导致浏览器报错:
```javascript
<script> 
 function sayScript() { 
    console.log("</script>"); 
 } 
</script> 
```
浏览器解析行内脚本的方式决定了它在看到字符串</script>时，会将其当成结束的</script>标签。想避免这个问题，只需要转义字符“\”即可:
```javascript
<script> 
 function sayScript() { 
    console.log("<\/script>"); 
 } 
</script>

```
这样修改之后，代码就可以被浏览器完全解释，不会导致任何错误。
### 2.通过`<script>`标签在网页中包含外部JavaScript文件。  
要包含外部文件中的JavaScript,就必须使用`src`属性。这个属性的值是一个`URL`，指向包含JavaScript代码的文件,比如:
```javascript
<script src="example.js"></script> 
```  
这个例子在页面中加载了一个名为 example.js 的外部文件。文件本身只需包含要放在`<script>`的起始及结束标签中间的 JavaScript 代码。与解释行内 JavaScript 一样，在解释外部 JavaScript 文件时，页面也会阻塞。（阻塞时间也包含下载文件的时间。）在 XHTML 文档中，可以忽略结束标签，比如：
```javascript
<script src="example.js"/> 
```
以上语法不能在 HTML 文件中使用，因为它是无效的 HTML，有些浏览器不能正常处理，比如 IE。  

>注意 按照惯例，外部 JavaScript 文件的扩展名是.js。这不是必需的，因为浏览器不会检
查所包含 JavaScript 文件的扩展名。这就为使用服务器端脚本语言动态生成 JavaScript代码，或者在浏览器中将 JavaScript扩展语言（如TypeScript，或React的 JSX）转译为JavaScript提供了可能性。不过要注意，服务器经常会根据文件扩展来确定响应的正确 MIME 类型。如果不打算使用.js 扩展名，一定要确保服务器能返回正确的 MIME 类型。

使用了 `src` 属性的`<script>`元素不应该再在`<script>和</script>`标签中再包含其他
JavaScript 代码。如果两者都提供的话，则浏览器只会下载并执行脚本文件，从而忽略行内代码。  
`<script>`元素的一个最为强大、同时也备受争议的特性是，它可以包含来自外部域的 JavaScript文件。跟<img>元素很像，`<script>`元素的 src 属性可以是一个完整的 URL，而且这个 URL 指向的资源可以跟包含它的 HTML 页面不在同一个域中，比如这个例子：
```javascript
<script src="http://www.somewhere.com/afile.js"></script> 
```
浏览器在解析这个资源时，会向 src 属性指定的路径发送一个 GET 请求，以取得相应资源，假定是一个 JavaScript 文件。这个初始的请求不受浏览器同源策略限制，但返回并被执行的 JavaScript 则受限制。当然，这个请求仍然受父页面 HTTP/HTTPS 协议的限制。
来自外部域的代码会被当成加载它的页面的一部分来加载和解释。这个能力可以让我们通过不同的域分发 JavaScript。不过，引用了放在别人服务器上的 JavaScript 文件时要格外小心，因为恶意的程序员随时可能替换这个文件。在包含外部域的 JavaScript 文件时，要确保该域是自己所有的，或者该域是一个可信的来源。`<script>`标签的 integrity 属性是防范这种问题的一个武器，但这个属性也不是所有浏览器都支持。不管包含的是什么代码，浏览器都会按照`<script>`在页面中出现的顺序依次解释它们，前提是它们没有使用 defer 和async 属性。第二个`<script>`元素的代码必须在第一个`<script>`元素的代码解释完毕才能开始解释，第三个则必须等第二个解释完，以此类推。

#### 1.1.1 标签位置  
过去，所有`<script/>`元素都被放在页面的`<head>`标签内，这种做法的主要目的是把外部的CSS和JavaScript文件集中在一起。  

   **注:页面在浏览器解析到`<body>`的起始标签时开始渲染。对于需要很多 JavaScript 的页面，这会导致页面渲染的明显延迟，在此期间浏览器窗口完全空白。为解决这个问题，现代 Web 应用程序通常将所有 JavaScript 引用放在`<body>`元素中的页面内容后面。**     

#### 1.1.2 推迟执行脚本
`<script>`元素定义了一个叫 defer 的属性。这个属性表示脚本在执行的时候不会改
变页面的结构。也就是说，脚本会被延迟到整个页面都解析完毕后再运行。因此，在`<script>`元素上设置 defer 属性，相当于告诉浏览器立即下载，但延迟执行。  

#### 1.1.3 异步执行脚本

HTML5 为`<script>`元素定义了 async 属性。从改变脚本处理方式上看，async 属性与 defer 类似。当然，它们两者也都只适用于外部脚本，都会告诉浏览器立即开始下载。不过，与 defer 不同的是，标记为 async 的脚本并不保证能按照它们出现的次序执行。

#### 1.1.4 动态加载脚本
除了`<script>`标签，还有其他方式可以加载脚本。因为 JavaScript 可以使用 DOM API，所以通过向 DOM 中动态添加`script`元素同样可以加载指定的脚本。  

#### 1.1.5 XHTML中的变化
可扩展超文本标记语言`（XHTML，Extensible HyperText Markup Language）`是将 HTML 作为 XML的应用重新包装的结果。与 HTML 不同，在 XHTML 中使用 JavaScript 必须指定 `type` 属性且值为`text/javascript`，HTML 中则可以没有这个属性。  

### 2.2 行内代码与外部文件

虽然可以直接在 HTML 文件中嵌入 JavaScript 代码，但通常认为**最佳实践是尽可能将 JavaScript 代码放在外部文件中**。不过这个最佳实践并不是明确的强制性规则。  
推荐使用外部文件的理由如下:
+ **可维护性**。JavaScript 代码如果分散到很多 HTML 页面，会导致维护困难。而用一个目录保存所有 JavaScript 文件，则更容易维护，这样开发者就可以独立于使用它们的 HTML 页面来编辑代码。
+ **缓存。**浏览器会根据特定的设置缓存所有外部链接的`JavaScript`文件,这意味着**如果两个页面都用到同一个文件，则该文件只需下载一次。这最终意味着页面加载更快。**  
+ **适应未来。**包含外部`JavaScript`文件的语法在`HTML`和`XHTML`中是一样的。

### 2.3 文档模式  

IE5.5 发明了文档模式的概念，即可以使用`doctype`切换文档模式。最初的文档模式有两种：混杂模式`quirks mode`和标准模式`standards mode`。

### 2.4 `<noscript>`元素

针对早期浏览器不支持 JavaScript 的问题，需要一个页面优雅降级的处理方案。
`<noscript>`元素可以包含任何可以出现在`<body>`中的 HTML 元素，`<script>`除外。在下列两种情况下，浏览器将**显示包含在`<noscript>`中的内容**：  
+ 浏览器不支持脚本
+ 浏览器对脚本的支持被关闭  
    
任何一个条件被满足，包含在`<noscript>`中的内容就会被渲染。否则，浏览器不会渲染`<noscript>`中的内容。  
example：
```javascript
<!DOCTYPE html> 
<html> 
 <head> 
 <title>Example HTML Page</title> 
 <script defer="defer" src="example1.js"></script> 
 <script defer="defer" src="example2.js"></script> 
 </head> 
 <body> 
 <noscript> 
 <p>This page requires a JavaScript-enabled browser.</p> 
 </noscript> 
 </body> 
</html> 
```  
这个例子是在脚本不可用时让浏览器显示一段话。如果浏览器支持脚本，则用户永远不会看到它。  

## 总结
JavaScript是通过`<script>`元素插入到HTML页面中的。这个元素可用于把`javascript`代码嵌入到HTML页面中，跟其他标记混合在一起，也可以用于引入保存在外部文件中的JavaScript。
+  要包含外部 JavaScript 文件，必须将 src 属性设置为要包含文件的 URL。文件可以跟网页在同一台服务器上，也可以位于完全不同的域。
+ 所有`<script>`元素会依照它们在网页中出现的次序被解释。在不使用 defer 和 async 属性的情况下，包含在`<script>`元素中的代码必须严格按次序解释。
+ 对不推迟执行的脚本，浏览器必须解释完位于`<script>`元素中的代码，然后才能继续渲染页面的剩余部分。为此，通常应该把`<script>`元素放到页面末尾，介于主内容之后及`</body>`标签之前。
+  可以使用 defer 属性把脚本推迟到文档渲染完毕后再执行。推迟的脚本原则上按照它们被列出的次序执行。
+  可以使用 `async` 属性表示脚本不需要等待其他脚本，同时也不阻塞文档渲染，即异步加载。异步脚本不能保证按照它们在页面中出现的次序执行。
+ 通过使用`<noscript>`元素，可以指定在浏览器不支持脚本时显示的内容。如果浏览器支持并启用脚本，则`<noscript>`元素中的任何内容都不会被渲染。


  

>补充知识点:MIME类型。**媒体类型(通常称为 Multipurpose Internet Mail Extensions或MIME类型)** 是一种标准,用来表示文档、文件或字节流的性质和格式。  
语法:  
&emsp;通用结构  
&emsp;`type/subtype`    
&emsp;MIME的组成结构非常简单;由类型与子类型两个字符串中间用`'/'`分隔而组成。不允许空格存在。type表示可以被分多个子类的独立类别。`subtype`表示细分后的每个类型。
MIME类型对大小写不敏感,但是传统写法都是小写。  
独立类型：  
&emsp;&emsp;text/plain  
&emsp;&emsp;text/html  
&emsp;&emsp;image/jpeg  
&emsp;&emsp;image/png  
&emsp;&emsp;audio/mpeg  
&emsp;&emsp;audio/ogg  
&emsp;&emsp;audio/*  
&emsp;&emsp;video/mp4  
&emsp;&emsp;application/*  
&emsp;&emsp;application/json  
&emsp;&emsp;application/javascript  
&emsp;&emsp;application/ecmascript  
&emsp;&emsp;application/octet-stream
……  
[MIME更多可以参考](https://developer.mozilla.org/zh-CN/docs/Web/HTTP/Basics_of_HTTP/MIME_types)    

## 本章内容思考？
+ HTML中如何引用`JavaScript`?行内代码和外部引用哪种方式更好？为什么？
+ HTML页面加载顺序是怎样的？什么情况下会阻塞页面？如何减少白屏时间?
+ 什么是同源策略？为什么可以利用JSONP解决跨域问题？原理是什么？
+ 给脚本添加`defer`和`async`属性的作用？两者有什么区别？   
 

 