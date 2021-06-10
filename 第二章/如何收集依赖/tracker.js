
function defineReactive (data, key, val) {
    let dep = [] // 这个数组用来引用了这个 key 的依赖
    Object.defineProperty(data, key, {
        enumerable: true,
        configurable: true,
        get: function() {
            dep.push(window.target) // 假定， 这个 target 就是那个依赖， 并且是一个函数
            return val
        },
        set: function(newVal) {
            if(val === newVal) {
                return
            }
            for(var i = 0; i < dep.length; i++) {
                dep[i](newVal, val)
            }
            val = newVal
        }
    })
}