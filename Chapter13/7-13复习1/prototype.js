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

Vue.prototype.$off = function(event, fn) {
  const vm = this
  //没传参数, 就清空所有的事件
  if(!arguments.length) {
    vm._events = Object.create(null)
    return vm
  }

  // event为数组就要一个个注销事件
  if(Array.isArray(event)) {
    for(let i = 0, l = event.length; i < l; i++) {
      vm.$off(event[i], fn)
    }
    return vm
  }
  // 不存在本事件 return
  let cbs = vm._events[event]
  if(!cb) {return vm}
  // 如果, 只传一个参数, 清空所有该事件
  if(arguments.length === 1) {
    vm._event[event] = null
    return vm
  }
  // 如果传了, fn, 则清空该fn
  if(fn) {
    let cb;
    let i = cbs.length
    while(i--) {
      if(cb === fn || cb.fn === fn) {
        cbs.splice(i, 1)
        break
      }
    }
    return vm

  }
}

Vue.prototype.$once = function(event, fn) {
  const vm = this
  function on() {
    vm.$off(event, on)
    fn.apply(vm, arguments)
  }
  on.fn = fn
  vm.$on(event, on)
  return vm
}

Vue.prototype.$emit = function(event) {
  const vm = this
  let cbs = vm._events[event]
  if(cbs) {
    let args = toArray(arguments, 1)
    for(let i = 0, l = cbs.length; i < l ; i++) {
      try {
        cbs[i].apply(vm, args)
      } catch(e) {
        hadleError(e, '....')
      }
    }
  }
  return vm
}
