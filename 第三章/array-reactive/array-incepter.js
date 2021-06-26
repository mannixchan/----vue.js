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
            return original.apply(this, args)
        }
    })
})
module.exports = {
    arrayMethods
}