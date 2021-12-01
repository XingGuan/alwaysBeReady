Vue是一套用于构建用户界面的**渐进式框架**。
### vue声明式渲染    
>Vue.js的核心是一个允许采用**简洁的模板语法**来声明式地将数据渲染进**DOM**的系统    

注意我们不再和HTML直接交互了。一个Vue应用会将其挂载到一个`DOM`元素上然后对其进行完全控制。那个HTML是我们的入口，但其余都会发生在新创建的Vue实例内部。  

**除了文本插值，我们还可以通过`v-bind``attribute`来绑定元素`attribute`**  

### 条件与循环  
控制切换一个元素是否显示也相当简单:
```html
<div id="app-3">
  <p v-if="seen">现在你看到我了</p>
</div>
```
```javascript
var app3 = new Vue({
  el: '#app-3',
  data: {
    seen: true
  }
})
```
这个例子演示了我们不仅可以把数据绑定到`DOM`文本或`attribute`,还可以绑定到DOM**结构**。  
### 处理用户输入
Vue还提供了 `v-model`指令,它能轻松实现表单输入和应用状态之间的双向绑定。  
### 组件化应用构建  
组件系统是`Vue`的另一个重要概念,因为它是一种抽象，允许我们使用小型、独立和通常可复用的组件构建大型应用。几乎任意类型的应用界面都可以抽象为一个组件树。  
在`Vue`里，一个组件本质上是一个拥有预定义选项的一个`Vue`实例。
在Vue中注册组件很简单:
<!-- 定义名为 todo-item的组件 -->
```javascript
Vue.component('todo-item',{
    template:'<li>这是个待办项</li>'
});
var app = new Vue(……)
```
现在会为每个待办项渲染同样的文本，这看起来并不炫酷。应该能从父作用域将数据传到子组件才对。修改一下组件定义，使之能够接受一个`prop`:
```javascript
Vue.component('todo-item',{
    // todo-item 组件现在接受一个"prop",类似于一个自定义attribute.这个prop名为todo。
    props:['todo'],
    template:'<li>{{todo.text}}</li>'
})
```
现在我们可以使用`v-bind`指令将待办事项传到循环输出的每个组件中。  

