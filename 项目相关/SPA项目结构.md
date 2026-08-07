#### 一、入口
##### 1.`index.html`入口`html`  
`index.html`——传统的`script`标签加载模式+`Vue`挂载：  
```javascript
<!-- 预先加载所有公共库 -->
<script src="./public/lib/jweixin-1.6.0.js"></script>
<script src="./public/lib/hybridapp.js"></script>
<script src="./public/lib/weixinShare.js"></script>
...  
<div id="app"></div>
<script type="module" src="/src/main.js"></script>
```  
##### 2.`Vue`启动入口  
`src/main.js`——注册`Pinia、Router、Vant`等后挂载：  
```javascript
const app = createApp(App)  
app.use(createPinia())  
app.use(router)  
app.use(vant) // Vant 组件库  
app.directive('xxx',xxxDirective)  
app.mount('#app')  
```  
#### 3.路由  
`hash` 模式  
```javascript
const routes = [
    {
        path:"/",  // 匹配根路径
        component:App, // 使用 App.vue 作为布局组件  
        children:[
            {
                path:"", // 子路由的"根"
                redirect:"/xxx" // 重定向到 /xxx  
            },
            {
                path:"/:pathMatch(.*)*", // 通配符，捕获所有未定义子路径
                name:"404",
                component:()=>import("@/views/xxx.vue")
            }
        ]
    }
]
const router = createRouter({
    history:createWebHashHistory(),
    routes,
})
```    
`path:"/:pathMatch(.*)*"`  
1.`:pathMatch`——动态参数  
+ 它和`/user/:id`里的`:id`一样，是一个路由参数，名字叫`pathMatch`。  
+ 匹配到的值会存入`$route.params.pathMatch`,这样在`404`页面里就能拿到用户输入的错误路径。  
2.`(.*)`——自定义正则表达式  
+ 括号里的`.*`是`JavaScript`正则表达式，意思是"**任意字符出现0次或多次**"。
+ 默认情况下，动态参数只会匹配到下一个`/`之前的内容（比如`:id`只匹配`123`,不包含`/`）。加上`(.*)`之后，它就**允许匹配`/`本身**,即一个参数可以吃掉一整段包含斜杠的路径。  
3.最后的`*`——可重复修饰符  
+ 这个`*`表示前面的参数(:pathMatch(.*))**可以重复0次或多次**。  
+ 效果是：路径可以有多级，每一级都会被捕获，并且`pathMatch`会变成一个**数组**，分别存放每一段内容。  

##### 总结 
+ `/:pathMatch(.*)`  
相当于定义一个**通吃字符串的兜**，一股脑全装进去。  
+ `/:pathMatch(.*)*`  
相当于定义**一串同类型的兜**（因为`*`表示可重复），每遇到一个`/`就放到一个新兜里，最后把所有兜里的东西按顺序放进数组。

| 写法               | 匹配模式                         | `params.pathMatch(访问`a/b/c`)` | 类型   |
| ------------------ | -------------------------------- | ------------------------------- | ------ |
| `/:pathMatch(.*)`  | 单个参数，自定义正则包含`/`      | `"a/b/c"`                       | 字符串 |
| `/:pathMatch(.*)*` | 可重复参数（`*`）,每一段一个参数 | `["a","b","c"]`                 | 数组   |

所以，不加`*`能匹配多级路径是因为正则允许斜杠，但依然是一个参数，加了`*`是告诉路由:"这不是一个参数，这是多个相同规则的参数"，从而得到数组。
这就是为什么官方推荐带`*`的写法来做`Catch all`路由——数组格式天然帮你把路径段拆好了，处理起来更方便。  

> `"Catch all"`的核心意思就是：`一条特殊的、能匹配所有未定义路径的路由，通常用来显示**404**页面或做全局重定向`。  

#### 核心页面：地图页(`Map.vue`)  
整个项目最复杂的页面，流程如下:
`定位获取->初始化腾讯地图->按分类拉取标记点->渲染标记->点击查看活动->导航/详情`  


