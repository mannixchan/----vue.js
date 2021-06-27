// 判断浏览器是否支持 __proto__
const hasProto = '__proto__' in {} // in, 只要能访问到, 无论是否原型, 是否可枚举都可以访问到
const arrayKeys = Object.getOwnPropertyNames(arrayMethods) // 可以访问实例上的所有属性, 包括不可枚举的
class Observer { // 需要将一个数据转换成响应式, 就需要通过Observer
    constructor(val) {
        this.value = val
        // 之所以在 Observer保存依赖, 是因为 getter(收集) 和 拦截器都可以访问到(通知)
        this.dep = new Dep()
        def(val, '__ob__', this) // 每次, 响应化一个值的时候, 都会将自己的实例挂到值得 __ob__ 这个属性上
        if(Array.isArray(this.value)) { // 判断传过来的是对象, 就执行 walk
            const augment = hasProto ? protoAugment : copyAugment
            augment( val,arrayMethods, arrayKeys)
        } else {
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
// 浏览器适配
function protoAugment(val, arrayMethods, arrayKeys) { 
    val.__proto__ = arrayMethods // 只针对需要监听的值, 将劫持原型赋值给__proto__
}
function copyAugment(val, arrayMethods, arrayKeys) {
    // 没有 __proto__ 那么就直接把这些属性挂载到 val => 数组上去
    for(let i = 0, l = arrayKeys.length; i < l; i++) {
        Object.defineProperty(val, arrayKeys[i], {
            
        })
    }
}
function def (obj, key, val, enumerable) {
    Object.defineProperty(obj, key, {
        value: val,
        enumerable: !!enumerable, // 默认不可枚举
        writable: true,
        configurable: true
    })
}
function observer(value, asRootData) {
    // 非 'object' 则return typeOf obj === 'object'
    if(!isObject(value)) {
        return 
    }
    let ob
    if(hasOwn(value, '__ob__') && value.__ob__ instanceof Observer) {
        ob = value.__ob__
    } else {
        ob = new Observer(value)
    }
    return ob
}
module.exports = {
    observer
}