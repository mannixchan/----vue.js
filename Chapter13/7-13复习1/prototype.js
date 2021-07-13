vue.prototype.$on = function(event, fn) {
  const vm = this
  if(Array.isArray(event)) {
    for(let i = 0, l = event.length; i < l; i++) {
      // 如果传入的是数组, 则给数组中的每个事件注册事件
      this.$on(event[i], fn)
    }
  } else {
    // 每个event都有一个对应的函数列表, 触发事件, 依次调用
    (vm._event[event] || (vm._event[event] = [])).push(fn)
  }
  return vm
  // 注册自定义事件然后返回的是组件自身
}