### `CSS`定位方式详解   
> **探索五种CSS定位方式**：`static`、`relative`、`absolute`、`fixed`和`sticky`。   

#### `Static`定位（静态定位）  
这是所有元素的默认定位方式。元素按照正常的文档流进行排列，不受`top`、`bottom`、`left`、`right`属性的影响。   

使用代码`position:static;`  

#### `Relative`定位（相对定位）  
元素相对于正常位置进行定位，原本所占空间仍保留。可以通过`top、bottom、left、right`属性调整位置。   
 
使用代码：`position:relative`。

### `Absolute`定位（绝对定位）
元素相对于最近的非`static`定位祖先元素进行定位。如果不存在这样的祖先，则相当于初始包含块（通常是`html`元素）。元素不再占据文档流中的空间。   
使用代码：`position:absolute;top:20px;right:30px;`  

### `Fixed`定位 （固定定位）  
元素相对于浏览器窗口进行定位，即使页面滚动，它也会停留在固定位置。不占据文档流空间。   
使用代码：`position:fixed;bottom:20px;right:20px;`   

### `Sticky`定位（粘性定位）  
元素根据用户的滚动位置在`relative`和`fixed`定位之间切换。在跨越特定阈值前为相对定位，之后为固定定位。   
使用代码：`position:sticky;top:20px;`。   

### 定位方式比较
|定位方式|参考点|是否脱离文档流|`scroll`滚动影响|常用场景|
|-|-|-|-|-|
|`static`(静态)|正常文档流|否|随文档滚动|默认布局|
|`relative`(相对)|自身原本位置|否(保留空间)|随文档滚动|微调元素位置|
|`absolute`(绝对)|最近非`static`祖先|是|随祖先元素滚动|弹出层、精确位置元素|
|`fixed`(固定)|浏览器窗口|是|不滚动|导航栏、悬浮按钮|
|`sticky`(粘性)|最近滚动祖先|否(直到固定时)|在阈值内滚动，之后固定|表头、粘性导航|  






