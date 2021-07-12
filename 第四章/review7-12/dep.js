let uid = 0
class Dep {
    constructor(){
        this.subs = []
        this.id = uid++
    }
    addSub(sub) {
        this.subs.push(sub)
    }
    removeSub(sub) {
        //....
        remove(this.subs, sub)
    }
    depend() {
        if(window.target) {
            // this.addSub(window.target)
            window.target.addDep(this)
        }
    }
    notify() {
        const subs = this.subs.slice()
        for(let i = 0, l = subs.length; i < l; i++) {
            subs[i].update()
        }
    }
}
function remove(arr, sub) {
    if(arr.length) {
        let index = arr.indexOf(sub)
        if(index > -1) {
            return arr.splice(index, 1)
        }
    }

}
module.exports = {
    Dep
}