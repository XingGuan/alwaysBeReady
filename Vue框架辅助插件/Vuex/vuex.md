[Vuex 官方文档](https://vuex.vuejs.org/zh/)  
## Vuex是什么
Vuex是一个专为Vue.js应用程序开发的**状态管理模式**。  
它采用集中式存储管理应用的所有组件的状态，并以相应的规则保证状态以一种可预测的方式发生变化。  

每一个Vuexx应用的核心就是**store**(仓库)。"store"基本上就是一个容器，它包含着你的应用中大部分的**状态(state)**。          
### Vuex和单纯的全局对象有以下两点不同
+ Vuex的状态存储是响应式的。当Vue组件从store中读取状态的时候，若store中的状态发生变化，那么相应的组件也会相应地得到高效更新。
+ 你不能直接改变store中的状态。改变store中的状态唯一途径就是显式地**提交** `mutation`。这样使得我们可以方便地跟踪每一个状态的变化，从而让我们能够实现一些工具帮助我们更好地了解我们的应用。  

### Vuex核心模块
| State | Getter | Mutations | Actions | Modules |  
|----|----|----|----|----|
|单一状态树|可以认为是store的计算属性|非常类似于事件|Action提交的是Mutation|将store分割成**模块**|  

 