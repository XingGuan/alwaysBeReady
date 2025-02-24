### `React Hooks`    
#### 【概念理解】什么是钩子(hooks)   
`2018-react 16.7`推出的特性   
非类组件中使用`state`
+ 什么是`hooks`   
+ `hooks`产生的原因   
+ 常见的`hooks`函数    

##### 什么是钩子(`hooks`)  
+ 消息处理的一种方法，用来监视指定程序。    
+ 函数组件中需要处理副作用，可以用钩子把外部代码“钩”进来。

+ 常用钩子：`useState`、`useEffect`、`useContext`、`useReducer`     

> `hooks`一律使用`use`前缀命名：`useXxx`      




#### 拓展   
在`React`类组件中，`constructor(props){ super(props) }`这里`super(props)`是什么意思？   

在 `React` 类组件中，`constructor(props) { super(props); }`这段代码的作用是调用父类(即`React.Component`)的构造函数，并将`props`传递给父类。具体来说：   
+ `super(props)`:   
  +  **调用父类构造函数**: `super`关键字用于调用父类的构造函数。在`React`中，父类是`React.Component`。  
  +  传递`props`:将`props`传递给父类的构造函数，确保`props`在组件实例中可用。    

为什么需要`super(props)`?  
1.初始化`this`:调用`super(props)`后，`this`关键字才会被正确地初始化为当前组件的实例。  
2.访问`props`:通过调用`super(props)`,可以在构造函数中通过`this.props`访问传递给组件的属性。    


