### `CSS`预处理器和`CSS`后处理器   
#### 核心概念   
+ 预处理器：让你用更强大、更高级的语言来写样式，
+ 后处理器：对已经写好的普通`CSS`进行**优化、转换和处理**，使其更适合目标环境（如浏览器）。  
它们不是互斥的，在现在前端工作流中，它们常常协同工作。   

#### 一、`CSS`预处理器   
预处理器定义了一种新的、更强大的"语言"，它扩展了`CSS`的功能，然后通过其自带的编译器，将这种语言编译成浏览器能识别的原生`CSS`。  
1.核心思想  
"开发时"使用增强的语法，"运行时"使用编译后的标准`CSS`。  
2.**主要特性/解决的问题**：  
+ **变量**：定义可重复使用的值（如颜色、字体、尺寸）。   
```scss
    $primary-color:#3498db;
    $font-stack:Helvetica,sans-serif;
    body{
        color: $primary-color;
        font-family: $font-stack;
    }
```  
+ **嵌套**：清晰地表征层级关系，避免重复书写父选择器。   
```scss  
    nav{
        ul{
            margin:0;
            padding:0;
            li{
                display:inline-block;
                a{
                    text-decoration:none;
                }
            }
        }
    }
```  
+ **混合**：定义可重用的样式"代码块",甚至可以传参。  
```scss
    @mixin border-radius($radius){
        -webkit-border-radius:$radius;
        -moz-border-radius:$radius;
        border-radius:$radius;
    }
    .box{
        @include border-radius(10px);
    }
```  
+ **函数和运算**：可以在样式表中进行数学计算。   
```scss  
    .sidebar{
        width:600px / 960px * 100%;
    }
```  
+ **模块化**：通过`@import`将样式表分割到多个文件中，最后编译时合并，减少`HTTP`请求。
+ **继承**：让一个选择器继承另外一个选择器的所有样式。
```scss  
    %message-shared{
        border:1px solid #ccc;
        padding:10px;
    }
    .message{
        @extend %message-shared
    }
```  
3.主流工具   
+ `Sass/SCSS`：最流行、功能最强大的预处理器。有两种语法：缩进式的`.sass`和类似`CSS`的`.scss`（现在更常用）。  
+ **Less**：语法和`SCSS`非常类似，早期因使用简单而流行（例如，变量用`@`符号）。   
+ **Stylus**：语法非常灵活，可以省略大括号和分号，更像`Python`。   

#### 二、`CSS`后处理器  
后处理器接收原生`CSS`作为输入，并对其进行处理和转换，最终输出优化后的`CSS`。  
1.核心思想  
"编译后"对`CSS`进行"加工"和"优化"。  
2.主要功能  
后处理器的功能主要由各种插件实现，最著名的平台是`PostCSS`。你可以把它想象成一个用`JavaScript`转换`CSS`的工具箱。   
+ **自动添加浏览器厂商前缀**：这是后处理器最经典的用途。使用`autoprefixer`插件，你需要写标准的`CSS`属性（如`display:flex`）,它会根据`Can I Use`的数据自动为你添加`-webkit-`,`-ms-`等前缀。   
    + 输入：  
    ```css
        .example {
            display: flex;
        }
    ``` 
    + 输出：  
    ```css  
        .example {
            display: -webkit-box;
            display: -ms-flexbox;
            display: flex;
        }
    ```  
    + **使用未来的`CSS`语法**：`postcss-preset-env`插件，你可以使用尚未被所有浏览器支持的`CSS`新特性（如 `CSS`变量、嵌套语法等），它会将其编译成当前浏览器兼容的格式。   
    + **`CSS`代码检查和风格约束**：使用`stylelint`,可以在构建过程中自动检查`CSS`代码中的错误和风格问题。   
    + **代码压缩**：使用`cssnano`插件，可以压缩`CSS`代码，删除注释和空白，减小文件体积。   
    + **其他功能**：还有很多其他插件，例如处理`CSS`雪碧图、将`CSS`中的图片转为`Base64`编码等。   
