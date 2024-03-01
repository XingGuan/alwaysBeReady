#### `vue history`路由服务端配置   
在Nginx中，`root`和`alias`都用于指定服务器上的文件系统路径，但它们在处理URI时有一些重要的区别。

1. `root`指令：
   - 当使用`root`指令时，Nginx会将请求的URI与`root`指定的路径拼接起来，然后在文件系统中寻找对应的文件或目录。例如，如果`root /var/www;`，并且收到了对`http://example.com/test/index.html`的请求，Nginx会尝试在`/var/www/test/index.html`中寻找对应的文件。
   - `root`指令通常与`index`指令一起使用，用于指定默认的索引文件。

2. `alias`指令：
   - 当使用`alias`指令时，Nginx会将请求的URI与`alias`指定的路径进行替换，然后在文件系统中寻找对应的文件或目录。例如，如果`alias /var/www/;`，并且收到了对`http://example.com/test/index.html`的请求，Nginx会尝试在`/var/www/index.html`中寻找对应的文件。
   - `alias`指令通常用于创建更复杂的URI到文件系统路径的映射，允许在URI和实际文件系统路径之间进行更灵活的转换。

总的来说，`root`用于将请求的URI与指定路径拼接，而`alias`用于替换URI中的部分路径。根据具体的需求和URL结构，您可以选择使用`root`或`alias`来正确地映射请求的URI到文件系统中的路径。
