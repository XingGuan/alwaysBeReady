> 对于`Echarts`这种大型库，全量引入（尤其是项目初期）确实会造成打包体积激增，严重影响页面加载速度。   

针对`Vue2 + Webpack`老项目，主要有以下几种优化方案，从易到难，你可以根据项目情况选择：   
#### 方案一：使用官方提供的按需引入（推荐，最常用）  
这是最直接、最有效的官方解决方案。你不再引入整个`echarts`,而只是引入你需要的图表、组件和功能。   
1.**安装必要的依赖**  
你需要使用官方的按需引入包`babel-plugin-equire`来辅助（虽然它叫`babel-plugin`,但主要是提供一些工具方法）。  
```bash  
    npm install --save-dev bebel-plugin-equire
```  
2.**创建自定义的`Echarts`文件**（如`src/libs/echarts.js`）  
在这个文件里，你声明你需要用到的模块。   
```javascript
  //引入 echarts 核心模块，提供 echarts 对象  
  import * as echarts from 'echarts/core'; 
  // 引入你需要使用的图表  
  import { BarChart，LineChart，PieChart } from 'echarts/charts';  
  // 引入提示框、标题、直角坐标系、数据集、内置数据转换器等组件  
  import { TitleComponent,TooltipComponent,GridComponent,DatasetComponent,TransformComponent,LegendComponent} from 'echarts/components';  
  // 引入 Canvas 渲染器  
  // 注意：如果只需要用到`SVG`渲染器，可以引入`SVGRenderer`  
  import { CanvasRender } from 'echarts/renderers';  
  // 注册必须的组件   
  echarts.use([
    BarChart,
    LineChart,
    PieChart,
    TitleComponent,
    TooltipComponent,
    GridComponent,
    DatasetComponent,
    TransformComponent,
    LegendComponent,
    CanvasRender,
  ]);
// 导出绑定好的 echarts 实例  
export default echarts;
```  
3.在`Vue`组件中使用自定义的`echarts`  
在你的`.vue`文件中，不再从`echarts`引入，而是从你上边创建的文件引入。  
```vue  
  <template>
    <div ref="chartDom" style="width:600px;height:400px;"></div>
  </template>
  <script>
    // 从我们自定义的按需引入文件导入，而不是完整的'echarts'  
    import echarts from '@/libs/echarts'  
    export default{
      name:'MyChart',
      mounted(){
        this.initChart();
      },
      methods:{
        initChart(){
          const myChart = echarts.init(this.$refs.chartDom);  
          const option = {
            title:{text:''},
            tooltip:{……},
            xAxis:{type:'category',data:['Q1','Q2','Q3','Q4']},  
            yAxis:{type:'value'},  
            series:[{type:'bar',data:[100,200,300,400]}]
            // 注意：这里的 type: 'bar' 必须和你注册的`BarChart`对应
          };
          myChart.setOption(option);
        }
      }
    }
  </script>
```  
**优点：**  
+ **官方推荐**，安全可靠。  
+ **效果显著**，体积可以减少`60%`以上，具体取决于你引入了多少模块。  
+ **灵活可控**，项目需要什么图表就注册什么图表。  
**缺点：**  
+ 需要手动维护注册列表，新增图表或组件时需要回来修改 `echarts.js`文件。   
#### 方案二：使用`babel-plugin-equire`实现"半自动"按需引入  
这个方案是方案一的自动化版本，适合更复杂的按需场景，但配置稍复杂。 
1.安装插件  
```bash  
  npm install --save-dev babel-plugin-equire
```  
2.**配置`Babel`**(`.babelrc` 或 `babel.config.js`)  
```javascript
  {
    "plugins":[
      [
        "equire",
        {
          // 指定要引入的模块，数组形式  
          "libraryName":"echarts",
          "libDir":"lib/chart", // 通常不需要改  
          "camel2DashComponentName":false // 通常不需要改
        }
      ]
    ]

  }
```  
3.在项目入口文件或特定模块中"按需"引入   
```javascript
  // 在需要使用 `echarts` 的文件中这样写  
  const echarts = require('echarts/lib/echarts');  
  // 然后 "按需" require 其他模块，这些 `require`语句会被 `babel` 插件处理  
  require('echarts/lib/chart/bar');  
  require('echarts/lib/component/tooltip');  
  require('echarts/lib/component/title'); 
  // ... 然后正常使用 `echarts`
```  
**优点：**  
+ 避免了在同一个文件中维护巨大的`use`列表。   
**缺点：**  
+ 配置相对麻烦，需要修改`Babel`。  
+ `require`语句分散在代码中，不如方案一集中管理直观。  
+ **现在更推荐使用方案一**。   
#### 方案三：使用`externals`并配合`CDN`引入（辅助方案）  
这个方案不减少总体积，而是将`Echarts`从你的打包文件中剥离出来，通过`CDN`加载，可以有效利用浏览器缓存，加速不同页面间的加载速度。   
1.在`index.html`中通过`<script>`引入`CDN`资源  
```html
  <head>
    <script src="https://cdn.jsdelivr.net/npm/echarts@5.4.3/dist/echarts.min.js"></script>
  </head>
```  
2.配置`Webpack`的`externals`  
在`webpack.config.js`中告诉`webpack`：`import echarts from 'echarts'`时，不要打包它，而是去全局变量`echarts`中找。  
```javascript
  //webpack.config.js  
  module.exports={
    // ...其他配置  
    externals:{
      echarts:'echarts' // key:包名，value: 全局变量名
    }
  }
```  
3.在代码中正常`import`(但实际不会被打包)  
```vue  
<script>
  //这行代码现在只是一个"声明",`webpack`不会打包它  
  // 运行时会去`window.echarts`找这个库  
  import echarts from 'echarts';   
  export default{
    // ...组件逻辑
  }
</script>
```  
 **优点**：
