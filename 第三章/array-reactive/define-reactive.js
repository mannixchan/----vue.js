let {Dep} = require('./dep.js')
let {arrayMethods} = require('./array-incepter.js')
const {observer}  = require('./observer.js')


function defineReactive(data, key, val) {
    // new Observer(val)
    // type 为 Object 才会再次调用 Observer
    const childOb = observer(val)
    let dep = new Dep()
    Object.defineProperty(data,key,{
        enumerable: true,
        configurable: true,
        get() {
            dep.depend()// 这个依赖是针对对象的
            if(childOb) {
                childOb.dep.depend() // 针对数组
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


