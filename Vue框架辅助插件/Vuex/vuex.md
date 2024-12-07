[Vuex 官方文档](https://vuex.vuejs.org/zh/)  
## Vuex是什么
Vuex是一个专为Vue.js应用程序开发的**状态管理模式**。  
它采用集中式存储管理应用的所有组件的状态，并以相应的规则保证状态以一种可预测的方式发生变化。  

每一个Vuexx应用的核心就是**store**(仓库)。"store"基本上就是一个容器，它包含着你的应用中大部分的**状态(state)**。          
### Vuex和单纯的全局对象有以下两点不同
+ Vuex的状态存储是响应式的。当Vue组件从store中读取状态的时候，若store中的状态发生变化，那么相应的组件也会相应地得到高效更新。
+ 你不能直接改变store中的状态。改变store中的状态唯一途径就是显式地**提交** `mutation`。这样使得我们可以方便地跟踪每一个状态的变化，从而让我们能够实现一些工具帮助我们更好地了解我们的应用。  

### Vuex核心模块
| State      | Getter                    | Mutations      | Actions                | Modules               |
| ---------- | ------------------------- | -------------- | ---------------------- | --------------------- |
| 单一状态树 | 可以认为是store的计算属性 | 非常类似于事件 | Action提交的是Mutation | 将store分割成**模块** |

### State   
`Vuex`使用**单一状态树**——是的，用一个对象就包含了全部的应用层级状态。至此它便作为一个"唯一数据源"而存在。这也意味着，每个应用将仅仅包含一个`store`实例。 

#### 在`Vue`组件中获得`Vuex`状态   
由于`Vuex`的**状态存储是响应式**的,从`store`实例中读取状态最简单的方法就是在**计算属性**中返回某个状态。  
> `Vuex`通过`Vue`插件系统将`store`实例从根组件中"注入"到所有的子组件里。且子组件能通过`this.$store`
访问到。   
#### `mapState` 辅助函数  
当一个组件需要获取多个状态的时候，将这些状态都声明为计算属性会有些重复和冗余。为了解决这个问题，我们可以使用`mapState`辅助函数帮助我们生成计算属性，让你少按几次键：    
```javascript
// 在单独构建的版本中辅助函数为 Vuex.mapState
import { mapState } from 'vuex'

export default {
  // ...
  computed: mapState({
    // 箭头函数可使代码更简练
    count: state => state.count,

    // 传字符串参数 'count' 等同于 `state => state.count`
    countAlias: 'count',

    // 为了能够使用 `this` 获取局部状态，必须使用常规函数
    countPlusLocalState (state) {
      return state.count + this.localCount
    }
  })
}
```  
当映射的计算属性名称与`state`的子节点名称相同时，我们也可以给`mapState`传一个字符串数组。   
```javascript
computed:mapState([
    // 映射 `this.count` 为 store.state.count
    'count'
])
```  
#### 对象展开运算符   
`mapState`函数返回的是一个对象。我们如何将它与局部计算属性混合使用呢？通常，我们需要使用一个工具函数将多个对象合并为一个，以使我们将最终对象传给`computed` 属性。但是自从有了**对象展开运算符**，我们可以极大地简化写法:   
```javascript
computed:{
    localComputed(){/*...*/},
    // 使用对象展开运算符将此对象混入到外部对象中  
    ...mapState({
        // ...
    })
}
```  
#### 组件仍然保有局部状态   

### `Getter`  
有时候我们需要从`store`中的`state`中派生出一些状态，`Vuex`允许我们在`store`中定义"`getter`"（可以认为是`store`的计算属性）。   

`Getter`接受`state`作为其第一个参数：  
```javascript
const store = createStore({
    state:{
        todos:[
            {id:1,text:'...',done:true},
            {id:2,text:'...',done:false}
        ]
    },
    getters:{
        doneTodos(state){
            return state.todos.filter(todo=>{ todo.done });
        }
    }
})
```  
#### 通过属性访问   
`Getter`会暴露为`store.getters`对象，可以以属性的形式访问这些值:   
```javascript
store.getters.doneTodos // -> [{ id: 1, text: '...', done: true }]
```
`Getter`也可以接受其他`getter`作为第二个参数：   
```javascript
getters:{
    // ...
    doneTodosCount(state,getters){
        return getters.doneTodos.length;
    }
}
```  
```javascript
    store.getters.doneTodosCount //-> 1
```   
我们可以很容易地在任何组件中使用它:    
```javascript
computed:{
    doneTodosCount(){
        return this.$store.getters.doneTodosCount
    }
}
```  
注意，`getter`在通过属性访问时是作为`Vue`的响应式系统的一部分缓存其中的。    

#### 通过方法访问    
通过让`getter`返回一个函数，来实现给`getter`传参。在你对`store`里的数组进行查询时非常有用。   
```javascript
getters:{
    // ...
    getTodoById:(state)=>{
        (id)=>{
            return state.todos.find(todo=> todo.id === id)
        }
    }
}
```  
```javascript
store.getters.getTodoById(2) //-> { id:2,text:'...',done:false}
```   
> 注意，`getter`在通过方法访问时，每次都会去进行调用，而不会缓存结果。    

#### `mapGetters`辅助函数   
`mapGetters`辅助函数仅仅是将`store`中的`getter`映射到局部计算属性：  
```javascript
import { mapGetters } from 'vuex'  
export default{
    // ...
    computed:{
        // 使用对象展开运算符将`getter`混入`computed`对象中
        ...mapGetters([
            'doneTodosCount',
            'anotherGetter',
            //...
        ])
    }
}
```
如果你想将一个`getter`属性取另一个名字，使用对象形式：  
```javascript
...mapGetters({
    //把 `this.doneCount` 映射为 `this.$store.getters.doneTodosCount`
    doneCount:'doneTodosCount'
})
```
#### `Mutation`   
更改`Vuex`的`store`中的状态的唯一方法是提交`mutation`。`Vuex`中的`mutation`非常类似于事件：每个`mutation`都有一个字符串的**事件类型(type)和一个回调函数(handler)**。这个回调函数就是我们实际进行状态更改的地方，并且它会接受`state`作为第一个参数：   
```javascript
const store = createStore({
    state:{
        count:1
    },
    mutation:{
        increment(state){
            // 变更状态  
            state.count++
        }
    }
})
```  
> 你不能直接调用一个`mutation`处理函数。这个选项更像是一个事件注册:"当触发一个类型为`increment`的`mutation`时，调用此函数。需要唤醒一个`mutation`处理函数，你需要以相应的`type`调用`store.commit`方法:

```javascript
    store.commit('increment');
```  
#### 提交载荷(Payload)  
可以向`store.commit`传入额外的参数，即`mutation`的**载荷(payload)**。  
```javascript
// ...
mutations:{
    increment(state,n){
        state.count += n;
    }
}

store.commit('increment',10)
```   
在大多数情况下，载荷应该是一个对象，这个可以包含多个字段并且记录的`mutation`会更易读:   
```javascript
//...
mutations:{
    increment(state,payload){
        state.count += payload.amount
    }
}
store.commit('increment',{
    amount:10
})
```  
#### 对象风格的提交方式   
提交`mutation`的另一种使用方式是直接使用包含`type`属性的对象：    
```javascript
    store.commit({
        type:"increment",
        amount:10
    })
```  
当使用对象风格的提交方式，整个对象都作为载荷传给 `mutation` 函数，因此处理函数保持不变：
```javascript
mutations: {
  increment (state, payload) {
    state.count += payload.amount
  }
}
```
#### 使用常量替代`Mutation`事件类型   
使用常量替代 `mutation` 事件类型在各种 `Flux` 实现中是很常见的模式。这样可以使 `linter` 之类的工具发挥作用，同时把这些常量放在单独的文件中可以让你的代码合作者对整个 `app` 包含的 `mutation` 一目了然：  
```javascript
// mutation-types.js   
export const SOME_MUTATION = 'SOME_MUTATION'  
// store.js   
import { createStore } from 'vuex'
import { SOME_MUTATION } from './mutation-types'

const store = createStore({
  state: { ... },
  mutations: {
    // 我们可以使用 ES2015 风格的计算属性命名功能
    // 来使用一个常量作为函数名
    [SOME_MUTATION] (state) {
      // 修改 state
    }
  }
})
```  

用不用常量取决于你——在需要多人协作的大型项目中，这会很有帮助。   

#### `Mutation`必须是同步函数   
> 一条重要的原则就是要记住`mutation`必须是同步函数。为什么？参考下面例子   

`eg:`   
```javascript
mutations:{
    someMutation(state){
        api.callAsyncMethod(()=>{
            state.count++
        })
    }
}
```  
假如，我们正在 debug 一个 app 并且观察 devtool 中的 mutation 日志。每一条 mutation 被记录，devtools 都需要捕捉到前一状态和后一状态的快照。然而，在上面的例子中 mutation 中的异步函数中的回调让这不可能完成：因为当 mutation 触发的时候，回调函数还没有被调用，devtools 不知道什么时候回调函数实际上被调用——实质上任何在回调函数中进行的状态的改变都是不可追踪的。    

#### 在组件中提交`Mutation`   
可以在组件中使用`this.$store.commit('xxx')`提交`mutation`,或者使用`mapMutations`辅助函数将组件中的`methods`映射为`store.commit`调用(需要在根节点注入`store`)。  
```javascript
import { mapMutation } from 'vuex';
export default{
    // ...
    methods:{
        ...mapMutation:([
            'increment',//将 `this.increment()`映射为`this.$store.commit('increment')`
            // `mapMutations` 也支持载荷：
            'incrementBy' // 将 `this.incrementBy(amount)` 映射为 `this.$store.commit('incrementBy', amount)`
        ]),
        ...mapMutations({
            add: 'increment' // 将 `this.add()` 映射为 `this.$store.commit('increment')`
        })
    }
}
```   
#### 下一步`Action`  
在`mutation`中混合异步调用会导致程序很难调试。例如，当调用了两个包含异步回调的`mutation`来改变状态，无法知道什么时候回调哪个先回调，这就是我们为什么要区分这两个概念。在`Vuex`中，`mutation`**都是同步事物**：
```javascript
store.commit('increment')
// 任何由"increment"导致的状态变更都应该在此时完成
```

为了处理异步操作，让我们来看一看`Action`。
### `Action`  
`Action`类似于`mutation`,不同在于：   
+ `Action`提交的是`mutation`,而不是直接变更状态。  
+ `Action`可以包含任意异步操作。  
让我们来注册一个简单的`action`:   
```javascript
const store = createStore({
    state:{
        count:0
    },
    mutations:{
        increment(state){
            state.count++
        }
    },
    actions:{
        increment(context){
            context.commit('increment')
        }
    }
})
```
`Action`函数接受一个与`store`实例具有相同方法和属性的`context`对象，因此可以调用`context.commit`提交一个`mutation`,或者通过`context.state`和`context.getters`来获取`state`和`getters`。当我们在之后介绍到 `Modules` 时，你就知道 `context` 对象为什么不是 `store` 实例本身了。   

#### 分发`Action`(`dispatch`)   
`Action`通过`store.dispatch`方法来触发：   
```javascript
    store.dispatch('increment');
```     
这不是多此一举吗？直接分发`mutation`岂不更方便？实际上并非如此，`mutation`有**必须同步执行**这个限制。`Action`就不受约束！我们可以在`action`内部执行**异步**操作：   
```javascript
actions:{
    incrementAsync({commit}){
        setTimeout(()=>{
            commit('increment')
        },1000)
    }
}
```  
`Actions`支持同样的载荷方式和对象方式进行分发：   
```javascript
// 以载荷形式分发   
store.dispatch('incrementAsync',{ amount:10 })  
// 以对象形式分发
store.dispatch({
    type:"incrementAsync",
    amount:10
})
```     
eg:调用异步`API`和分发多重`mutation`
```javascript  
actions:{
    checkout({commit,state},products){
        const savedCartItems = [...state.cart.added]
        commit(type.CHECKOUT_REQUEST)  
        shop.buyProducts(
            products,
            // 成功操作  
            ()=>commit(types.CHECKOUT_SUCCESS),
            // 失败操作   
            ()=>commit(types.CHECKOUT_FAILURE,savedCartItems)
        )
    }
}

```  
我们正在进行一系列的异步操作，并且通过提交`mutation`来记录`action`产生的副作用(即状态变更)。   

#### 在组件中分发`Action`  
在组件中使用`this.$store.dispatch("xxx")`分发`action`或者使用`mapActions`辅助函数将组件的`methods`映射为`store.dispatch`调用(需要先在根节点注入`store`) :   
```javascript
import { mapActions } from 'vuex'
export default{
    // ...
    methods:{
        ...mapActions([
            'increment',//将 `this.increment0()` 映射为`this.$store.dispatch('')`
            //`mapActions`也至此载荷:  
            'incrementBy' // 将`this.incrementBy(amount)`映射为`this.$store.dispatch('incrementBy',amount)`
        ]),
        ...mapActions([
            add:'increment'  // 将 `this.add()`映射为 `this.$store.dispatch('increment')`
        ])
    }

}
```  
#### 组合`Action`  
`Action`通常是异步的，那么如何知道`action`什么时候结束呢？如何才能组合多个`action`，以处理更复杂的异步流程？  
> `store.dispatch`可以处理被触发的`action`的处理函数返回的`Promise`,并且`store.dispatch`仍旧返回`Promise`。   

```javascript
actions:{
    actionA({commit}){
        return new Promise((resolve,reject)=>{
            setTimeout(()=>{
                commit('someMutation')
                resolve()
            },1000)
        })
    }
}
```    
现在你可以:  
```javascript
    store.dispatch('actionA').then(()=>{
        // ...
    })
```  
在另外一个`action`中也可以:
```javascript
actions:{
    // ...  
    actionB({dispatch,commit}){
        return dispatch('actionA').then(()=>{
            commit('someOtherMutation')
        })
    }

}
```  
最后，如果我们利用`async/await`，我们可以如下组合`action`:   
```javascript
// 假设 getData()和 getOtherData() 返回的是Promise  
actions:{
    async actionA({commit}){
        commit('gotData',await getData())
    },
    async actionB({dispatch,commit}){
        await dispatch('actionA') // 等待 actionA 完成  
        commit('gotOtherData',await getOtherData())
    }
}
```  
> 一个`store.dispatch`在不同的模块中可以触发多个`action`函数。在这种情况下，只有当所有触发函数完成后，返回的`promise`才会执行。    

#### `Module`
> 单一状态树，应用所有状态会集中到一个比较大的对象。当应用变得非常复杂时，`store`对象就有可能变得相当臃肿。    
```javascript
 const ModuleA = {
    state:()=>({...}),  
    mutations:{...},
    actions:{...},
    getters:{...}
 }
 const ModuleB = {
    state:()=>({...}),  
    mutations:{...},
    actions:{...}
 }
 const store = createStore({
    modules:{
        a:moduleA,
        b:moduleB
    }
 })
store.state.a  //-> moduleA 的状态 
store.state.b //->moduleB 的状态
```
为了解决`store`对象变得臃肿的问题，`Vuex`允许我们将`store`分割成**模块(module)**。每个模块拥有自己的`state`、`mutation`、`action`、`getter`、甚至是嵌套子模块——从上至下进行同样方式的分割。   

#### 模块的局部状态   
> 对于模块内部的`getter`和`mutation`，接收的第一个参数是`模块的局部状态对象`。    
```javascript
const moduleA={
    state:()=>({
        count:0
    }),
    mutations:{
        increment(state){
            // 这里的`state`对象是模块的局部状态
            state.count++
        }
    },
    getters:{
        doubleCount(state){
            return state.count * 2
        }
    }
}
```  
同样，对于模块内部的`action`，局部状态通过`context.state`暴露出来，根节点状态则为`context.rootState`:  
```javascript
const moduleA = {
    // ...
    actions:{
        incrementIfOddOnRootSum({state,commit,rootState}){
            if((state.count + rootState.count)%2 === 1){
                commit("increment")
            }
        }
    }
}
```  
对于模块内部的`getter`,根节点状态会作为第三个参数暴露：  
```javascript
    const moduleA={
        // ...
        getters:{
            sumWithRootCount(state,getters,rootState){
                return state.count + rootState.count
            }
        }
    }
```  
#### 命名空间   
默认情况下，模块内部的`action`和`mutation`仍然是注册在**全局命名空间**的——这样使得多个模块能够对同一个`action`和`mutation`作出响应。`Getter`同样也默认注册在全局命名空间但是这目前并非出于功能上的目的（仅仅是维持现状来避免非兼容性变更）。
> 必须注意，不要在不同的，无命名空间的模块中定义两个相同的`getter`从而导致错误。   

如果希望你的模块具有更高的封装度和复用性,你可以通过添加`namespaced：true`的方式使其成为带命名空间的模块。当模块被注册后,它的所有`getter`、`action`、及`mutation`都会自动根据模块注册的路径调整命名。例如:   
```javascript
const store = new createStore({
    modules:{
        account:{
            namespaced:true,

            // 模块内容(module assets)
            state:()=>({...}), // 模块内的状态已经是嵌套的了，使用`namespace`属性不会对其产生影响   
            getters:{
                isAdmin(){...} // ->getters['account/isAdmin']  
            },
            actions:{
                login(){...} // ->dispatch('account/login')
            },
            mutations:{
                login(){...} //->commit('account/login')
            },
            // 嵌套模块   
            modules:{
                // 继承父模块的命名空间   
                myPage：{
                    state:()=>({...}),
                    getters:{
                        profile(){...} //-> getters['account/profile']
                    }
                },
                // 进一步嵌套命名空间   
                posts:{
                    namespaced:true,
                    state:()=>({...}),
                    getters:{
                        popular(){...} // -> getters['account/posts/popular']
                    }
                }
            }
        }
    }

})
```
启动了命名空间的`getters`、`action`会收到局部化的`getter`,`dispatch`和`commit`。在使用模块内容(`module assets`)时不需要在同一模块内额外添加空间命名前缀。更改`namespace`属性后不需要修改模块内的代码。   
#### 在带命名空间的模块内访问全局内容(Global Assets)  
如果希望使用全局`state`和`getter`,`rootState`,`rootGetters`会作为第三个和第4个参数传入`getter`，也会通过`context`对象的属性传入`action`。
> 若需要在全局命名空间内分发`action`或提交`mutation`，将`{ root:true }`作为第三个参数传递给`dispatch`和`commit`即可。
```javascript
modules:{
    foo：{
        namespaced:true,   
        // 在这个模块的`getter`中，`getter`被局部化了
        getters:{
            someGetter(state,getters,rootState,rootGetters){
                getters.someOtherGetter // -> 'foo/someOtherGetter' 
                rootGetters.someOtherGetter // -> 'someOtherGetter'  
                rootGetters['bar/someOtherGetter'] // -> 'bar/someOtherGetter'
            },
            someOtherGetter:state=>{...}
        },
        actions:{
            // 在这个模块中,'dispatch'和'commit'也被局部化了   
            // 他们可以接受`root`属性以访问根`dispatch`或`commit`  
            someAction({ dispatch,commit, getters,rootGetters }){
                getters.someGetter // ->'foo/someGetter'  
                rootGetters.someGetter // ->'someGetter'  
                rootGetters['bar/someGetter'] // ->'bar/someGetter'  

                dispatch('someOtherAction') // -> 'foo/someOtherAction'  
                dispatch('someOtherAction', null, { root:true }) // ->someOtherAction  
                commit('someMutation') //->'foo/someMutation'  
                commit('someMutation'，null,{root:true}) // ->'someMutation' 
            },
            someOtherAction(ctx,payload){...}
        }
    }
}
```
#### 在带命名空间的模块注册全局`action`
```javascript
{
    actions:{
        someOtherAction({dispatch}){
            dispatch('someAction')
        }
    },
    modules:{
        foo:{
            namespaced:true,
            actions:{
                someAction:{
                    root:true,
                    handler(namespacedContext,payload){...} //->'someAction'
                }
            }
        
        }
    }

}
```
#### 带命名空间的绑定函数   
当使用`mapState`、`mapGetters`、`mapActions`和`mapMutations`这些函数来绑定带命名空间的模块时，写起来比较繁琐:   
```javascript
computed:{
    ...mapState({
        a:state=>state.some.nested.module.a,  
        b:state=>state.some.nested.module.b
    }),
    ...mapGetters({
        'some/nested/module/someGetter', // ->this['some/nested/module/someGetter']
        'some/nested/module/someOtherGetter' // ->this['some/nested/module/someOtherGetter']  
    })
},
methods:{
    ...mapActions([
        'some/nested/module/foo', // ->this['some/nested/module/foo']()  
        'some/nested/module/bar' //->this['some/nested/module/bar']()
    ])
}
```  
对于这种情况，你可以将模块的空间名称字符串作为第一个参数传递给上述函数，这样所有绑定都会自动将该模块作为上下文。于是上面的例子可以简化为:   
```javascript
    computed:{
        ...mapState('some/nested/module',{
            a:state=>state.a,
            b:state=>state.b
        }),
        ...mapGetters('some/nested/module',[
            'someGetter', //->this.someGetter
            'someOtherGetter' //->this.someOtherGetter
        ])
    },
    methods:{
        ...mapActions('some/nested/module',[
            'foo', //->this.foo()
            'bar' //->this.bar()
        ])
    }
```    
而且，你可以通过使用`createNamespacedHelpers`创建基于某个命名空间辅助函数。它返回一个对象，对象里有**新的绑定在给定命名空间值上的组件绑定辅助函数**。  

```javascript
import { createNamespacedHelpers } from 'vuex'  
const { mapState,mapActions } = createNamespacedHelpers('some/nested/module')   
export default{
    computed:{
        // 在`some/nested/module`中查找  
        ...mapState({
            a:state=>state.a,
            b:state=>state.b
        })
    },
    methods:{
        // 在`some/nested/module`中查找  
        ...mapActions([
            'foo',
            'bar'
        ])
    }
}
```  
#### 给插件开发者的注意事项   
如果你开发的**插件**`(plugin)`提供了模块并允许用户将其添加到`Vuex store`,可能需要考虑模块的空间名称问题。对于这种情况，你也可以通过插件的参数对象来允许用户指定空间名称：  
```javascript
// 通过插件的参数对象得到空间名称   
// 然后返回`Vuex`插件函数  
export function createPlugin(options={}){ 
    return function(store){
        // 把空间名字添加到插件模块的类型(type)中去   
        const namespace = options.namespace || ''
        store.dispatch(namespace + 'pluginAction')
    }
}
```  
#### 模块动态注册   
 在`store`创建之后，可以使用`store.registerModule`方法注册模块:   
 ```javascript
 import { creteStore } from 'vuex'  
 const store = createStore({/*选项*/})
//  注册模块`myModule`
store.registerModule('myModule',{
    // ...
})
// 注册嵌套模块`nested/myModule` 
store.registerModule(['nested','myModule'],{
    //...
})
 ```  
 之后就可以通过`store.state.myModule`和`store.state.nested.myModule`访问模块的状态。    
模块动态注册功能使得其他Vue插件可以通过在`store`中附加新模块的方式来使用`vuex`管理状态。例如，`vuex-router-sync`插件就是通过动态注册模块将`Vue Router`和`Vuex`结合在一起，实现应用的路由状态管理。 

> 可以使用`store.unregisterModule(moduleName)`来动态卸载模块。注意:你不能使用此方法卸载静态模块(即创建`store`时声明的模块)。

> 可以通过`store.hasModule(moduleName)`方法检查该模块是否已经被注册到`store`。另外，嵌套模块应该以数组形式传递给`registerModule`和`hasModule`,而不是以**路径字符串的形式传递给`module`**。    

#### 保留`state`
在注册一个新的`module`时，你可能很想保留过去的`state`,例如从一个服务端渲染的应用保留`state`,你可以通过`preserveState`选项将其归档：`store.registerModule('a',module,{ preserveState:true })`。   
当设置`preserveState:true`时，该模块会被注册，`action`、`mutation`和`getter`会被添加到`store`中，但是`state`不会。这里假设`store`的`state`已经包含了这个`module`的`state`并且你不希望将其覆写。   

#### 模块重用   
有时我们可能需要创建一个模块的多个实例，例如：   
+ 创建多个`store`,他们公用一个模块(例如当`runInNewContext`)选项是`false`或`once`时，为了**在服务端渲染中避免有状态的单例**。
+ 在一个`store`中多次注册同一个模块  
如果我们使用一个纯对象来声明模块的状态，那么这个状态对象会通过引用被共享，导致状态对象被修改时`store`或模块间数据互相污染的问题。
```javascript
    const MyReusableModule={
        state:()=>({
            foo:'bar'
        }),
        // mutation、action和getter 等等...
    }
```  




