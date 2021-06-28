class Dep {
    constructor(){
        this.subs = []
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
            this.addSub(window.target)
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