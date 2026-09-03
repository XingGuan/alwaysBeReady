功能流程：  
打开首页或地图页 → 定位 → 浏览主题分类标签 → 选择感兴趣的活动类型 → 点击活动点位查看详情 → 进入详情页 → 点击导航，前往目的地  

地图：腾讯地图（ `GL JS（map.qq.com/gljs`，`TMap.MultiMarker` + 自定义 `DOMOverlay`）。  

流程图
```mermaid
graph TD
    A["main.js 入口"] --> B["Vue 3 App"]
    A --> C["Pinia 状态管理"]
    A --> D["Vue Router (Hash 模式)"]

    D --> E["Map.vue 地图主页"]
    D --> F["Detail.vue 活动详情"]

    E --> G["useTencentMap 组合式函数"]
    E --> H["CategoryTabs 分类Tab组件"]
    E --> I["LocationActivitiesSheet 活动弹框"]

    G --> J["腾讯地图 GL JS SDK (异步加载)"]

    C --> K["User Store 用户/设备"]
    C --> L["WebSocket Store"]

    L --> M["WebSocketClient 封装类"]
    M --> N["WebSocket 服务端"]

    K --> O["localStorage 加密持久化"]

    E --> P["API 层 (Axios + axios-retry)"]
    F --> P
    P --> Q["后端 REST 接口"]

    A --> R["AnalysysAgent 埋点SDK"]
    A --> S["Hybrid App Bridge 原生桥"]
```
> `graph`声明"这是一个流程图"，`TD`定义图表的"布局方向"。  

