# ESM（ECMAScript Modules）知识点总结

## 一、ESM 是什么？

`ESM`是`ECMAScript Modules`的缩写，它是**`JavaScript`官方的、标准的模块化方案。**  
简单来说，`ESM`就是用`import`和`export`语句来组织和管理`JavaScript`代码的一种原生方式。

> `ESM`（`ECMAScript Modules`）正是由`ES6`（即`ES2015`）标准正式引入的官方模块化方案。

---

## 二、为什么需要 ESM？（历史方案）

在`ESM`出现之前，`JavaScript`没有原生的模块系统，所有代码共享一个全局作用域，容易造成变量冲突和依赖管理混乱。为了解决这些问题，社区先后发明了多种模块化方案。其中最具代表性的就是 **CommonJS** 和 **AMD**，它们分别统治了服务端和浏览器端，但也都存在各自的局限性。

### 1. CommonJS（CJS）—— 服务端模块化的绝对主力

CommonJS 是 Node.js 环境采用的默认模块规范，它主要面向服务端开发。

- **核心语法**：使用 `require()` 导入，使用 `module.exports` 或 `exports` 导出。
- **加载机制**：**同步加载**。由于 Node.js 运行在服务器端，模块文件就在本地硬盘上，读取速度非常快（毫秒级），同步加载不会成为性能瓶颈。
- **关键特性**：**运行时加载**。`require()` 本质上是一个函数调用，你甚至可以把它写在 `if` 条件语句里，只有在代码执行到这一行时才会去加载模块。
- **缓存机制**：`require()` 会缓存已加载的模块，多次导入同一个模块只会执行一次，后续直接从缓存中获取。
- **局限性**：正因为它是运行时动态加载，打包工具（如 Webpack）无法在编译时静态分析出哪些代码被使用了，导致无法进行 `Tree Shaking`（摇树优化）。此外，它天生不适合浏览器（因为浏览器加载 JS 文件需要网络请求，同步加载会卡死页面渲染）。

```javascript
// -------- 导出 (module.js) --------
const name = 'Alice';
const age = 25;
module.exports = { name, age };

// 或者逐个导出
exports.sayHi = function() { console.log('Hi'); };

// -------- 导入 (app.js) --------
const module = require('./module.js');
console.log(module.name); // 'Alice'

// 支持条件加载（运行时动态决定）
if (process.env.NODE_ENV === 'development') {
  const devTool = require('./dev-tool.js');
  devTool.init();
}
```

---

### 2. AMD（Asynchronous Module Definition）—— 浏览器端的异步先驱

在 ESM 出现之前，浏览器端缺乏模块化标准，且必须解决网络请求的延迟问题，AMD 因此诞生。

- **核心语法**：使用 `define()` 定义模块，使用 `require()` 异步导入（通常配合回调函数）。
- **加载机制**：**异步加载**。AMD 专门为浏览器设计，模块加载不会阻塞后续 HTML 的渲染和 JS 的执行，所有依赖加载完毕后自动执行回调函数。
- **代表实现**：RequireJS 是 AMD 最著名的实现库，让浏览器端模块化开发成为可能。
- **关键特性**：**依赖前置**。AMD 推崇在定义模块时就提前声明好所有依赖，框架会并行去下载这些依赖文件，充分利用浏览器的并发请求能力。
- **局限性**：写法容易产生“回调地狱”，代码可读性较差，且需要额外配置（路径、别名等）。本质上仍是社区方案而非官方标准，最终被 ESM 取代。

```javascript
// -------- 定义模块 (math.js) --------
// 如果无依赖，第一个参数为空数组
define([], function() {
  return {
    add: function(a, b) { return a + b; },
    multiply: function(a, b) { return a * b; }
  };
});

// -------- 定义依赖其他模块的模块 (main.js) --------
define(['math'], function(math) {
  return {
    calculate: function(x, y) {
      return math.add(x, y);
    }
  };
});

// -------- 导入使用（入口处） --------
require(['main'], function(main) {
  console.log(main.calculate(2, 3)); // 5
  // 回调函数确保 main 及其依赖全部加载完毕后才会执行
});
```

---

