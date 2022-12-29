### 1、什么是`React`？  
React是一个声明式，高效且灵活的用于构建用户界面的JavaScript库。   
render方法的返回值描述了你希望在屏幕上看到的内容   
React组件接收一些参数，我们把这些参数叫做props，然后通过render方法返回需要展示在屏幕上的视图的层次结构。  
**在React应用中，数据通过Props的传递，从父组件流向子组件。**  
可以通过在React组件中的构造函数中设置`this.state`来初始化state。this.state应该被视为一个组件的私有属性。  
通过`this.setState`通知React去更新其子组件。   
### 2、`React`有什么特点，优势劣势是什么？  


### 3、什么是`JSX`?为什么浏览器无法读取`JSX`?  
`JSX` 是`JavaScript XML`的缩写，是`React`使用的一种文件。   
它利用`javascript`的表现力和类似`HTML`的模板语法，使得`HTML`文件非常容易理解。提高性能，在React环境下更友好的错误提示。  
浏览器只能处理`JavaScript`对象，而不能读取`JavaScript`中的`JSX`，所以为了使浏览器能够读取`JSX`，首先，需要使用`babel`转换器将`JSX`文件转换为`JavaScript`对象，让后再将其传给浏览器。  



### 4、什么是虚拟`DOM`?  
### 5、什么是组件?  
### 6、`state`和`props`的有哪些区别？  
### 7、`React`组件的生命周期有哪些阶段？  


