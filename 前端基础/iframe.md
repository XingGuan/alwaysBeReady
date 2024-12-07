### `iframe`  
[`iframe`MDN文档](https://developer.mozilla.org/zh-CN/docs/Web/HTML/Element/iframe)   
> `<iframe>HTML`内联框架元素表示嵌套的`browsing context`。它能够将另一个`HTML`页面嵌入到当前页面中。   

每个嵌入的浏览上下文(`embedded browsing context`)都有自己的`会话历史记录(session history)`和`DOM`树。包含嵌入内容的浏览上下文称为父级浏览上下文(没有父级)通常是由`Window`对象表示的浏览器窗口。


#### 拓展   
[Browsing context MDN文档](https://developer.mozilla.org/zh-CN/docs/Glossary/Browsing_context)   
> `browsing context`浏览上下文，是浏览器展示`文档`的环境。在现代浏览器中，通常是一个标签页(`tab`)，也可能是一个窗体(`window`)或只是页面的一部分，如`frame`或`iframe`。每个浏览上都有一个活动的源(`origin`)和一个记录所有展示文档的有序历史(`history`)。
> 浏览上下文之间的通讯被严格限制，只有两个同源的浏览上下文，才能打开和使用通讯接口(`BroadcastChannel`)。   