### 3. UMD（Universal Modules Definition）—— 跨环境的“万能胶水”

如果说 CJS 是“Node.js 专用语”，AMD 是“浏览器专用语”，那么 UMD 就是一套 **“见什么人说什么话”** 的兼容模板。它本身不发明新的模块语法，而是通过一段巧妙的代码，**检测当前环境到底支持哪种模块标准，然后用对应的方式去暴露模块**。

- **核心设计思路**：使用 **IIFE（立即执行函数）** + **环境判断（Feature Detection）**。
- **判断逻辑（优先级从高到低）**：
  1. **检测是否支持 AMD**（`typeof define === 'function' && define.amd`）→ 如果是，用 AMD 的 `define()` 注册模块。
  2. **检测是否支持 CommonJS**（`typeof module === 'object' && module.exports`）→ 如果是，把模块赋值给 `module.exports`。
  3. **以上都不支持（纯浏览器 Script 标签）** → 直接挂载到全局对象 `window` 或 `global` 上（通过 `this` 指向）。
- **关键特性**：**运行时适配**。所有判断逻辑都发生在代码运行的瞬间，不需要用户干预，库文件“自适应”运行环境。
- **主要用途**：**第三方库（尤其是老牌库）的打包出口**。比如 `Lodash`、`Moment.js`、`jQuery` 在发布到 `npm` 时，通常会提供一个 UMD 格式的入口文件，确保开发者无论用 `require`、`define` 还是 `<script>` 标签引入，都能正常使用。
- **局限性（为何最终被淘汰）**：
  - **代码体积臃肿**：为了兼容三种环境，UMD 模板需要写大量冗余的 `if` 判断和 IIFE 包装代码。
  - **依然不是原生标准**：它只是“兼容方案”的集大成者，并未解决模块化语言层面的根本问题。
  - **依然不支持 Tree Shaking**：因为依赖是运行时动态判断的，打包工具无法在编译时静态分析，导致引入 UMD 包时往往会打进去一堆无用代码。

```javascript
// ---------- 一个标准 UMD 模块模板（经典写法） ----------
// 这是一个立即执行函数，把模块逻辑封装在里面
(function (root, factory) {
    // 第 1 步：检测是否支持 AMD（如 RequireJS 环境）
    if (typeof define === 'function' && define.amd) {
        // ✅ 是 AMD 环境：使用 define 定义模块
        define(['jquery'], factory); // 假设依赖 jquery
    }
    // 第 2 步：检测是否支持 CommonJS（Node.js 环境）
    else if (typeof module === 'object' && module.exports) {
        // ✅ 是 CommonJS 环境：挂载到 module.exports 上
        // 注意：Node 中需要用 require 拿依赖，这里简写示意
        var jquery = require('jquery');
        module.exports = factory(jquery);
    }
    // 第 3 步：以上都不满足（纯浏览器环境，用 <script> 标签引入）
    else {
        // ✅ 浏览器全局环境：直接挂载到 window 对象上
        // 有的库会挂到 root['MyLib']，有的会挂到 root['_']（如 lodash）
        root.MyLibrary = factory(root.jQuery);
    }
}(typeof self !== 'undefined' ? self : this, function ($) {
    // -------- 这是你的真正的模块逻辑代码 --------
    const myModule = {
        version: '1.0.0',
        sayHello: function (name) {
            console.log('Hello, ' + name);
            // 这里使用了外部依赖 $（比如 jQuery）
            $('#app').text('Hello, ' + name);
        }
    };

    // 把模块内容返回给上面检测到的环境
    return myModule;
}));

// ---------- 如何消费它？三种方式任君选择 ----------
// 1. 在浏览器中用 <script> 标签引入后，直接拿全局变量
// <script src="my-library.umd.js"></script>
// <script> MyLibrary.sayHello('Alice'); </script>

// 2. 在 Node.js 中用 require
const MyLibrary = require('./my-library.umd.js');
MyLibrary.sayHello('Bob');

// 3. 在 AMD 环境（如旧版 RequireJS）中
require(['my-library'], function (MyLibrary) {
    MyLibrary.sayHello('Charlie');
});
```

