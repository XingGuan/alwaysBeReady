`ESM`是`ECMAScript Modules`的缩写，它是**`JavaScript`官方的、标准的模块化方案。**  
简单来说，`ESM`就是用`import`和`export`语句来组织和管理`JavaScript`代码的一种原生方式。
>`ESM`(`ECMAScript Modules`)正是由`ES6`(即`ES2015`)标准正式引入的官方模块化方案。

#### 为什么需要`ESM`?   
在`ESM`出现之前，`JavaScript`没有原生的模块系统，所有代码共享一个全局作用域，容易造成变量冲突和依赖管理混乱。为了解决这些问题，社区先后发明了多种模块化方案，例如：  
+ `CommonJS(CJS)`:主要用于`Node.js`后端环境，使用`require`和`module.exports`。  
+ `AMD(Asynchronous Module Definition)`:主要用于浏览器端，支持异步加载。  
+ `UMD(Universal Modules Definition)`：一种兼容方案，试图让同一份代码能在多种环境中运行。  
这些方案虽然解决了问题，但并非语言原生标准。直到`ES2015(ES6)`标准发布，`ESM`才作为官方模块系统被正式引入。   
#### `ESM`的核心特点  
相对之前的方案，`ESM`具有显著优势，使其成为现代浏览器开发的标准：  
+ **官方标准，原生支持**：`ESM`是`ECMAScript`语言规范的一部分。现在主流浏览器和`Node.js`（从 v12版本开始）都已原生支持，**无需额外工具即可直接使用**。   
+ **静态分析，可优化**：`ESM`的`import/export`是**静态的**，意味着依赖关系在**编译时**就能确定。这带来了几个关键好处：  
  + `Tree Shaking`:打包工具(如`Webpack、Vite`)可以分析代码，**移除未使用的部分**，从而减小最终打包文件的体积。  
  + **更快加载**：由于依赖关系已知，浏览器或工具可以更高效地加载模块。  
+ **支持异步加载**：除了静态`import`,`ESM`还支持`import()`函数，可以实现**按需加载**或**懒加载**，进一步提升应用性能。   

#### 总结  
**`ESM`是现代`JavaScript`开发的基石**。它用一个统一的、语言原生的标准，取代了以往社区中纷繁复杂的模块化方案。你可以简单地将它理解为`JavaScript`**官方的"`import/export`"**语法，这也是现代前端工程化、组件化开发的基础。   
### `ESM` 导入导出注意事项  
> 有`default`就不用`{}`,没有`default`就必须用`{}`。
> 例外：引入所有内容时用`* as`，也不需要`{}`。   

+ 1.什么时候用`{}`（花括号）？  
对方使用"命名导出(`Named Export`)"时。  
命名导出就像一个**具名变量**，导出时叫什么名字，导入时就必须一字不差地写在`{}`里。   
```javascript
// ---------- 导出文件 (module.js) ----------
export const name = 'Alice';
export function sayHi() { console.log('Hi'); }

// ---------- 导入文件 ----------
// ✅ 必须加 {}，且名字必须对上
import { name, sayHi } from './module.js';

// ✅ 也可以重命名（防止名字冲突）
import { name as userName } from './module.js';
```  
+ 2.什么时候不用`{}`(直接写变量名)？  
对方使用"默认导出（`Default Export`）"时。   
默认导出就像一个**匿名主力**，导入时你可以随便给它起任何名字，完全不需要`{}`。  
```javascript
// ---------- 导出文件 (module.js) ----------
// 方式 A：直接导出
export default function() { console.log('Hello'); }

// 方式 B：先定义再导出（效果一样）
const app = { title: 'My App' };
export default app;

// ---------- 导入文件 ----------
// ✅ 不用 {}，名字可以随便起（叫 myApp、x、abc 都行）
import myApp from './module.js';    // 拿到 { title: 'My App' }
import anything from './module.js'; // 拿到同样的东西，名字随意
```  
3.特殊情况：什么时候既不用`{}`,也不是`default`?  
使用`import * as`(命名空间导入)时。   
如果你想把别人导出的**所有东西（包括默认和命名的）**打包成一个对象，就用`* as`，也不需要`{}`。  
```javascript
// --------导出文件------
export const a = 1;
export const b = 2;
export default function() {};  
//------导入文件------
// 不需要{}，打包成一个对象，通过点号访问   
import * as MyModule from './module.js'  
console.log(MyModule.a);  // 1  
console.log(MyModule.b); //2  
MyModule.default();  // 调用默认导出
```  
4.混合导出(最常用、最容易懵的场景)  
当一个文件**既有默认导出（`default`）,又有命名导出**时，导入规则是：**默认的放前面（无{}），命名的放后面（有{}）**。  
```javascript
// ---------- 导出文件 (module.js) ----------
export default function() { console.log('默认'); }
export const helper = '工具';
export const version = '1.0';

// ---------- 导入文件 ----------
// 结构：默认变量（无括号） + 命名变量（有括号）
import defaultFunc, { helper, version } from './module.js';

defaultFunc(); // 调用默认
console.log(helper, version); // 工具 1.0
```  
> `{}`在`import`里绝对不是什么"对象字面量"，它本质是一份"变量名清单（`Binding List`）"或"导入映射表"。  
它的核心作用可以概括为：  
1.**在当前作用域里"声明"这些变量名。**  
2.**把这些变量名，精准地"绑定"到外部模块导出的同名属性上。**    

