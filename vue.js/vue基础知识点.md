# vue 基础知识点

- [vue-cli 脚手架创建项目目录相关](#vue-cli脚手架创建项目目录相关)
- [vue 路由](#vue路由)
- [vue 项目启动相关](#vue项目启动相关)
- [vue 父子组件间通信](#父子组件间通信)
- [vue 动态组件](#动态组件)
- [vue 异步组件](#异步组件)
- [vue 组件注册](#组件注册)

## vue-cli 脚手架创建项目目录相关

1.src/views 下面的文件虽说以页面的形式展示但是实际上是组件。**在 vue 项目单页面应用中只存在一个页面*App.vue*,其它的都是组件,其它的所有组件其实都是部署到 App.vue 中的`<router-view/>`里**

## vue 路由

1.`<router-view/>`  
路由器视图组件是为给定路径呈现匹配组件的功能组件。 在路由器视图中呈现的组件也可以包含它们自己的路由器视图，这将呈现嵌套路径的组件。  
官方支持的：[vue-router 库](https://github.com/vuejs/vue-router)
[vue-router 文档](https://router.vuejs.org/guide/#htmlr)

## vue 项目启动相关

1.当运行`npm run`命令来启动项目时,就会找到项目中 package.json 中 scripts 中定义的一些命令。

## 父子组件间通信

### 子组件往父组件传递信息

通过\$emit 事件传递
[参考博客](https://blog.csdn.net/GXing007/article/details/80908140)

### 父组件往子组件传递信息

[参考文档](https://cn.vuejs.org/v2/guide/components.html)  
**Prop 是你可以在组件上注册的一些自定义 attribute。当一个值传递给一个 prop attribute 的时候，它就变成了那个组件实例的一个属性。为了给博文组件传递一个标题，我们可以用一个 props 选项将其包含在该组件可接受的 prop 列表中.**

## 动态组件

[vue 动态组件文档](https://cn.vuejs.org/v2/guide/components.html)  
用法：
`<component :is="is指令绑定的就是我们需要展示的一个组件"></component>`

## 异步组件

[vue 异步组件文档](https://cn.vuejs.org/v2/guide/components.html)

> **注意：当异步组件与动态组件结合使用的时候 `<component :is="组件名称"></component>`** is 指令绑定的组件名称必须与动态组件的注册名称一样`my: () => import("@c/My")`即当前事例中的 my

## 组件注册

如下我们以驼峰的方式注册组件时`swiperSlide`,那么其实它的组件名称默认为`swiper-slide`  
**swiperSlide:swiper-slide**

```
export default {
  components: {
    swiper,
    swiperSlide
  }
};
```