### 三、核心区别与如何选择   
|特性|`CSS`预处理器|`CSS`后处理器（以`PostCSS`为例）|
|-|-|-|
|**处理时机**|**之前**|**之后**|  
|**输入**|自定义语法（如`SCSS`,`Less`）|标准`CSS`|  
|**输出**|标准`CSS`|优化后的标准`CSS`|  
|**核心能力**|**增强作者的开发体验（变量、嵌套等）**|**优化输出结果（加前缀、压缩、兼容等）**|  
|**思维方式**|我用一种更好地语言来写样式|我写好的标准`CSS`还需要进一步加工|  
|**代表性工具**|`Sass,Less,Stylus`|`PostCSS`(及其插件生态)|  

#### 现代前端工作流   
在现代项目中（如使用`Webpack`,`Vite`等构建工具），**预处理和后处理器通常会一起使用**，形成一个完美的工作流：  
1.**开发阶段**：使用`Sass`编写样式，享受变量、嵌套等特性，提升开发效率和可维护性。   
2.**编译阶段**：构建工具（如`sass-loader`）先将`Sass`代码编译成原生`CSS`。   
3.后处理阶段：再将编译出的`CSS`交给`PostCSS`（如`postcss-loader`）及其插件（主要是`autoprefixer`和`cssnano`）进行处理，自行添加前缀并进行压缩。  
4.最终产出：得到一份**兼容性好、体积最小**的最终`CSS`文件，用于上线。   

#### 总结  
+ **预处理器**关心的是开发过程，它让你用更爽的方式写代码。  
+ **后处理器**关心的是产出结果，它让你的代码更适合在生产环境运行。  

> 如何选择？
> 对于新项目，**强列推荐同时使用两者**：用`Sass/SCSS`作为预处理器来编写样式，用`PostCSS`(特别是`autoprefixer`)作为后处理器来保证浏览器的兼容性。这已经成为现代前端开发的标配。   

#### 常用`PostCSS`插件及功能   
|插件名称|主要功能|常用配置选项|备注|
|-|-|-|-|
|`autoprefixer`|自动添加`CSS`浏览器厂商前缀|`overrideBrowserslist:["last 2 versions",">1%"]`|确保`CSS`兼容性|
|`postcss-preset-env`|允许使用未来的`CSS`特性（如嵌套规则、自定义属性等）|`stage：3`（使用`Stage 3`阶段的`CSS`特性）<br/> `importFrom：path.resolve(__dirname,'./varible.css')`(引入全局变量)|需安装`postcss-preset-env`|  
|`postcss-pxtorem`|将`px`单位转换成`rem`单位，常用于移动端适配|`rootValue:37.5,proList:['*']`,`exclude:/node_modules/i`|常与`amfe-flexible`等脚本配合使用|  
|`cssnano`|`CSS`压缩和优化|通常生产环境启用`ctx.env === 'production'?{}:false`||
|`postcss-import`|支持在`CSS`中使用`@import`语句合并文件||减少`HTTP`请求，优化加载性能|  
|`postcss-nested`|支持`CSS`嵌套规则（类似`Sass`）||如果使用`postcss-preset-env`可能已包含嵌套功能|  
|`postcss-prefix-selector`|为`CSS`选择器添加统一前缀，用于样式隔离（常见于微前端场景）|`prefix:'.my-app`,`transform(函数，排除特定选择器如body)`，`exclude:['.global']`|防止样式冲突|  


### 拓展  
#### `Can I Use`怎么用  
[caniuse.com](https://caniuse.com/)    
也可以使用命令行工具：  
```bash
npm install -g caniuse-cmd
```


#### `amfe-flexible`
> `amfe-flexible`：的核心原理，是动态设置`<html>`元素的`font-size`。它规则`1rem`等于视口宽度的十分之一（`viewWidth/10`）。这样，使用`rem`定义的元素尺寸就能随视口宽度变化等比例缩放。   

例如，在一个视口宽度为 `375px` 的设备上：

`amfe-flexible` 会将 `<html>` 的 `font-size` 设置为 `37.5px` (`375 / 10`)。

此时，一个宽度为 `3rem` 的元素，其实际宽度就是 `3 * 37.5px = 112.5px`。

若用户旋转手机或在不同设备上查看，视口宽度改变，`<html>` 的 `font-size` 值和新布局尺寸会由 `amfe-flexible` 自动重新计算。