> **对象字面量**（`Object Literal`）是编程中（最常见于`JavaScript`一种**直接使用大括号（`{}`）创建对象**）的书写方式。`let person = {name: "张三"};`

#### 命名空间导入
`import * as`这种写法叫做"**命名空间导入（`Namespace Import`）**",通俗点说就是："把别人家所有暴露出来的东西，一股脑打包塞进一个巨大的对象里。"
1.命名空间导入它到底创建了什么？  
当你写`import * as MyModule from './module.js'`时，浏览器`/Node`引擎会在当前作用域创建一个**普通对象（`Object`）**,名叫`MyModule`。  
然后，它会遍历被导入模块的所有导出，**把所有东西都挂在这个对象上**：
+ **命名导出（`export`）**——>变成对象的**属性**。  
+ **默认导出（`export default`）**——>变成对象的`default`**属性**。
```javascript
//------导出文件（module.js）------
export const name = 'Alice'; // 命名导出
export const age = 25; // 命名导出
export default function log(){ // 默认导出
  console.log('Hello');
}
// ------导入文件------
import * as MyModule from './module.js';  
console.log(MyModule.name); // 'Alice' （命名导出挂在这里）
console.log(MyModule.age);//25  
console.log(MyModule.default); // [Function: log](默认导出被挂在default上！)
MyModule.default(); // 必须加 .default() 才能调用

```  
2.`import * as`它和`import {}`最大的区别是什么？     
这是最关键的区别，理解了它你就知道该用谁了：   
+ `import {name,age}`（**命名导入**）：这叫"**主动取用**"。你把`name`和`age`这两个变量**解绑**（**解构**）**出来**,它们直接存在于当前作用域，像你自己声明的变量一样。   
+ `import * as obj`(**命名空间导入**)：这叫"**打包成包裹**"。你并没有把变量拆开，而是把它们装进了一个盒子里。访问时必须通过`obj.属性`来拿。  

3.什么时候该用`import * as`?   
虽然它很方便，但在现代前端（`React/Vue`）实际开发中，**极其不推荐随意使用**。只有少数特定场景适合它：  
  1.封装一个大工具库（如`Lodash、Math工具`）：  
  如有你有一个文件导出了几十个工具函数，用`{}`写一大堆太长了，可以打包成一个对象导入。   
  ```javascript
  import * as Utils from './utils';
  Utils.formatDate(); // 调用
  Utils.getRandom();  
  ```  
  2.为了绕过同名变量冲突：  
  如果你导入的两个模块都导出了同名的`data`，用`{}`会报错，但用`* as`起不同别名就能区分。  
  ```javascript
  import * as UserData from './User'；  
  import * as ProductData from './product';  
  UserData.data;    // 用户的 data
  ProductData.data; // 商品的 data
  ```
  3.动态导入（`import()`）时的默认接收（不过那是`Promise`场景）  

> 命名空间导入有一个最致命的问题：`Tree Shaking`(摇树优化)失效！这是你在生产环境中**不要滥用`* as`的根本原因**。  

现代打包工具(`Webpack、Vite`) 在打包时，会做"`Tree Shaking`",即**只打包你用到的代码，没用的代码直接删掉**。  
  + 当你用`import {format} from 'lodash'`时，打包工具能精准地只留下`format`函数，其他几千个函数全删了（体积很小）。   
  + 但当你写了`import * as lodash from 'lodash'`时，**打包工具很难分析出**你究竟会用到`lodash`对象上的哪个属性（因为`JS`是动态语言，`lodash[变量]这种写法无法预判`），所以为了不出错，它会**把这个Lodash库全打包进去**！体积瞬间暴涨几百`KB`!  

> **所以能不写`import * as`就尽量不写，优先使用`import {}`按需导入**。

### 总结  
+ `import {}`：精准定名拿东西，**性能最好，最推荐**。  
+ `import * as`:整个端走放箱子里，**防冲突很方便，但容易导致打包体积过大，慎用。**










