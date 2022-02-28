# Node和Element  
+ `DOM`是一棵树所有节点都是`Node`。  
+ `Node`是`Element`的基类。  
+ `Element` 一定是 `Node`，但 `Node` 不一定是 `Element`。
+ `Element`是其他`HTML`元素的基类，如`HTMLDivElement`。  

## Node包含
+ Document  
`Document` 接口描述了任何类型的文档的通用属性与方法。根据不同的文档类型（例如HTML、XML、SVG，...），还能使用更多 API：使用 "text/html" 作为内容类（content type）的 HTML 文档，还实现了 HTMLDocument 接口，而 XML 和 SVG 文档则（额外）实现了 XMLDocument 接口。 
    + HTMLDocument
    + XMLDocument
+ DocumentFragment  
`DocumentFragment`，文档片段接口，一个没有父对象的最小文档对象。它被作为一个轻量版的` Document` 使用，就像标准的`document`一样，存储由节点`（nodes）`组成的文档结构。与`document`相比，最大的区别是`DocumentFragment` 不是真实 `DOM` 树的一部分，它的变化不会触发 DOM 树的重新渲染，且不会导致性能等问题。  
+ DocumentType
  DocumentType 接口表示了一个包含文档类型的节点 Node。
+ CharacterData(中文意思字符数据)  
`CharacterData`是 `Text` 和 `Comment(注释)` 节点的超接口。文档从不包含 `CharacterData` 节点，它们只包含 `Text`t 节点和 `Comment` 节点。但由于这两种节点具有相似的功能，因此此处定义了这些函数，以便 `Text` 和 `Comment` 可以继承它。  
    + text
    + comment
    + CDATASection 
    CDATASection   
    接口用于表示 CDATA 片段（CDATA section）。在 XML 中， CDATA 可以直接包含未经转义的文本。比如 < 和 &，只要位于 CDATA 片段中，它们就不需要被转义，保持原样就可以了。

+ Element
  + HTMLElement  
  HTMLElement 接口表示所有的 HTML 元素。
  + SVGElemnt 
+ Attr  
# HTMLCollection和ModeList  
`HTMLCollection`是`Element`的集合。  
`NodeList`是`Node`的集合。  

eg:
```javascript
let id = document.getElementById('id');
console.log(id.children);
console.log(id.childNodes);
console.log(id.childNodes instanceof NodeList);
id.tagName //Element
id.nodeName //Node
```   
获取Node和Element的返回结果可能不一样，如`elem.childNodes`和`elem.children`。  

>`HTMLCollection`和`NodeList`都不是数组而是类数组。   



