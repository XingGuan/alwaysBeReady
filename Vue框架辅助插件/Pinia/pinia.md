### `pinia`  
[pinia doc](https://pinia.vuejs.org/zh/introduction.html)  

#### 为什么你应该使用`Pinia`?   
`Pinia`是`Vue`的专属状态管理库，它允许你跨组件或页面共享状态。

如果你熟悉组合式`API`的话，你可能会认为可以通过一行简单的`export const state = rective({})`来共享一个全局状态。**对于单页应用确实可以，**但如果应用在服务端渲染，这可能会使你的应用暴露出一些安全漏洞。
