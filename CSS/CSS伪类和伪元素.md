### 伪类与伪元素   
`CSS`为什么要引入伪元素和伪类？   
```javascript
CSS introduces the concepts of pseudo-elements and pseudo-classes to permit formatting based on information that lies outside the document tree.
```  
> `CSS`引入伪类和伪元素的概念是为了格式化文档树以外的信息。伪类和伪元素是用来修饰不在文档树中的部分，比如，比如一句话中的第一个字母，或者列表中的第一个元素。   

> 伪类：伪类用于当已有元素处于某个状态时，为其添加对应样式，这个状态是根据用户行为而动态变化的。比如说，当用户悬停在指定的元素时，我们可以通过`:hover`来描述这个元素的状态。虽然它和普通`css`类似，可以为已有元素添加样式，但是它只有处于`dom`树无法描述的状态下才能为元素添加样式，所以将其称为伪类。   

>伪元素：伪元素用于创建一些不在文档树中的元素，并为其添加样式。比如说，我们可以通过`:before`来在一个元素前增加一些文本，并为这些文本添加样式。虽然用户可以看到这样文本，但这些文本实际不在文档树中。   

[CSS中伪类与伪元素](https://zhuanlan.zhihu.com/p/46909886#:~:text=%E7%9B%B4%E8%AF%91%E8%BF%87%E6%9D%A5%E5%B0%B1%E6%98%AF%EF%BC%9Acss%E5%BC%95%E5%85%A5%E4%BC%AA%E7%B1%BB%E5%92%8C%E4%BC%AA%E5%85%83%E7%B4%A0%E6%A6%82%E5%BF%B5%E6%98%AF%E4%B8%BA%E4%BA%86%E6%A0%BC%E5%BC%8F%E5%8C%96%E6%96%87%E6%A1%A3%E6%A0%91%E4%BB%A5%E5%A4%96%E7%9A%84%E4%BF%A1%E6%81%AF%E3%80%82%20%E4%B9%9F%E5%B0%B1%E6%98%AF%E8%AF%B4%EF%BC%8C%E4%BC%AA%E7%B1%BB%E5%92%8C%E4%BC%AA%E5%85%83%E7%B4%A0%E6%98%AF%E7%94%A8%E6%9D%A5%E4%BF%AE%E9%A5%B0%E4%B8%8D%E5%9C%A8%E6%96%87%E6%A1%A3%E6%A0%91%E4%B8%AD%E7%9A%84%E9%83%A8%E5%88%86%EF%BC%8C%E6%AF%94%E5%A6%82%EF%BC%8C%E4%B8%80%E5%8F%A5%E8%AF%9D%E4%B8%AD%E7%9A%84%E7%AC%AC%E4%B8%80%E4%B8%AA%E5%AD%97%E6%AF%8D%EF%BC%8C%E6%88%96%E8%80%85%E6%98%AF%E5%88%97%E8%A1%A8%E4%B8%AD%E7%9A%84%E7%AC%AC%E4%B8%80%E4%B8%AA%E5%85%83%E7%B4%A0%E3%80%82,%E4%B8%8B%E9%9D%A2%E5%88%86%E5%88%AB%E5%AF%B9%E4%BC%AA%E7%B1%BB%E5%92%8C%E4%BC%AA%E5%85%83%E7%B4%A0%E8%BF%9B%E8%A1%8C%E8%A7%A3%E9%87%8A%E3%80%82%20%E4%BC%AA%E7%B1%BB%E7%94%A8%E4%BA%8E%E5%BD%93%E5%B7%B2%E6%9C%89%E5%85%83%E7%B4%A0%E5%A4%84%E4%BA%8E%E7%9A%84%E6%9F%90%E4%B8%AA%E7%8A%B6%E6%80%81%E6%97%B6%EF%BC%8C%E4%B8%BA%E5%85%B6%E6%B7%BB%E5%8A%A0%E5%AF%B9%E5%BA%94%E7%9A%84%E6%A0%B7%E5%BC%8F%EF%BC%8C%E8%BF%99%E4%B8%AA%E7%8A%B6%E6%80%81%E6%98%AF%E6%A0%B9%E6%8D%AE%E7%94%A8%E6%88%B7%E8%A1%8C%E4%B8%BA%E8%80%8C%E5%8A%A8%E6%80%81%E5%8F%98%E5%8C%96%E7%9A%84%E3%80%82)  

### 伪类和伪元素的区别  
有没有创建一个文档树之外的元素   
`CSS3`中伪元素使用双`::`,伪类等使用`:`   

[常见的伪类和伪元素](https://www.runoob.com/css/css-pseudo-classes.html)