> **UMD 的历史定位**：它是 ESM 普及前的“终极兼容方案”，让库作者只需一份代码就能覆盖几乎所有 JS 运行环境。但如今，随着 `Node.js` 和现代浏览器全面拥抱 ESM，**前端新项目已经很少直接编写或发布纯 UMD 包了**。现在主流的打包工具（如 Vite、Rollup）虽然还保留了“输出 UMD 格式”的选项，但主要是为了给那些还在用 `<script>` 标签的老项目提供便利。

---

### 4. 为什么它们最终让位给了 ESM？

以上方案虽然都曾在各自领域大放异彩，但它们都有共同的致命伤：

1. **并非语言原生标准**：CJS 需要 Node.js 环境支持，AMD 需要 RequireJS 等第三方库，都需要额外工具或特殊处理。
2. **无法静态分析**：CJS 和 AMD 都是运行时确定依赖（动态加载），打包工具无法在编译时预判依赖关系，导致 `Tree Shaking` 失效、打包体积难以极致优化。

正是这些痛点，催生了官方标准 **`ESM`** 的诞生。之后会详细介绍，ESM 是如何从底层设计上解决了上述所有问题的。

---

## 三、ESM 的核心特点

相对之前的方案，`ESM`具有显著优势，使其成为现代浏览器开发的标准：

+ **官方标准，原生支持**：`ESM`是`ECMAScript`语言规范的一部分。现在主流浏览器和`Node.js`（从 v12版本开始）都已原生支持，**无需额外工具即可直接使用**。
+ **静态分析，可优化**：`ESM`的`import/export`是**静态的**，意味着依赖关系在**编译时**就能确定。这带来了几个关键好处：
  + `Tree Shaking`：打包工具（如`Webpack、Vite`）可以分析代码，**移除未使用的部分**，从而减小最终打包文件的体积。
  + **更快加载**：由于依赖关系已知，浏览器或工具可以更高效地加载模块。
+ **支持异步加载**：除了静态`import`，`ESM`还支持`import()`函数，可以实现**按需加载**或**懒加载**，进一步提升应用性能。

---

## 四、基础用法：导入导出注意事项

> 口诀：有`default`就不用`{}`，没有`default`就必须用`{}`。  
> 例外：引入所有内容时用`* as`，也不需要`{}`。

### 1. 什么时候用 `{}`（花括号）？

对方使用“命名导出（`Named Export`）”时。  
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

### 2. 什么时候不用 `{}`（直接写变量名）？

对方使用“默认导出（`Default Export`）”时。  
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

### 3. 特殊情况：什么时候既不用 `{}`，也不是 `default`？

使用`import * as`（命名空间导入）时。  
如果你想把别人导出的**所有东西（包括默认和命名的）**打包成一个对象，就用`* as`，也不需要`{}`。

```javascript
// ---------- 导出文件 ----------
export const a = 1;
export const b = 2;
export default function() {};

// ---------- 导入文件 ----------
// 不需要{}，打包成一个对象，通过点号访问
import * as MyModule from './module.js';
console.log(MyModule.a);  // 1
console.log(MyModule.b);  // 2
MyModule.default();       // 调用默认导出
```

### 4. 混合导出（最常用、最容易懵的场景）

当一个文件**既有默认导出（`default`），又有命名导出**时，导入规则是：**默认的放前面（无{}），命名的放后面（有{}）**。

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

> `{}`在`import`里绝对不是什么“对象字面量”，它本质是一份“变量名清单（`Binding List`）”或“导入映射表”。  
> 它的核心作用可以概括为：  
> 1. **在当前作用域里“声明”这些变量名。**  
> 2. **把这些变量名，精准地“绑定”到外部模块导出的同名属性上。**

> **对象字面量**（`Object Literal`）是编程中（最常见于`JavaScript`）一种**直接使用大括号（`{}`）创建对象**的书写方式。`let person = {name: "张三"};`

---

## 五、进阶用法：命名空间导入（`import * as`）

`import * as`这种写法叫做“**命名空间导入（`Namespace Import`）**”，通俗点说就是：“把别人家所有暴露出来的东西，一股脑打包塞进一个巨大的对象里。”

### 1. 命名空间导入它到底创建了什么？

