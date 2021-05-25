```javascript
function Recursion(permissionList=[]){
	let list =[];
   permissionList.forEach((item)=>{
   	let obj ={};
  	if(!item.moduleList){
      obj.name  =  item.requestMapping
      obj.title = item.moduleGroupName?item.moduleGroupName:item.moduleName
  	}else{
  		obj.name  =  item.requestMapping
    	obj.title = item.moduleGroupName
      obj.children =Recursion(item.moduleList) ;
  	}
    	console.log('22222',list,'33333',obj)
      list.push(obj);
   })
  return list;
}
let arr = [{
  moduleGroupId: 1001,
  moduleGroupName: "仪表盘",
  requestMapping: "dash-board"
}, {
  moduleGroupId: 1100,
  moduleGroupName: "工作台",
  requestMapping: "work-bench",
  moduleList: [{
    moduleGroupId: 1100,
    moduleId: 1101,
    moduleName: "待办事项",
    requestMapping: "todo-list"
}],
}]
console.log('result',Recursion(arr))
```