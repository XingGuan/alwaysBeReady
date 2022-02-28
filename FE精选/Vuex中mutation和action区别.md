## Vuex中mutation和action  
+ `mutation` 是原子操作， 必须同步代码  
所谓原子操作是指不会被线程调度机制打断的操作；这种操作一旦开始，就一直运行到结束，中间不会有任何 `context switch` （切换到另一个线程）。
> JS本质是单线程的
+ `action` 可包含多个`mutation` 可包含异步代码;  

