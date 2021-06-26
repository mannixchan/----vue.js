# Track Array 

> Review 

If I want to track the change of the Object

I need these things

1. setter, getter => 用 es5 的defineProperty 来做, 也是此功能的核心

2. Dep => 楼上的代码中, 把添加依赖, 通知依赖, 都由 Dep 来做

3. Watcher => 楼上说了这么多, 那究竟什么是依赖呢, 依赖就是一个中介, Dep 收集 Watcher, 再由 Watcher 通知页面具体的引用的地方
   1. `重点`: Watcher 是怎么把自己添加到 Dep 中的呢?
4. Observer =>  不参与到具体的响应式检测过程, 但是会观察每一个改变的值, 以确保侦测到每一个子属性