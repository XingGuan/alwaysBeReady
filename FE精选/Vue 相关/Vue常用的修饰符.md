一、修饰符是什么   
>在`Vue`中，修饰符处理了许多`DOM`事件的细节,让我们不再需要花大量的时间去处理这些烦恼的事情，而能有更多的精力专注于程序的逻辑处理。   

在事件处理程序中，我们调用`event.preventDefault()`或者`event.stopPropagation()`是开发中非常常见的需求，但是为了`减少Dom操作`,`Vue`中就创建了修饰符的存在，也方便程序员编写。  

二、常用的修饰符   
1.表单修饰符  
+ `.lazy`  
> 在我们填完信息，光标离开表单标签的时候，才会将值赋给`value`,也就是在`change`事件之后再进行信息同步。   
> 

```javascript
<input type="text" v-model.lazy="value" >
<p>{{value}}</p>
```  
默认情况下，`v-model`会在每次`input`事件后更新数据。你可以添加`lazy`修饰符来改为在每次`change`事件后更新数据。   

+ `.trim`  
> 清除用户输入的空格字符，但是内容中间的空格不会消除。

如果你想要默认自动去除用户输入内容中两端的空格，你可以在`v-model`后添加`.trim` 修饰符：  

```html
<input type="text" v-model.trim = "value">
```   
+ `.number`  
限制用户输入数字或者输入的东西转换成数字(如果你先输入数字，那它就会限制你输入的只能是数字。如果你先输入字符串，那么它就相当于没有加`.number`)  

```html  
<input type="text" v-model.number ="number">
```    

2.事件修饰符  
+ `.stop`  
> 一键阻止事件冒泡，相当于调用了`event.stopPropagation()`方法  

```html
<button @click.stop="ok">ok</button>
```   

+ `.prevent`  
> 用于阻止事件的默认行为，例如当点击提交按钮时阻止对表单的提交。相当于调用了`event.preventDefault()`方法。   

```html
<button @click.prevent="ok">ok</button>
```  
+ `.self`  
> 仅当`event.target`是元素本身时才会触发事件处理器，例如：事件处理器不来自子元素。   

```html
<div v-on:click.self="doThat">...</div>
```  
> 使用修饰符时需要注意调用顺序，因为相关代码是以相同顺序生成的。因此使用`@click.prevent.self` 会阻止**元素及其子元素的所有点击事件的默认行为。** 而`@click.self.prevent`则只会阻止对元素本身的点击事件的默认行为。   

+ `.once`  
绑定了事件以后只能触发一次，第二次就不会触发。   
```html
<button @click.once="shout(1)">ok</button>
```    
+ `.capture`   

添加事件监听器时，使用`capture`捕获模式，例如：指向内部元素的事件，在被内部元素处理前，先被外部处理。使事件触发从包含这个元素的顶层开始往下触发。  

```html  
    <div @click.capture = "shout(1)">
        obj1
        <div @click.capture = "shout(2)">
            obj2
            <div @click = "shout(3)">
                obj3
                <div @click="shout(4)">obj4</div>
            </div>
        </div>
    </div>
```
<!-- 输出结构:1 2 4 3 -->

+ `passive`  

在移动端，当我们在监听元素滚动事件的时候，会一直触发`onscroll`事件会让我们的网页变卡，因此我们使用这个修饰符的时候，相当于给`onscroll`事件整了一个`.lazy`修饰符。    
滚动事件的默认行为(`scrolling`)将立即发生而非等待`onScroll`完成，以防其中包含`event.preventDefault()`。  

```html  
<!-- 滚动事件的默认行为(即滚动行为)将会立即触发 -->
<!-- 而不会等待`onscroll`完成 -->
<!-- 这其中包含`event.preventDefault()`的情况 -->
<div v-on:scroll.passive="onScroll">...</div>
```
> `.passive`修饰符一般用于触摸事件的监听器，可以用来**改善移动端设备的滚屏性能。**

> 请勿同时使用`.passive`和`.prevent`,因为`.passive`已经向浏览器表示了你不想阻止事件的默认行为。如果你这么做了，则`.passive`会被忽略，并且浏览器会抛出警告。   

+ `.native`  
让组件变成像`html`内置标签那样监听根元素的原生事件，否则组件上使用`v-on`只会监听自定义事件。   
```html
<my-component v-on:click.native = "doSomething"></my-component>
```   
> 使用`.native`修饰符来操作普通`HTML`标签是会令事件失效的。   

3.鼠标按钮修饰符  
鼠标按钮修饰符针对的就是左键、右键、中键点击，有如下：  
+ `left`左键点击  
+ `right`右键点击  
+ `middle`中键点击   

```html  
<button @click.left="shout(1)">ok</button>
<button @click.right="shout(1)">ok</button>
<button @click.middle="shout(1)">ok</button>
```   
4. 键盘修饰符  
键盘修饰符是用来修饰键盘事件(`onkeyup`,`onkeydown`)的，有如下：  
`keyCode`存在很多，但`vue`为我们提供了别名，分为以下两种:   
+ 普通键(`enter`,`tab`,`delete`,`space`,`esc` ……)   
+ 系统修饰键(`ctrl`,`alt`,`meta`,`shift`……)

```html   
<input type="text" @keyup.keyCode="shout()">   
```  
5. `v-bind修饰符`   
`v-bind` 修饰符主要是为属性进行操作，用来分别有如下：  
+ `async` 
+ `prop`
+ `camel`

+ 1.`async`  
能对`props`进行一个双向绑定  
```html  
// 父组件  
 <comp :myMessage.sync="bar"></comp>
//子组件  
this.$emit("update:myMessage",params)  
```    
以上这种方法相当于以下的简写  

```html   
<!-- 父组件 --> 
<comp :myMessage="bar" @update:myMessage="func"></comp>
func(e){
    this.bar = e;
}
<!-- 子组件 -->
func2(){
    this.$emit('update:myMessage',params)
}
```  
使用`async`需要注意以下两点：  
+ 使用`sync`的时候，子组件传递的事件名格式必须为`update:value`,其中`value`必须与子组件中`props`中声明的名称完全一致。   
+ 注意带有`.sync`修饰符的`v-bind`不能和表达式一起使用  
+ 将 `v-bind.sync`用在一个字面量对象上，例如`v-bind.sync="{title:doc.title}"`,是无法正常工作的。   

+ 2.`props`  
设置自定义标签属性，避免暴露数据，防止污染`HTML`结构。  
```html  
<input id="uid" title="title1" value="1" :index.prop ="index">
```  
+ 3.`camel`   
将命名变为驼峰命名法，如将`view-Box`属性名转换为`viewBox`   
```html
<svg :viewBox="viewBox"></svg>
```  

[参考文档Vue常用修饰符大全](https://juejin.cn/post/7152041813358936094#heading-7)


 

