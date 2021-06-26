class Observer {
    constructor(val) {
        this.value = val
        if(!Array.isArray(this.value)) {
            this.walk()
        }
    }

    walk() {

    }
}