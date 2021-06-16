const {Dep} = require('./Dep.js')
const {Watcher} = require('./Watcher.js')
function defineReactive(data, key, val) {
    let dep = new Dep()
    Object.defineProperty(data, key, {
        configurable: true,
        enumerable: true,
        get() {
            dep.depend(data) // 这一步之后， watcher， 将自己加入到subs中
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
let data = {
    a: {
        b: {
        }
    }
}
defineReactive(data.a.b, 'c', 'mingming')
let watcher = new Watcher(data.a.b, null, function(newVal, val) {
    console.log(newVal, val)
})
// console.log(data.a.b.c)
data.a.b.c = 'jojo'
console.log(watcher)
