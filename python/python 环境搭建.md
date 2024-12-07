<!-- python 环境搭建 -->
[python官网地址](https://www.python.org/)    
找到对应版本安装包直接下载安装即可

### 当一台电脑中，不同的项目需要不同的python版本。
> 安装`virtualenv`进行`python`版本管理  
+ [`virtualenv`安装使用教程](https://blog.csdn.net/weixin_50503886/article/details/136693980)

+ [`windows`下安装`python`步骤](https://blog.csdn.net/qq_36558410/article/details/80450275)

> `virtualenv`使用指定版本创建虚拟环境`virtualenv -p /usr/bin/python3.8 <环境名称>` 这里`/usr/bin/python3.8`要写到安装具体`python`版本的`exe`路径(点 -p到 python 可执行文件，而不是目录)否则会收到报错`RuntimeError: failed to query`   

+ [解决pip安装出现`Could not find a version that satisfies the requirement XXX (from versions: none)` 问题](https://blog.csdn.net/2301_79093491/article/details/133744110)  

> `pip install` 失败时 可以使用国内镜像源` pip install packageName -i https://pypi.tuna.tsinghua.edu.cn/simple --trusted-host pypi.tuna.tsinghua.edu.cn`  

> `virtualenv -p /usr/bin/python3.8 <环境名称>` 创建虚拟环境失败时要考虑 `virtualenv` 版本与当前`python`版本是否兼容   

[通过`virtualenv`中安装不同版本的`Python`](https://blog.csdn.net/geerniya/article/details/78761704)

### `python`卸载方法  
[`python`卸载方法](https://blog.csdn.net/qq_36143691/article/details/129484154)
