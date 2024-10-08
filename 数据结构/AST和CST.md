### `AST`和`CST`的区别   
`AST(Abstract Syntax Tree)`和`CST(Concrete Syntax Tree)`是两种在编程语言中处理和编译器中常见的树形数据结构，用于表示代码的语法结构，但它们有着不同的特点和用途。

**`CST`**(`Concrete Syntax Tree`)具体语法树。   
1.定义：  
+ `CST`反映了代码的确切语法结构，通常直接对于代码的原始文本。它保留了代码中的所有细节，包括各种符号、标点符号、空格和注释等。因此，`CST`是一种精确的语法树。   
2.特点：  
+ 细节丰富：`CST`保留了每个语法单元的具体位置和原始形式，不会进行抽象和简化。  
+ 一对一映射：每个源代码片段都有直接的对应节点，不会损失信息。   
+ 操作复杂：由于保留了大量细节，`CST`可能较为庞大，且操作复杂度较高。   
3.用途：   
+ `CST`主要用于处理那些需要直接操作源代码文本并保留所有细节的场景，比如语法高亮、代码格式化、语法检查等。   

**`AST`**(Abstract Syntax Tree) 抽象语法树  
1.定义：
+ `AST`是对代码语法结构的抽象表示，通常会去除不影响程序语义的细节。它更关注代码的结构和含义，而不是具体的文本格式。  
  
2.特点：  
+ **抽象化**：`AST`会将代码结构转换为更高层次的抽象，以便于进一步分析和处理。   
+ **简化结构**：`AST`移除了不影响代码含义的细节，如括号、空格、注释等，将代码表示为更为简洁的树形结构。  
+ **语义导向**：`AST`更侧重于捕捉代码的语义结构，使得它更适合于编译、优化、静态分析等任务。  
 
3.用途：
+ `AST`是编译器和解析器中常用的数据结构，用于执行诸如代码优化、类型检查、语义分析等高级操作。   
   
### 总结  
+ `CST`和`AST`都是用于表示程序代码结构的树形数据结构，但它们的主要区别在于抽象级别和信息保存的详细程度。   
+ `CST`是源代码的直接反映，保留了所有细节，适合于需要处理精确文本的任务。   
+ `AST`是对代码结构的抽象表示，去除了不影响代码含义的细节，更适合于语义分析和高级编译器任务。   

在实际应用中，编译器和相关工具通常会从`CST`开始，然后将其转换为`AST`,以便进行后续的语义分析和优化处理。   



