class Watcher {
    constructor(vm, expOrFn, cb) {
        this.vm = vm
        this.getter = parse(vm)
        this.cb = cb
        this.value = this.get() // 这一步触发了下面get函数， 访问.c ， 触发了main.js中的get
    }
    get() {
        this.vm.target = this 
        let value = this.getter.call(this.vm, this.vm)
        this.vm.target  = undefined
        return value
    }
    update() {
        const oldVal = this.value
        this.value = this.get()
        this.cb.call(this.vm, this.value, oldVal)
    }
}
function parse(vm) {
    return function(vm) {
        return vm.c
    }
}
module.exports = {
    Watcher
}