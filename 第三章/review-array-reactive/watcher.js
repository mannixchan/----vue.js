class Watcher {
    constructor (vm, expression, cb) {
        this.vm = vm
        // 执行getter 可以访问到, 要访问属性的值
        this.getter = parseExe(expression)
        this.cb = cb
        this.value = this.get() // value 通过 get 访问到原属性, 出发了, 响应变化的 get 函数, 此时 get 函数, 根据 window.target, 将 watcher 实例, 自动添加进去
    }
    get() {
        window.target = this
        let value = this.getter.call(this.vm, this.vm)
        this.getter()
        window.target = null
        return value
    }
    update() {
        let oldValue = this.value
        this.value = this.get()
        this.cb.call(this.vm, this.value, this.oldValue)
    }
}
module.exports = {
    Watcher
}