# `ComposableAndMixins`  
## `Composable`  
`Vue3 Composable`（组合式函数），本质上是一个**利用`Vue`组合式`API`来封装和复用"有状态逻辑"**的函数。   

用简单的话说：**凡是把一组相关的响应式数据（`ref/reactive`）和操作这些数据的方法（函数/生命周期）**打包在一起，并以`use`开头命名的函数，都叫`Composable`。  

#### 以下从四个维度拆解：  
1.它长什么样？（代码视角）  
它就是一个普通的 `JavaScript/TypeScript`函数，但它内部可以"借用"`Vue`的响应式系统。     
```javascript
// 这是一个标准的`Composable`：封装鼠标跟踪逻辑  
export function useMouse(){
    // 1.状态（响应式数据）
    const x = ref(0)
    const y = ref(0) 
    
    // 2.方法（更新逻辑）  
    const update = (e) => {
        x.value = e.pageX
        y.value = e.pageY
    }

    // 3. 生命周期（挂载/卸载）  
    onMounted(()=>window.addEventLister('mousemove',update))
    onUnmounted(()=>window.removeEventListener('mousemove',update))  

    //4.返回值（暴露给组件使用） 
    return {x,y}
}  

```  
2.它解决了什么痛点？（为什么需要它）  
在`vue 2`时代，复用逻辑主要靠`Mixins`和**作用域插槽**,但她们都有致命缺陷：  
+ 命名冲突：`Mixins`里的`data/methods`无法避免重名，会默默覆盖。  
+ 来源不明：模版里用到的变量不知道是哪个`Mixin`提供的，像"隐式注入"。   
+ 逻辑分散：同一个功能的`data`写在`data`里，`methods`写在`methods`里，`watch`写在`watch`里，代码被撕碎了。  
`Composable`完美解决了这些问题：  
+ 来源清晰：返回值显式结构，`const { x, y} = useMouse()`，一眼看出数据从哪来。  
+ 无命名冲突：解构时可以随意重命名，如 { x: mouseX }。  
+ 逻辑内聚：把数据、方法、生命周期按功能**打包**在一起，而不是按选项类型（data/Methods）分开。  

3.它与"普通工具函数"有什么区别？  
+ **普通工具函数（如`formatDate`）**：接收参数，返回纯计算结果，**不涉及**响应式状态，也不依赖**`Vue`实例**。  
+ `Composable`：内部使用了`Vue`的响应式`API`（`ref、watch、onMounted`等），它的状态是有"活性"的。当它的内部数据变化时，调用它的组件视图会自动更新。    

4.核心设计原则（最佳实践）  
+ 命名必须`use`开头：这是约定，便于`ESlint`插件和编辑器插件自动识别。  
+ **副作用需在`onMounted`等生命周期中管理**：不要只在函数顶层直接操作`DOM`,要等组件挂载完。  
+ **返回值推荐使用`ref`而非`reactive`**：因为解构`reactive`会丢失响应性，而解构`ref`配合`.value`或自动解包是安全的。如果想用`reactive`,建议用`toRefs`包裹后返回。  
+ 可组合（`Compose`）:`Composable`可以调用另一个`Composable`,就像搭积木。例如`useUserList`内部可以调用`useFetch`和`usePagination`。

实战场景：异步请求
```javascript
import { ref,watchEffect } from vue;  
export function useFetch(url){
    const data = ref(null)  
    const error = ref(null) 
    const loading = ref(false)  
    const fetchData = ()=>{
        loading.value = true;
        fetch(url)
            .then(res=>res.json())
            .then(json=>data.value = json)
            .catch(err=>error.value=err)
            .finally(()=>loading.value = false)
    }
    
    watchEffect(()=>fetchData());
    //虽然语法上的回调是箭头函数，但 Vue 依赖追踪的作用域覆盖了箭头函数体内调用的所有同步代码（包括 fetchData 内部）。  
    return { data, error, loading, retry:fetchData }
} 
// 在组件中使用：
const { data,loading } = useFetch('/api/user/1')  
// 只需要这一行，加在状态和数据就全有了，且完全响应式。

```  
> 总结一句话：`Composable`就是`Vue3`的"逻辑积木"，它让原本散落在`data`、`methods`、`watch`里的代码，按"业务功能"重新聚合起来，让代码更优雅、更易于测试和复用。  

## `Mixins`  
`mixins`**是一种在多个组件间分发可复用功能**的灵活方式。  
可以把它想象成一个"功能包"，里面可以包含组件所需的任何选项（如`data`、`methods`、`computed`、生命周期钩子等）。  
当一个组件引入这个"功能包"后，`mixins`里的所有选项就会和组件自身的选项"混合"在一起，组件便可以直接使用其中的所有功能。
### 基本用法
1.定义`Mixin`:创建一个独立的`JavaScript`对象，结构与`Vue`组件的选项对象一致。
```javascript
// 定义一个名为 logMixin 的混入对象
const logMixin = {
    // 对象方法简写， ES6 语法，等价于 data:function(){} 
    data(){
        return {
            logMessage:'Mixin 数据'
        }
    },
    created(){
        console.log("Mixin 的 created 钩子被调用");
    },
    methods:{
        logInfo(){
            console.log(this.logMessage);
        }
    }
}
```  
2.使用`Mixin`:在组件中，通过`mixins`选项（这是一个数组）来引入。  

```javascript
// 在Vue组件中使用  
export default{
    mixins:[logMixin],// 引入 mixin
    created(){
        console.log('组件的 created 钩子被调用');
    },
    mounted(){
        this.logInfo();// 输出："Mixin 数据"
    }
}
```  
在这个例子中，`logMixin`的`data`、`created`钩子和`logInfo`方法都被"混合"进了组件，可以直接使用。  
+ 选项合并策略  
当`mixin`和组件本身有同名的选项时，`Vue`有一套固定的合并规则：  

|选项类型|合并策略|
|---|---|
|**生命周期钩子（如`creted`,`mounted`）**|都会执行，且`mixin`中的钩子先执行|  
|**数据对象**（`data`）|**递归合并**，如果发生**键名冲突，以组件的数据优先**|
|方法、组件、指令等（`methods,components,directives`）|**合并为同一个对象，如果键名冲突，以组件的数据优先**|  
|方法、组件、指令等（`methods,components,directives`）|合并为同一个对象，如果健名冲突，以组件的选项优先|

### 使用注意事项与局限  
虽然`mixins`在`Vue 2`时期是主流，但它存在一些固有问题，尤其在项目规模变大后会比较突出：  
+ **命名冲突**：当多个`mixin`或组件自身定义了同名属性或方法时，会依据上述"合并策略"覆盖，这种隐式覆盖可能导致难以追踪的`bug`。   
+ **来源不明确**：组件中使用的属性和方法可能来自自身，也可能来自某个`mixin`,导致代码的可读性和可维护性下降。  
+ **依赖关系模糊**：`Mixin`之间或`Mixin`与组件之间可能产生隐式依赖，形成复杂、难以理解的逻辑网。

> `vue3`中官方**推荐使用组合式**`API`(`Composition API`)作为逻辑复用的首选方案。`mixins`虽然仍被保留以支持旧项目，但已不再被推荐用于新项目。  

> 组合式`API`通过`composables`（可组合函数）解决了`mixins`的上述痛点。它让逻辑的**来源更清晰、命名冲突可控，且更易于测试和类型推导**。   





