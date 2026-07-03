#### Vue3路由+缓存组合写法  
[vue3 内置组件keep-alive](https://cn.vuejs.org/guide/built-ins/keep-alive.html)
```javascript
<RouterView v-slot="{ Component }">
  <keep-alive include="Home">
    <component :is="Component" />
  </keep-alive>
</RouterView>
```

#### KeepAlive  
`<KeepAlive>`是一个内置组件，它的功能是在多个组件间动态切换时**缓存被移除的组件实例**。  

#### 基本使用  
在组件基础中，通过特殊的`<component>`元素来实现**动态组件**的用法：  
```template
<component :is="activeComponent" />
```  
默认情况下，一个组件实例在被替换掉后会被销毁。这会导致它丢失其中所有已变化的状态——当这个组件再一次被显示时，会创建一个只带有初始状态的新实例。
#### 包含/排除 
> `props`是`properties`的缩写，意为"属性"。
`<KeepAlive>`默认会缓存内部的所有组件实例，但我们可以通过`include` 和 `exclude`prop来定制该行为。
这两个`prop`的值都可以是一个以**英文逗号分隔的字符串**、**一个正则表达式**，或是**包含这两种类型的一个数组**。   
> 在`Vue`里，`<KeepAlive>`的`include`属性用来**按组件名缓存组件**。  
> `JavaScript`正则表达式默认就是大小写敏感的。   
```javascript
<!-- 以英文逗号分隔的字符串 -->
<KeepAlive include="a,b">
  <component :is="view" />
</KeepAlive>
<!-- 正则表达式 (需使用 `v-bind`) -->
<KeepAlive :include="/a|b/">
  <component :is="view" />
</KeepAlive>
<!-- 数组 (需使用 `v-bind`) -->
<KeepAlive :include="['a', 'b']">
  <component :is="view" />
</KeepAlive>
```  
> 它会根据组件的`name`选项进行匹配，所有如果组件想要条件性地被`KeepAlive`缓存，就必须显示声明一个`name`选项。

#### 最大缓存实例数  
我们可以通过传入`max`prop 来限制可被缓存的最大组件实例数。`<keepAlive>`的行为在指定了`max`后类似一个`LRU`缓存[3]：如果缓存的实例数量即将超过指定的那个最大数量，则最久没有被访问的缓存实例将被销毁，以便为新的实例腾出空间。  
```template  
<KeepAlive :max="10">
  <component :is="activeComponent" />
</KeepAlive>
```     
#### 缓存实例的生命周期  
当一个组件实例从`DOM`上移除但因为被`<keepAlive>`缓存而作为组件树的一部分时，它将变为**不活跃**状态而不是被卸载。当一个组件实例作为缓存树的一部分插入到`DOM`中时，它将重新**被激活**。   
一个持续存在的组件可以通过`onActivated()`和`onDeactivated()`注册相应的两个状态的生命周期钩子：  
```vue
<script setup>
  import {onActivated,onDeactivated} from 'vue'  
  onActivated(()=>{
    // 调用时机为首次挂载
    // 以及每次从缓存中被重新插入时
  })
  onDeactivated(()=>{
    // 在从DOM上移除，进入缓存  
    // 以及组件卸载时调用
  })
> 请注意：
> `onActivated`在组件挂载时也会调用，并且>`onDeactivated`在组件卸载时也会调用。  
> 这两个钩子不仅适用于`<KeepAlive>`缓存的根组件，也适用于缓存树中的后代组件。

</script>
```



#### 动态组件  
有些场景会需要在两个组件间来回切换，比如Tab界面：
上面的例子是通过`Vue`的`<component>`元素和特殊的`is` `attribute`实现的：  
```template  
<!-- currentTab 改变时组件也改变 -->
<component :is="tabs[currentTab]"></component>
```  
在上面的例子中，被传给`:is`的值可以是以下几种：  
+ 被注册的组件名 [1] 
+ 导入的组件对象  [2]

你可以使用`is`attribute来创建一般的`HTML`元素。  

> 当使用 `<component :is="...">`来在多个组件间作切换时，被切换掉的组件会被卸载。我们可以通过`<KeepAlive>`组件强制被切换掉的组件仍然保持"存活"的状态。





[1]在`Vue`的`<component :is="..."/>`中，`is`接收的值可以是**字符串（已注册的组件名）**，也可以是**组件对象本身（导入的组件定义）**。    
**1.被注册的组件名（字符串）**  
它的值是一个**字符串**,这个字符串必须与**组件注册时的名字**一致（全局注册和局部注册）。 
```javascript
// 假设已经局部注册了 Home 和 About
export default {
  components: {
    Home,
    About
  },
  data() {
    return {
      currentTab: 'home',
      tabs: {
        home: 'Home',   // 字符串 'Home'
        about: 'About'  // 字符串 'About'
      }
    }
  }
}

<component :is="tabs[currentTab]"></component>
```    
如果组件是全局注册的（如 app.component('Home', Home)），同样可以使用字符串 'Home'。  
[2]2.导入的组件对象  
它的值是直接通过`import`引入的**组件定义对象**(通常是一个包含`template`、`setup`、`name`)等选项的对象，或者`.vue`文件的默认导出。   
```javascript
import Home from './Home.vue'
import About from './About.vue'

export default {
  data() {
    return {
      currentTab: 'home',
      tabs: {
        home: Home,     // 组件对象 Home
        about: About    // 组件对象 About
      }
    }
  }
}
<component :is="tabs[currentTab]"></component>
```  
[3] `LRU`缓存，全称是`Least Recently Used Cache`，即"最近最少使用"缓存。  
它是一种**缓存淘汰策略**，核心思想非常简单：  
> 当缓存空间满了、需要腾出位置存放新数据时，优选**淘汰最长时间没有被访问过的数据**。   
#### 为什么要用`LRU`  
计算机的缓存空间是有限的，但数据访问往往具有局部性：
+ 最近被访问过的数据，短期很可能再次被访问。  
+ 很久没被碰过的数据，短期内被用到的概率更低。   
`LRU`就是基于这个假设，尽可能把"热数据"留在缓存里，把"冷数据"踢出去，从而提高缓存命中率。   
#### 它是怎么工作的  
可以把`LRU`缓存想成一个**有固定容量的盒子**，里面的数据按访问时间排序：  
1.访问（读取）一个数据  
+ 如果数据已在缓存中，就把它挪到"最近使用"的一端，表示它刚被用过，  
+ 如果不在，就去数据源加载，并放入缓存。  
2.写入一个新数据  
+ 放入缓存，同样标记为最新使用。  
+ 此时如果缓存**超过容量上限**，就从"最久未使用"的那一端淘汰一个数据。  
3.每次操作都会更新访问顺序。  
这样，缓存里留下的始终是最近被频繁访问的数据。  

#### 典型的实现方式  
在工程中，要保证`LRU`的查询和插入都很快，最经典的方法是：  
**哈希表+双向链表**  
+ **哈希表(`HashMap`)**:记录`key`->链表节点的映射，实现O(1)查找。  
+ 双向链表：维护数据的访问顺序。   
  + 头部是"最近使用"的节点。
  + 尾部是"最久未使用"的节点。
  + 访问或新增时，把节点移到头部；超出容量时，从尾部删除。   
这样`get`和`put`操作都能在O(1)时间完成，非常高效。  

#### 实际应用在哪  
+ **操作系统**：内存页置换（`Page Replacement`）算法中的`LRU`页面置换。  
+ 数据库：`Buffer Pool`(缓冲池)中淘汰冷数据页。  
+ `Redis`:作为缓存淘汰策略之一（`allkeys-lru`、`volatile-lru`）。  
+ 浏览器：缓存已解析的`DNS`、页面资源等。   
+ `CPU`缓存：管理缓存行。

> 总结：`LRU`缓存就是一种"喜新厌旧"的缓存策略：总是留下最近用过的数据，淘汰最久没被访问的数据，以此来提高缓存效率。
> 一句话总结：`Buffer Pool`就是在内存里给磁盘数据准备的"快取仓库"，让系统能用内存的速度大量的读写请求，是高性能数据库的心脏。  









