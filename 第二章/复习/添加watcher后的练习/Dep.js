class Dep {
    constructor() {
        this.subs = []
    }
    addSub(sub) {
        this.subs.push(sub)
    }
    removeSub(sub) {
        remove(this.subs, sub)
    }
    depend(watcher) {
        console.log('我访问了depend')
        if(watcher.target) {
            this.addSub(watcher.target)
        }
    }
    notify() {
        console.log('我触发了notify')
        let subs = this.subs.slice()
        for(let i = 0; i < this.subs.length; i++) {
            subs[i].update()
        }
    }
}
module.exports = {
    Dep
}