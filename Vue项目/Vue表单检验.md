```javascript
:rules="[ 
        { 
        required: true, message: '请填写姓名' }, 
        { 
            validator: (value) => /^[a-zA-Z\d\u4e00-\u9fa5\s]+$/g.test(value), message: '请输入正确的姓名' 
        } 
    ] 
```  
定义了两个校验规则：   
    1.必填项校验  
    2.自定义校验器

Vue 会依次执行这些规则：  
+ 首先检查是否为空，如果为空则显示 '请填写姓名' 的提示。   
+ 如果不为空，则使用正则表达式进一步校验输入内容，如果不匹配则显示 '请输入正确的姓名' 的提示。   
