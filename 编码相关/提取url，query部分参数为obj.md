```javascript
 function Urlparams(query){          
    // var query = window.location.search.substring(1);
    let obj={};
    var vars = query.split("?")[1];
    vars.split('&').map((item,index)=>{
        let arr=item.split('=');
        obj[arr[0]]=arr[1]
    })
    return obj;
}
console.log(Urlparams('http://www.kezaihui.com/?a=1&b=2&c=354'));
```