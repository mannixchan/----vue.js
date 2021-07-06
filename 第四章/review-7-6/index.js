        return val
    }
    // 看是否是响应式数据
    const ob = target.__ob__
    // 判断一下是否在 vm 组件或者
    if(target._isVue || (ob && ob.vmCount)) {
        env !== 'production' && warn('bala')
        return
    }
    // 如果不是, 直接赋值就可以, 不用考虑响应式
    if(!ob) {
        target[key] = val
        return val
    }
    defineReactive(ob.value, key, val)
    ob.dep.notify()
    return val
}


function del(target, key) {
    // 和上面一样, 先判断是不是数组
    if(Array.isArray(target) && isValidArrayIndex(key)){
        target.splice(key,1)
    }

    // 判断是否是实例, 或者根数据
    const ob = target.__ob__
    if(target._isVue || (ob && ob.vmCount)) {
        env !== 'production' && warn('balabala')
        return
    }
    // 如果不拥有属性, 直接推出, 不需要delte
    if(!hasOwn(target, key)) {
        return
    }
    // 判断是否是响应式
    delete target[key]
    // if(ob) {
    //     ob.dep.notify()
    // }
    // return
    if(!ob) {
        return
    }
    ob.dep.notify()
}