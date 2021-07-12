const { defineReactive } = require("./define-reactive")

Vue.prototype.$watch = function(expOrFn, cb, options) {
    const vm = this
    options = options || {}
    const watcher = new Watcher(vm, expOrFn, cb, options)
    if(options && options.immediate) {
        cb.call(vm, watcher.value)
    }
    return function unwatchFn() {
        watcher.teardown()
    }
}

Vue.prototype.$set = function(target, key, val) {
    if(Array.isArray(val) && isValidArrayIndex(key)) {
        const index = target.length
        index = Math.max(index, key)
        val.splice(index, 1, val)

    }
    if(key in target && !(key in Object.prototype)) {
        target[key]=val
        return val
    }
    let ob = target.__ob__
    // 不能是vue实例和根数据对象
    if(!ob) {
        target[key] = val
        return val
    }
    defineReactive(ob.value, key, val)
    ob.dep.notify()
    return val
}
Vue.prototype.$delete = function(target, key){
    if(Array.isArray(target) && isValidArrayIndex(key) ){
        target.splice(key, 1)
        return
    }
    if(!hasOwn(target, key)) {
        return
    }
    let ob = target.__ob__
    // 判断是否 vue 实例, 跟数据
    delete traget[key]
    if(!ob) {
        return // 不是响应式的不需要更新视图..
    }
    ob.dep.notify()
    

}