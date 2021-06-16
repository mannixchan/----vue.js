const { Dep } = require("../复习/添加watcher后的练习/Dep")

// 把对象中所有的属性（包括）子属性都侦察到
class Observer {
  constructor(value) {
    this.value = value
    // 判断 value 是对象还是数组
    if (!Array.isArray(value)) {
      this.walk(value)
    }
  }
  walk(obj){
    const keys = Object.keys(obj)
    for(let i = 0; i < keys.length; i++) {
      defineReactive(obj, keys[i], obj[keys[i]])
    }
  }

}
function defineReactive (data, key, val) {
  // 包括 数组和对象
  if(typeof val === 'object') {
    new Observer(val)
  }
  let dep = new Dep()
  Object.defineProperty(data, key, {
    enumerable: true,
    writable: true,
    get() {
      dep.depend()
      return val
    },
    set(newVal) {
      if(val === newVal) {
        return
      }
      val = newVal
      dep.notify()
    }
  })
}