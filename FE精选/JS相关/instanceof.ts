
/* 自定义instanceof */
export function myInstanceof(instance: any, origin: any): boolean {
    if (instance == null) return false; //null undefined  
    /* 所有值类型执行instanceof返回的都是false */
    /* 'aa' instanceof String  //false */
    if (typeof instance !== 'object' || typeof instance !== 'function') {
        // 值类型  
        return false;
    }
    let tempInstance = instance; // 为了防止修改instance   
    while (tempInstance) {
        if (tempInstance.__proto__ === origin.prototype) {
            return true; //配上了  
        }
        // 未匹配  
        tempInstance = tempInstance.__proto__;//顺着原型链，往上找
    }
    return false;
}
//  功能测试  
let result = myInstanceof({},Object);
console.info(result);