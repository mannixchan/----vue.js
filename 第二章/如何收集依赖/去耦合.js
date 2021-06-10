class Dep { // 定义的这个类， 就是用来存放依赖的地方， 存放， 增删依赖， 并且负责通知‘组件’更新数据。。。 依赖管家
    constructor() {
        this.subs = [] // 用来存依赖
    }
    addSub(sub) {
        this.subs.push(sub)
    }
    removeSub(sub) {
        remove(this.subs, sub)
    }
    depend() {
        if(window.target) {
            this.addSub(window.target)
        }
    }
    notify() {
        const subs = this.subs.slice() // 没有任何参数的slice执行一个简单的浅拷贝。
        for (let i = 0; i < subs.length; i++) {
            subs[i].update()
        }
    }
}
function remove(arr, item) {
    if(arr.length) {
        const index = arr.indexOf(item) // 判断arr是否有item， 没有就是 -1, 有就会返回真实位置
        if(index > -1) {
            arr.splice(index, 1) // 传两个参数的时候， 从指定位置开始， 删除几个
        }
    }
}

function defineReactive (data, key, val) {
    let dep = new Dep()
    Object.defineProperty(data, key, {
        enumerable: true,
        configurable: true,
        get: function() {
            dep.depend() // 可以理解当前组件引用了该 key， 所以这个组件的 window.target 被加入依赖
            return val
        }
        ,
        set: function(newVal) {
            if(val === newVal) {
                return
            }
            val = newVal
            dep.notify() // 在 val 被更新后， 通知组件进行更新
        } 
    })
}