### 一、event.stopPropagation() AND event.preventDefault();
1. event.stopPropagation()--**[JS阻止冒泡]**;   
2. event.preventDefault()--**[JS取消默认事件(默认行为)]**;  
[参考链接](http://caibaojian.com/javascript-stoppropagation-preventdefault.html)   
### 二、防止冒泡和捕获
1.w3c的方法是e.stopPropagation();  
2.IE则是使用e.cancelBubble=true;  
>`event`---事件对象  

3.阻止冒泡   
`window.event?window.event.cancelBubble =true:e.stopPropagation();`

### 三、取消默认事件
1.w3c的方法是e.preventDefault();  
2.IE则是使用e.returnValue=false;  