#### 按需加载和懒加载   
要实现按需加载和懒加载，**不能使用**静态的`import……from……`语法（因为它在编译时就被静态分析，无法按条件执行），而必须使用`ESM`提供的**动态导入**（`Dynamic import`）语法：`import()`。   
> `import()`是一个函数,它返回一个`Promise`，因此你可以配合`.then()`或`async/await`来使用。   

#### 经典使用场景  
前端框架中的实际应用（路由懒加载）  
通过箭头函数包裹 `import()`，实现路由级别（页面级）的代码分割。   
+ `React(React Router)`  
```javascript
const Home = React.lazy(()=>import('./pages/Home'));
const About = React.lazy(()=>import('./pages/About'));  
// 配合 Suspense 使用    
<Suspense fallback={<div>Loading……</div>}>
    <Route path="/home" component={Home} />
</Suspense>
```    
+ `Vue(Vue Router)`  
```javascript   
const routes=[{
    path:'/about',
    // 直接使用动态 import,Webpack/vite 会自动进行代码分割
    component:()=>import('./pages/About.vue')
}]
```
> 注：现代打包工具(`Webpack、Vite、Rollup`)在遇到`import`语法时，**会将其作为代码分割（`Code Splitting`）的边界**，自动把动态导入的模块打包成一个独立的`chunk`文件。   

当你触发加载时，浏览器会去请求这个新生成的独立`JS`文件，从而实现真正的"**需要时在请求**",既做到了按需加载，也做到了懒加载。   

#### `import()`函数返回的是一个`Promise`,这里用`()=>import('')`箭头函数起到什么作用  
`import()`是一个**函数式**的语法，它返回的就是一个`Promise`对象。  
+ 因为`import()`需要去**网络请求**一个远程的`JS`文件，这是一个典型的**异步操作**。在文件下载并执行完毕之前，浏览器不知道里面有什么，所以无法同步返回结果。  
+ 返回`Promise`就完美解决了这个问题：**加载成功**，`Promise`变为`fulfilled`,可以拿到模块内容；**加载时报（如网络断开）**，`Promise`变为`rejected`，你可以捕获异常。  

> 这也是为什么`import()`可以使用`await import(……)`或`.then(module=>……)的原因。`  

2.箭头函数`()=>import('')`起到什么作用
 这是实现真正意义上的"懒加载"最关键的一步，它的核心作用可以概括为四个字：**延迟执行**。  
 不加箭头函数和加上箭头函数的区别：  
+ 不加箭头函数（直接写）——不是懒加载  
```javascript
// 假如路由配置里直接写成一个对象  
const routes = [
  {
    path:'/about',
    component:import('./pages/About.vue') // 直接调用import()
  }
]
```
  + **执行时机**：当 `JavaScript` 引擎执行到这段路由配置代码时（也就是页面刚一打开的时候），`import()` 会立即被调用。
  + **结果**：浏览器会立刻去网络请求 `About.vue` 对应的 `JS` 文件。这导致首页加载时就要等待所有页面的 `JS` 都下载完，违背了懒加载的初衷（虽然打包工具可能会做代码分割，但加载时机不对）。
+ 加上箭头函数（`()=>import(……)`）—— 真正的懒加载  
```javascript
//真正的路由懒加载写法  
const routes = [{
  path:'/about',
  component:()=>import('./pages/About.vue') // 包裹一层箭头函数
}];
```  
+ **执行时机**：`Vue Router`(或`React Router`)在初始化时，**并不会**调用这个箭头函数，它只是把这个函数**当作一个参数**存起来了。  
+ **关键转折**：只有当用户**点击了**`/about`**链接**，路由开始匹配路径时，路由库才会**主动去调用这个箭头函数（）**。  
+ **结果**：直到用户点击跳转的那一瞬间，`import()`才被触发，浏览器才开始去请求`About.vue`的文件，这才是我们追求的"**用到时才加载**"。
#### `JS`模拟路由库底层逻辑
```javascript
//这就是你传入的路由配置  
const route={
  path:'/about',
  component:()=>import('./About.vue') //传了一个函数
}
//路由库内部简易实现（伪代码）
class Router{
  constructor(routes){
    this.routes = routes;
  }
  // 当用户点击跳转时，路由库会调用这个方法  
  navigateTo(path){
    const route = this.routes.find(r => r.path === path);
    // 注意这里：只有在`navigateTo`被触发时，路由库才会加括号去执行这个函数
    if(route){
      const componentPromise = route.component(); // 这里才真正触发了 `import()`
      componentPromise.then( module => {
        // 渲染组件……
      })
    }
  }
}




```