+ 极大的减小了你的`vendor.js`打包体积。
+ 如果用户访问过其他也使用了相同`CDN`地址的网站，浏览器可能会直接从缓存加载，速度极快

**缺点**：
+ 没有真正减少代码量，用户还是要加载完整的`echarts`。 
  依赖外部`CDN`,需要考虑`CDN`的稳定性和可用性。
  通常与方案一结合使用：即自己按需打包，然后再用`CDN`。   

#### 总结与建议   
|方案|优点|缺点|适用场景|
|-|-|-|-|
|方案一：官方按需|**效果最好，最推荐**|需手动维护来引入列表|绝大多数场景的首选|
|方案二：`Babel`插件|自动处理按需引入|配置复杂，已不主流|老项目遗留方案，现在不推荐|
|方案三：`CDN + externals`|减少自身包体积；利用浏览器缓存|仍需加载全量库；依赖网络|作为辅助手段，与方案一结合|  

> `externals` 中文意思-外部的
> 最终建议  
> **直接采用【方案一：官方按需引入】。这是目前最优雅、最有效、也是最主流的方式。**

1.在 `src/libs` 下创建一个 `echarts.js` 文件。
2.根据你项目当前使用的图表类型，只 `import` 和 `use` 必要的模块。
3.将项目中所有 `import echarts from 'echarts'` 的地方，改为从你的自定义文件引入 `import echarts from '@/libs/echarts'`。
4.进行全面的测试，确保所有图表功能正常。
5.使用 `webpack-bundle-analyzer` 分析打包结果，你会惊喜地发现体积大幅减小。


#### 扩展`babel-plugin-equire`
`babel-plugin-equire`是一个用于**按需加载`Echarts`模块**的`Babel`插件。它可以帮助你在使用`Echarts`时减少项目打包体积。下面我来详细解释一下它的作用、工作原来和用法。  
#### 主要用途 
`Echarts`是一个功能强大的图表库，但通常我们只会用到其中的部分图表或组件。如果直接引入整个`Echarts`，会导致打包体积过大。  
 `babel-plugin-equire`的作用就是让你能够只引入你真正需要的`Echarts`模块。
 使用这个插件后，你不再需要手动编写繁琐的导入语句，插件会在编译过程中自动将它们转换为对应的按需导入语句。  
 #### 工作原理  
 当`Babel`编译你的代码时，`babel-plugin-quire`插件会将使用`equire`或`equireAsync`函数的代码，转换为一组对应的`Echarts`按需导入语句（`import statements`）。  
 `eg：`
 ```javascript
   const echarts = require(['line','tooltip']);  
   在编译后会被转换成：
   import echarts from 'echarts/lib/echarts';  
   import 'echarts/lib/chart/line';
   import 'echarts/lib/component/tooltip';
 ```
#### 安装与配置  
  1.安装插件：你需要同时安装`babel-plugin-equire`和`echarts`  
 ```javascript
   npm install --save-dev babel-plugin-equire  
   npm install --save echarts   
 ```
 2.配置**Babel**：在你项目根目录下的`.babelrc`文件中添加该插件
 ```babelrc  
 {
   "plugins":[
     ...
     "equire"
   ]
 }
 ```
#### 使用方法  
 同步加载（常用）  
 1.创建一个初始化`Echarts`的文件（如`src/untils/initEcharts,js`）:  
```javascript
// eslint-disable-next-line  
const echarts = equire([
    'line',  //折线图   
    'bar', //柱状图  
    'pie',  //饼图  
    'tooltip', //提示框组件  
    'legend', //图例组件  
    'title'  //标题组件
]);  
export default echarts;
```  
2.在你的`Vue`组件或其它文件中使用  
```javascript
import echarts from '@/utils/initEcharts'; //根据你的实际路径调整 
 //然后就可以使用echarts来创建图表了 
this.chart = echarts.init(document.getElementById('chart-dom'));   
this.chart.setOption({...});
```  
#### 异步加载(如需代码分割)  
 你也可以使用`equireAsync`进行异步加载，这对代码分割(`code-splitting`)场景有用：   
```javascript
 //在初始化文件中  
 //eslint-disable-next-line 
const initEcharts = equireAsync([
    'line',
    'tooltip'        
]);
export default initEcharts;
// 在业务组件中使用  
import initEcharts from '@/utils/initEcharts';  
initEcharts().then(echarts=>{
 //在这里使用 echarts 初始化图表
});
```  
 **Vue项目集成**：常将初始化后的`echarts`对象挂载到`Vue`原型上以便全局使用，例如：   
```javascript
 //在main.js或类似入口文件中  
import echarts from '@/utils/initEcharts';  
Vue.prototype.$echarts = echarts;
``` 
> **打包体积优化：**按需引入能显著减小打包体积。实际优化效果取决于项目使用的模块数量。  
