
function defineReactive (data, key, val) {
    Object.defineProperty(data, key, {
        // 如果不设置， 下面这俩值， 都默认为 false
        enumerable: true,
        configurable: true,
        get: function() {
            return val
        },
        set: function(newVal) {
            if(val === newVal) {
                return
            }
            val = newVal
        }
    })
}