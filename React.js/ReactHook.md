## ReactHook  
[React Hook官方文档](https://react.docschina.org/docs/hooks-overview.html)  
Hook是React 16.8的新增特性。它可以让你在不编写class的情况下使用state以及其他的特性。  
   &ensp;&ensp; 一.没有破坏性改动  
    &ensp;&ensp;&ensp;&ensp;1.完全可选的  
    &ensp;&ensp;&ensp;&ensp;1.100%向后兼容  
    &ensp;&ensp;&ensp;&ensp;1.现在可用  
动机：Hook 解决了我们五年来编写和维护成千上万组件时遇到的各种各样看起来不相关的问题。  
&ensp;&ensp;**可以使用Hook从组件中提取状态逻辑，使得这些逻辑可以单独测试并复用。Hook使你在无需修改组件结构的情况下复用状态逻辑。这使得在组件间或社区内共享Hook变得更便捷。**

`import React,{useState} from 'react';`  
## 1.useState就是一个HooK。  
通过在函数组件里调用它来给组件添加一些内部state。React会在重复渲染时保留这个state。`useState`会返回一对值：**当前**状态和一个让你更新它的函数，你可以在事件处理函数中或其他一些地方调用这个函数。它类似class组件的this.setState,但是它不会把新的state和旧的state进行合并。   
`useState`唯一的参数就是初始state
可以声明多个state变量

## 2.useMemo  
useMemo是针对一个函数，是否多次执行
useMemo主要用来解决使用React hooks产生的无用渲染的性能问题
在方法函数，由于不能使用shouldComponentUpdate处理性能问题，react hooks新增了useMemo

useMemo使用
如果useMemo(fn, arr)第二个参数匹配，并且其值发生改变，才会多次执行执行，否则只执行一次，如果为空数组[]，fn只执行一次
useMemo避免无用方法的调用。  
## 3.useRef   
跨越渲染周期存储数据，而且对它修改也不会引起组件的重新渲染。  
## 4.useReducer  
useReducer接收 (state, action) => newState，并且返回了一个与当前state成对的dispatch的方法。 
## 5.useCallback  
把内联回调函数及依赖项数组作为参数传入useCallback,该回调函数仅仅在某个依赖项改变时才会更新。    