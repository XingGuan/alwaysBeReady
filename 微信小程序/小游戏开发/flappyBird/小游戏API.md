### 小游戏配置

小游戏根目录下的`game.json`文件用来对小游戏进行配置。文件内容为一个JSON对象。

[小游戏配置参考文档](https://developers.weixin.qq.com/minigame/dev/reference/configuration/app.html#%E9%85%8D%E7%BD%AE%E9%A1%B9)  


### 小游戏基本模块解析

1. js/libs/weapp-adapter.js

这个适配器文件里原本已经调用`wx.createCanvas`创建一个画布对象, 并把返回的canvas作为全局变量暴露出来。**如果你在require weapp-adapter.js之后再调用wx.createCanvas(),那么创建的Canvas会是一个离屏的Canvas(离屏的canvas是不可见的),因为此时已经不是对该API的首次调用。**  

## quickstart

## 源码目录介绍
```
./js
├── base                                   // 定义游戏开发基础类
│   ├── animatoin.js                       // 帧动画的简易实现
│   ├── pool.js                            // 对象池的简易实现
│   └── sprite.js                          // 游戏基本元素精灵类
├── libs
│   ├── symbol.js                          // ES6 Symbol简易兼容
│   └── weapp-adapter.js                   // 小游戏适配器
├── npc
│   └── enemy.js                           // 敌机类
├── player
│   ├── bullet.js                          // 子弹类
│   └── index.js                           // 玩家类
├── runtime
│   ├── background.js                      // 背景类
│   ├── gameinfo.js                        // 用于展示分数和结算界面
│   └── music.js                           // 全局音效管理器
├── databus.js                             // 管控游戏状态
└── main.js                                // 游戏入口主函数

```