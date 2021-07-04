function defineReactive(data,key,val){
    let subs = new Dep()
    Object.defineProperty(data, key, {
        enumerable: true,
        configurable: true,
        get() {
            subs.depend()
            return val
        },
        set(newVal) {
            if(newVal === val) {
                return 
            }
            val = newVal
            subs.notify()
        }
    })
}
class Observer {
    constructor(value) {
        this.value = value

    }
}
function observer(val) {

}