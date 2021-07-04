class Dep {
    constructor() {
        this.subs = []
    }
    addSub(sub) {
        this.subs.push()
    }
    removeSub(sub) {
        const index = this.subs.indexOf(sub) 
        if(index > -1) {
            this.subs.splice(index, 1)
        }
    }
    depend() {
        if(window.target) {
            this.addSub(window.target)
        }
    }
    notify() {
        
        for(let i = 0 , l = this.subs.length; i < l; i++) {
            this.subs[i].update()
        }
    }
}