// watcher 是一个类， 他负责收集模版或者用户自己写的 watch 中的依赖
// 最后 dep 收集是每个组件的 watcher （一个实例）， dep 通知 watcher ， watcher 再通知到里面的具体依赖
export default class Watcher {
    constructor (vm, expOrFn, cb) {
        this.vm = vm
        // getter 的目的是， 通过执行 getter 读取 data.a.b.c 的内容
        this.getter = parsePath(expOrFn)
        this.cb = cb
        this.value = this.get()
    }
    get() {
        window.target = this
        // 执行下面的代码， 可以访问到 data.a.b.c， 触发data.a.b.c 中的 depend 函数， 此时， 收集到的 winddow.target 是有值的， 是 watcher 实例自己
        // value 是获取到的 data.a.b.c 的值
        let value = this.getter.call(this.vm, this.vm)
        window.target = undefined
        return value
    }
    // 在设置 data.a.b.c 时候， 会在 defineProperty中， 触发该 update 事件
    update() {
        const oldValue = this.value
        this.value = this.get()
        this.cb.call(this.vm, this.value, oldValue)
    } 
}