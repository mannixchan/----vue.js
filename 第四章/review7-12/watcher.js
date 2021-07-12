class Watcher {
    constructor (vm, expression, cb, options) {
        this.vm = vm
        // 执行getter 可以访问到, 要访问属性的值
        this.getter = parseExe(expression)
        this.cb = cb
        this.deps = []
        this.depIds = new Set()
        if(options) {
            this.deep = !!options.deep
        } else {
            this.deep = false 
        }
        this.value = this.get() // value 通过 get 访问到原属性, 出发了, 响应变化的 get 函数, 此时 get 函数, 根据 window.target, 将 watcher 实例, 自动添加进去
    }
    get() {
        window.target = this
        let value = this.getter.call(this.vm, this.vm)
        // this.getter()
        if(this.deep) {
            traverse(value)
        }
        window.target = undefined
        return value
    }
    update() {
        let oldValue = this.value
        this.value = this.get()
        this.cb.call(this.vm, this.value, oldValue)
    }
    addDep(dep) {
        const id = dep.id
        if(!this.depIds.has(id)) {
            this.deps.push(dep)
            this.depIds.add(id)
            dep.addSub(this)
        }
    }
    teardown() {
        const deps = this.deps.slice(0)
        for(let i = 0, l = deps.length; i < l; i++) {
            deps[i].remove(this)
        }
    }
}
const seenObject = new Set()
function traverse(val) {
    _traverse(val, seenObject)
    seenObject.clear()
}
function _traverse(val,seen) {
    let i, keys
    // 如果不是对象就 return
    if((!isA(val) && !isObject(val)) || Object.isFrozen(val)) {
        return
    }
    
    if(val.__ob__) {
        const depId = val.__ob__.dep.id
        if(seen.has(depId)) {
            return
        }
        seen.add(id)
    }
    if(isA(val)) {
        const i = val.length
        while(i--) {
            _traverse(val[i], seen)
        }
    } else {
        const keys = Object.keys(val)
        const i = keys.length
        while(i--){
            _traverse(val[keys[i]], seen)
        }
    }
}
module.exports = {
    Watcher
}