当你写`import * as MyModule from './module.js'`时，浏览器/`Node`引擎会在当前作用域创建一个**普通对象（`Object`）**，名叫`MyModule`。  
然后，它会遍历被导入模块的所有导出，**把所有东西都挂在这个对象上**：

+ **命名导出（`export`）** ——> 变成对象的**属性**。
+ **默认导出（`export default`）** ——> 变成对象的`default`**属性**。

```javascript
// ---------- 导出文件（module.js） ----------
export const name = 'Alice';      // 命名导出
export const age = 25;            // 命名导出
export default function log() {   // 默认导出
  console.log('Hello');
}

// ---------- 导入文件 ----------
import * as MyModule from './module.js';
console.log(MyModule.name);     // 'Alice' （命名导出挂在这里）
console.log(MyModule.age);      // 25
console.log(MyModule.default);  // [Function: log]（默认导出被挂在default上！）
MyModule.default();             // 必须加 .default() 才能调用
```

### 2. `import * as` 和 `import {}` 最大的区别是什么？

+ `import {name, age}`（**命名导入**）：这叫“**主动取用**”。你把`name`和`age`这两个变量**解绑**（**解构**）出来，它们直接存在于当前作用域，像你自己声明的变量一样。
+ `import * as obj`（**命名空间导入**）：这叫“**打包成包裹**”。你并没有把变量拆开，而是把它们装进了一个盒子里。访问时必须通过`obj.属性`来拿。

### 3. 什么时候该用 `import * as`？

虽然它很方便，但在现代前端（`React/Vue`）实际开发中，**极其不推荐随意使用**。只有少数特定场景适合它：

1. **封装一个大工具库（如`Lodash、Math工具`）**：  
   如果你有一个文件导出了几十个工具函数，用`{}`写一大堆太长了，可以打包成一个对象导入。
   ```javascript
   import * as Utils from './utils';
   Utils.formatDate(); // 调用
   Utils.getRandom();
   ```

2. **为了绕过同名变量冲突**：  
   如果你导入的两个模块都导出了同名的`data`，用`{}`会报错，但用`* as`起不同别名就能区分。
   ```javascript
   import * as UserData from './user';
   import * as ProductData from './product';
   UserData.data;    // 用户的 data
   ProductData.data; // 商品的 data
   ```

3. **动态导入（`import()`）时的默认接收**（不过那是`Promise`场景）。

> 命名空间导入有一个最致命的问题：`Tree Shaking`（摇树优化）失效！这是你在生产环境中**不要滥用`* as`的根本原因**。

现代打包工具（`Webpack、Vite`）在打包时，会做“`Tree Shaking`”，即**只打包你用到的代码，没用的代码直接删掉**。  
+ 当你用`import {format} from 'lodash'`时，打包工具能精准地只留下`format`函数，其他几千个函数全删了（体积很小）。  
+ 但当你写了`import * as lodash from 'lodash'`时，**打包工具很难分析出**你究竟会用到`lodash`对象上的哪个属性（因为`JS`是动态语言，`lodash[变量]`这种写法无法预判），所以为了不出错，它会**把这个Lodash库全打包进去**！体积瞬间暴涨几百`KB`！

> **所以能不写`import * as`就尽量不写，优先使用`import {}`按需导入**。

---

## 六、进阶用法：按需加载和懒加载

要实现按需加载和懒加载，**不能使用**静态的`import……from……`语法（因为它在编译时就被静态分析，无法按条件执行），而必须使用`ESM`提供的**动态导入**（`Dynamic import`）语法：`import()`。

> `import()`是一个函数，它返回一个`Promise`，因此你可以配合`.then()`或`async/await`来使用。

### 1. 经典使用场景：前端框架中的路由懒加载

通过箭头函数包裹 `import()`，实现路由级别（页面级）的代码分割。

+ **React（React Router）**
  ```javascript
  const Home = React.lazy(() => import('./pages/Home'));
  const About = React.lazy(() => import('./pages/About'));
  // 配合 Suspense 使用
  <Suspense fallback={<div>Loading……</div>}>
      <Route path="/home" component={Home} />
  </Suspense>
  ```

