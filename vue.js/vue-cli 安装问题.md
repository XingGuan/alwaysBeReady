### 通过`vue create 'projectName'`命令创建项目错误
`D:\gxProject\vue-x\node_modules\fibers>if not defined npm_config_node_gyp (node "C:\Program Files\nodejs\node_modules\npm\node_modules\npm-lifecycle\node-gyp-bin\\..\..\node_modules\node-gyp\bin\node-gyp.js" rebuild --release )  else (node "C:\Program Files\nodejs\node_modules\npm\node_modules\node-gyp\bin\node-gyp.js" rebuild --release )
gyp ERR! find Python
gyp ERR! find Python Python is not set from command line or npm configuration`
### 解决方法  
>Windows + OS X instructions here: https://github.com/nodejs/node-gyp
Ubuntu users please run: `sudo apt-get install g++ build-essential`
RHEL users please run: `yum install gcc-c++` and `yum groupinstall 'Development Tools'`
Alpine users please run: `sudo apk add python make g++`  

[Windows下参考文档](https://github.com/nodejs/node-gyp)

+ 1. `npm install -g node-gyp`
+ 2. 安装相关系统环境  
2.1以管理员身份运行`npm install --global windows-build-tools`  
2.2查看python相关安装路径[windows-build-tools](https://github.com/felixrieseberg/windows-build-tools)Where is Python installed?`%USERPROFILE%\.windows-build-tools\python38`  
2.3配置Python依赖`npm config set python /path/to/executable/python`