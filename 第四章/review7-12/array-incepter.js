// 数组会改变自身的几个方法: push, splice, pop, unshift(在前面添加), shift(在前面删除), sort, reverse
let arrayPrototype = Array.prototype
const arrayMethods = Object.create(ArrayPrototype)  // 原型式继承
const 
;[
    'push', 'pop', 'unshift', 'shift', 'splice', 'sort', 'reverse'
]
.forEach(function(method) {
    const original = arrayPrototype[method]
    Object.defineProperty(arrayMethods, method, {
        enumerable: false,
        configurable: true,
        writable: true,
        value: function mutator(...args) {

            const result = original.apply(this, args)
            const ob = this.__ob__
            let inserted
            switch (method) {
                case 'push':
                case 'unshift':
                    inserted = args
                    break
                case 'splice':
                    inserted = args.slice(2)
                    break
            }
            if(inserted) {
                ob.observerArray(inserted)
            }
            ob.dep.notify()
            return result
        }
    })
})
module.exports = {
    arrayMethods
}