+ **Vue（Vue Router）**
  ```javascript
  const routes = [{
      path: '/about',
      // 直接使用动态 import，Webpack/vite 会自动进行代码分割
      component: () => import('./pages/About.vue')
  }]
  ```

> 注：现代打包工具（`Webpack、Vite、Rollup`）在遇到`import()`语法时，**会将其作为代码分割（`Code Splitting`）的边界**，自动把动态导入的模块打包成一个独立的`chunk`文件。

当你触发加载时，浏览器会去请求这个新生成的独立`JS`文件，从而实现真正的“**需要时再请求**”，既做到了按需加载，也做到了懒加载。

---

## 七、深入理解：`import()` 与箭头函数的关系

### 1. 为什么 `import()` 返回一个 `Promise`？

`import()`是一个**函数式**的语法，它返回的就是一个`Promise`对象。  
+ 因为`import()`需要去**网络请求**一个远程的`JS`文件，这是一个典型的**异步操作**。在文件下载并执行完毕之前，浏览器不知道里面有什么，所以无法同步返回结果。  
+ 返回`Promise`就完美解决了这个问题：**加载成功**，`Promise`变为`fulfilled`，可以拿到模块内容；**加载失败（如网络断开）**，`Promise`变为`rejected`，你可以捕获异常。

> 这也是为什么`import()`可以使用`await import(……)`或`.then(module => ……)`的原因。

### 2. 箭头函数 `() => import('')` 起到什么作用？

这是实现真正意义上“懒加载”最关键的一步，它的核心作用可以概括为四个字：**延迟执行**。

**不加箭头函数（直接写）—— 不是懒加载**
```javascript
// 假如路由配置里直接写成一个对象
const routes = [
  {
    path: '/about',
    component: import('./pages/About.vue') // 直接调用import()
  }
]
```
+ **执行时机**：当 `JavaScript` 引擎执行到这段路由配置代码时（也就是页面刚一打开的时候），`import()` 会立即被调用。
+ **结果**：浏览器会立刻去网络请求 `About.vue` 对应的 `JS` 文件。这导致首页加载时就要等待所有页面的 `JS` 都下载完，违背了懒加载的初衷（虽然打包工具可能会做代码分割，但加载时机不对）。

**加上箭头函数（`() => import(……)`）—— 真正的懒加载**
```javascript
// 真正的路由懒加载写法
const routes = [{
  path: '/about',
  component: () => import('./pages/About.vue') // 包裹一层箭头函数
}]
```
+ **执行时机**：`Vue Router`（或`React Router`）在初始化时，**并不会**调用这个箭头函数，它只是把这个函数**当作一个参数**存起来了。
+ **关键转折**：只有当用户**点击了**`/about`**链接**，路由开始匹配路径时，路由库才会**主动去调用这个箭头函数（）**。
+ **结果**：直到用户点击跳转的那一瞬间，`import()`才被触发，浏览器才开始去请求`About.vue`的文件，这才是我们追求的“**用到时才加载**”。

### 3. JS 模拟路由库底层逻辑

```javascript
// 这就是你传入的路由配置
const route = {
  path: '/about',
  component: () => import('./About.vue') // 传了一个函数
}

// 路由库内部简易实现（伪代码）
class Router {
  constructor(routes) {
    this.routes = routes;
  }

  // 当用户点击跳转时，路由库会调用这个方法
  navigateTo(path) {
    const route = this.routes.find(r => r.path === path);
    // 注意这里：只有在`navigateTo`被触发时，路由库才会加括号去执行这个函数
    if (route) {
      const componentPromise = route.component(); // 这里才真正触发了 `import()`
      componentPromise.then(module => {
        // 渲染组件……
      });
    }
  }
}
```

---

## 八、总结

+ `import {}`：精准定名拿东西，**性能最好，最推荐**。
+ `import * as`：整个端走放箱子里，**防冲突很方便，但容易导致打包体积过大，慎用。**
+ **`ESM`是现代`JavaScript`开发的基石**。它用一个统一的、语言原生的标准，取代了以往社区中纷繁复杂的模块化方案。你可以简单地将它理解为`JavaScript`**官方的“`import/export`”语法**，这也是现代前端工程化、组件化开发的基础。
