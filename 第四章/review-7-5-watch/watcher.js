// watcher 是跟实例组件和getter相连接, 通过组件访问数据, 出发 getter , 将watcher的实例添加到对应数据的依赖里面去
class Watcher {
    constructor(vm, expOrFn, cb) {
        this.vm = vm
        this.depIds = new Set()
        this.deps = []
        if(typeof expOrFn === 'function') {
            this.getter = expOrFn
        } else {
            this.getter = parsePath(expOrFn)
        }
        this.cb = cb
        this.value = this.get()
    }
    get() {
        window.target = this
        let value = this.getter.call(this.vm, this.vm)
        window.target = undefined
        return value
    }
    addDep(dep) {
        const id = dep.id
        if(!this.depIds.has(id)) {
            dep.addSub(this)
            this.deps.push(dep)
            this.depIds.add(id)
        }
    }
    update() {
        let oldVal = this.value
        this.value = this.get()
        this.cb.call(this.vm, this.value, oldVal)
    }
    teardown() {
        const i = this.deps.length
        while(i--) {
            this.deps[i].removeSub(this)
        }
    }
}
Vue.prototype.$watch = function(expOrFn, cb, options) {
    const vm = this
    options = options || {}
    let watcher = new Watcher(vm, expOrFn, cb)
    if(options.immediate) {
        cb.call(vm, watcher.value)
    }
    return function unwatchFn() {
        watcher.teardown()
    }
}