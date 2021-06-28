let {Dep} = require('./dep.js')

function defineReactive(data, key, val) {
    // new Observer(val)
    // type 为 Object 才会再次调用 Observer
    if(typeof val === 'object') { // typeof 可以模糊判断 数组, 对象, 所以传给 Observer 的不是对象就是数组
        new Observer(val) // 这边递归了, 如果 val 是对象
    }
    let dep = new Dep()
    Object.defineProperty(data,key,{
        enumerable: true,
        configurable: true,
        get() {
            if(window.target) {
                dep.depend()
            }
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

class Observer {
    constructor(val) {
        this.value = val
        if(!Array.isArray(this.value)) { // 判断传过来的是对象, 就执行 walk
            this.walk(this.value)
        }
    }

    walk(obj) {
        // for(const key in obj) { // 这样会操作到原型属性
        //     let sub = obj[key]
        //     defineReactive(obj, key, sub)
        // }
        const keys = Object.keys(obj) // 枚举, 所有可以枚举的值且自己拥有的值 --- 实例属性, 不包括原型属性
        for(let i = 0 , l = keys.length; i < l; i++) {
            defineReactive(obj, keys[i], obj[keys[i]])
        }
    }
}