# offsetHeight-clientHeight-scrollHeight-区别  
+ offsetHeight、offsetWidth:`border+padding+content`;
+ clientHeight、clientWidth:`padding+content`;  
+ scrollHeight、scrollWidth:`padding+实际内容尺寸`;  
这里实际内容尺寸不一定等于`content`大小。  

## scrollTop和scrollLeft
`scrollTop`和`scrollLeft`计算的是当前元素中子元素，向上向下滚动的距离(子元素上侧下侧被挡住的尺寸大小)。
