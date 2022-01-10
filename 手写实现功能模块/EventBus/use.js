const eventBus = require('./eventBus')
const emitter = eventBus()

// 注册change事件
emitter.$on('change', (...payload) => {
  console.log('change', ...payload)
})

// 调用所有事件都会执行这个方法
emitter.$on('*', (...payload) => {
  console.log('all', ...payload)
})

//触发change事件
emitter.$emit('change', '参数1', '参数2')
