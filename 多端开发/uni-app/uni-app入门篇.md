[uni-app官方文档地址](https://uniapp.dcloud.net.cn/quickstart.html)   

> `uni`,读`youni`,是统一的意思。   

### 开发模式模式配置(提高开发效率)
`pages.json`
```json
"condition": { //模式配置，仅开发期间生效
	"current": 0, //当前激活的模式（list 的索引项）
	"list": [{
			"name": "test", //模式名称
			"path": "pages/info", //启动页面，必选
			"query": "id=2" //启动参数，在页面的onLoad函数里面得到。
		}
	]
}
```  
当开发时一个页面路由嵌套比较深的时候，可以使用`condition`配置，可以配置多个模式，每个模式可以配置一个启动页面，启动参数，当切换模式时，会自动跳转到对应的页面，当修改页面内容时，也不必跳转到首页，再点回当前调试页面。




### 扩展
#### `cli`  
`CLI`创建项目是指使用命令行接口(`Command Line Interface`)来创建一个新的项目。
#### `B/S`
`B/S`模式,即`Browser/Server`模式(浏览器/服务器模式)，是一种网络应用程序的架构方式。
