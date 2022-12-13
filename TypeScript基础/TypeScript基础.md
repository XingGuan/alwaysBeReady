###  `TypeScript`基础补充  
+ `typeScript` 是 `JavaScript`的超集。 

### `TypeScript`作用  
给原生`JavaScript`添加静态类型检查。  

> `TypeScript` 与 `ES6` 一样目前还无法被主流浏览器直接读取（必须经过编译）。  

### `TypeScript`的编译  
必须使用相应的编译器。
编译器:`ts-loader`、`awesome-typescript-loader`、
以及`babel-loader`。 `create-react-app`默认引入的编译器是`babel-loader`。  

### 编译器配置文件
`tsconfig.json`   

`tsconfig.json`文件解读  
`compilerOptions`定义了编译器的工作方式  

添加属性
```
"noImplicitAny": false,  //不需要显示的声明变量的类型any
```  
### `tsconfig.json`
```json
{
  "compilerOptions": {
    "noImplicitAny": false,  //不需要显示的声明变量的类型any
    "target": "es5", // 编译后目标`javascript`版本,ES5,ES6/ES2015,ES2016,ES2017,ES2018,ES2019,ES2020,ESNext
    "lib": [//编译器，所有需要包括的库文件，通过这些库文件，通过这些库文件告诉typescript编译器，哪些功能可以使用
      "dom", 
      "dom.iterable",
      "esnext"
    ],
    "allowJs": true, //允许混合编译 JavaScript 文件
    "skipLibCheck": true,
    "esModuleInterop": true,  // 允许我们使用 common js的方式import 默认文件 ,import React from 'react'
    // "esModuleInterop":false,  import * as React form 'react'
    "allowSyntheticDefaultImports": true,
    "strict": true,
    "forceConsistentCasingInFileNames": true,
    "noFallthroughCasesInSwitch": true,
    "module": "esnext",// 配置的是我们代码的模块系统，Node.js的CommonJS、ES6标准的`esnext`、`requirejs`的AMD
    "moduleResolution": "node", //决定了我们编译器的工作方式,'node'和'classic'（已废弃） 
    "resolveJsonModule": true,
    "isolatedModules": true, // 编译器会将每个文件作为单独的模块来使用
    "noEmit": true, // 表示当编译发生错误的时候，编译器不要生成 `javascript` 代码
    "jsx": "react-jsx" //允许编译器支持编译react代码
  },
  "include": [
    "src"
  ]
}
```
#### `tsconfig.json`其它配置 

+ `'include':["src/**/*"]`  
> 使用此选项列出我们需要编译的文件，"文件路径"选项需要文件的相对路径或绝对路径，例如：  
"**"-任意子目录    
"*"-任意文件名  
"?"-只要字符跟随"?",这个字符就会被视为可忽略字符(e.g.,"src/*.tsx?"则同时指代"src/*.tsx"与"src/*.ts")  

### `"files":["./file1.ts","./file2.d.ts",...]`
>使用此选项列出编译器应始终包含在编译中的文件。无论是否使用"exclude"选项，都将会编译使用此选项内包括的所有文件。  

### `"exclude":["node/modules","**//.test.ts"]`  
>此选项将会列出从编译文件中排除的文件。它与`"include"`选项采取相同的模式，我们以使用此项来过滤使用`"include"`选项指定的文件。但是，`"exclude"` 选项不会影响`'files'`选项。 

通常，我们会排除node_modules、测试文件、和编译输出目录。  
如果省略此选项，编译器将使用“outDir”选项指定的文件夹。    
如果没有同时指定“files”和“include”这两个选项，则编译器将编译根目录和任何子目录中的所有TS文件，但不包括使用“exclude”选项指定的文件。