### Vue3 Computed
```javascript
<script setup>
    import {reactive,computed} from 'vue';   
    const author = reactive({
        name:"魔都圈",
        books:[
            'Vue 2 - Advanced Guide',
            'Vue 3 - Basic Guide',
            'Vue 4 - The Mystery',
        ],
    });
    const publishedMessage = computed(()=>{
        //箭头函数
        return author.books.length > 0 ? 'Yes':'No';
    })
</script>
```  
> 我们在这里定义了一个计算属性`publishedMessage`。`computed()`方法期望接收一个`getter`函数，返回值为一个**计算属性ref**。和其他一般的`ref`类似，你可以通过`publishedMessage.value`访问计算结果。计算属性`ref`也会在模版中自动解包，因此在模版表达式中引用时无需添加`.value`。   

`Vue`的计算属性会自动追踪响应式依赖。它会检测到`publishBooks`依赖于`author.books`,所以当`author.books`改变时，任何依赖于`publishedMessage`的绑定都会同时更新。  

### 计算属性缓存 VS 方法   
你可能注意到我们在表达式中像这样调用一个函数也会获得和计算属性相同的结果：   
```template   
<p> {{ calculateBooksMessage }} </p>
//组件中  
function calculateBooksMessage(){
    return author.books.length > 0 ? 'Yes' : 'No'
}
```  
若我们将同样的函数定义为一个方法而不是计算属性，两种方法在结果上确实是完全相同的，然而，不同之处在于**计算属性值会基于响应式依赖被缓存**。一个计算属性仅会在其响应式依赖更新时才重新计算。这意味着只要`author.books`不改变，无论多少次访问`publishedBooksMessage`都会立即返回先前的计算结果，而不用重复执行`getter`函数。  

这也解释了为什么下面的计算属性永远不会更新，因为`Date.now()`并不是一个响应式依赖：   
```javascript
const now = computed(()=>{
    Date.now()
})
```  
相比之下，每当触发重新渲染时，调用方法总会再次执行函数。   

>我们为什么需要缓存？   
假设我们有一个性能开销比较大的计算属性`list`,它需要遍历一个巨大的数组并做大量的计算。然后我们可能有其他的计算属性依赖于`list`。如果没有缓存，我们将不可避免的多次执行`list`的`getter`!如果不希望有缓存，请用`method`来替代。    

### 计算属性的`Setter`  
计算属性默认只有`getter`,不过在需要时你也可以提供一个`setter`:   
```javascript
// ...
computed:{
    fullname:{
        //getter
        get(){
            return this.firstName + '' + this.lastName;
        },
        //setter
        set(newValue){
            const names = newValue.split(' ');
            this.firstName = names[0];
            this.lastName = names[names.length - 1];  
        }
    },
}
```   
现在再运行`vm.fullname = 'John Doe'`时，`setter`会被调用，`vm.firstName`和`vm.lastName`也会相地被更新。   

### 侦听器   
虽然计算属性在大多数情况下更合适，但有时也需要一个自定义的侦听器。
这就是为什么`Vue`通过`Watch`选项提供了一个更通用的方法，来响应数据的变化。当需要数据在变化时执行异步
或开销较大的操作时，这个方式是最有用的。   
使用`watch`选项允许我们执行异步操作(访问一个`API`),限制我们执行该操作的频率，并在我们得到最终结果前，设置中间状态。这些都是计算属性无法做到的。  
除了`watch`选项之外，你还可以使用命令式的`vm.$watch API`。  

### 计算属性VS侦听器  
`Vue`提供了一种更通用的方式来观察和响应当前活动的实例上的数据变动；**侦听属性**，当你有一些数据需要随着其它数据变动而变动时，你很容易滥用`watch`——特别是如果你之前使用过`AngularJS`。




`Vue3` `Computed` 为什么需要传递一个函数？   
计算属性的核心是**依赖追踪**。当你在`computed`中传递一个函数时，`Vue`会做两件事：   
+ **自动依赖追踪**:在函数执行的过程中，`Vue`会记录所有被访问的响应式数据(如**data**中的属性或其他**computed**属性)。
+ **缓存计算结果**：只有当依赖的响应式数据发生变化时，这个函数才会重新执行，否则直接返回缓存的值，避免重复计算。   

如果直接传递一个值(而不是函数)，`Vue`无法追踪依赖，也无法实现响应式更新。   

2.什么是`getter`函数？  
`getter`函数是计算属性的默认行为，它定义如何根据依赖数据动态生成值。例如：   
```javascript
computed:{
    // 这里的函数就是getter  
    fullname(){
        return this.firstName + ' ' + this.lastName;
    }
}
```  
当 `firstName` 和 `lastName` 变化时，`fullName` 会自动更新。   

3.`getter`的底层原理   
当你在模版中使用`{{fullname}}`时，`Vue`会：   
1.调用`fullname`的`getter`函数。  
2.记录此时访问的依赖(如`this.firstName`和`this.lastName`)。   
3.当依赖变化时，重新执行`getter`并更新结果。   

> "默认行为"的含义   
当你在`computed`中直接定义一个函数(如`fullname()`),Vue会**自动将其转换为一个只读的计算属性**，其默认行为是：  
+ **隐式定义`getter`**：函数本身成为计算属性的`getter`方法，负责返回计算结果。   
+ 无`setter`:默认不支持直接赋值(如 this.fullname = 'John Doe'会无效或报错)。   
底层逻辑：   
+ `Vue`会将计算属性包装为一个带有`getter`的属性。  
+ 每次访问计算属性(如`this.fullname`),实际调用的是`getter`函数。  
3.显示定义`getter`和`setter`   
如果需要让计算属性支持写入操作(反向更新依赖数据)，需显示定义`setter`:   
```javascript
computed:{
    fullname:{
        get(){
            return this.firstName + ' ' + this.lastName;
        },
        set(newValue){
            //反向更新依赖数据  
            const names = newValue.split(' ');   
            this.firstName = names[0];  
            this.lastName = names[1] || ''; 
        }
    }
}
```
此时，this.fullName = "Jane Simth"会触发`setter`,更新`firstName`和`lastName`。     

4.默认行为的关键点   
+ **只读性**：默认情况下，计算属性是只读的，只能通过`getter`获取值。   
+ 依赖追踪与缓存：  
+ `getter`函数中访问的响应式数据会被自动追踪为依赖。   
+ 依赖变化时，`getter`重新执行；否则直接返回缓存值。  

5.为什么需要默认的`getter`?  
+ 简化代码：大多数场景下，计算属性仅用于派生数据，无需写入操作。   
+ 性能优化：通过缓存避免重复计算，提升性能。   
+ 声明式设计：开发者只需关注"如何计算值"，而非"如何更新值"。  

## 总结  
+ 计算属性：是动态派生数据的响应式属性，默认通过`getter`函数实现值的计算和依赖追踪。   
+ 默认行为：自动将函数转换为只读的`getter`,不支持写入操作。   
+ 显示控制：若需写入功能，需显示定义`getter`和`setter`。   



