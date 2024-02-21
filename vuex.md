[TOC]



#### 1 vuex的原理

专为vue开发的全局状态管理机制，可以方便实现组件之间的数据共享；单一数据源，核心就是store（仓库），易于开发和维护；数据是响应式的。

- state：单一状态树，每个应用仅包含一个store实例，一般不可以直接修改里面的数据。
- mutations：用来定义修改store中数据的同步方法，第一个参数是state
- action：类似mutation，可以包含异步操作，它的参数是一个与store具有相同方法和属性的context对象。通过commit提交一个mutation，可以通过dispath调用其它action，可以通过context.state、context.getters获取实例数据。
- getters：类似组件中的计算属性，用来对一些数据进行过滤。也有缓存性。
- modules：在项目比较复杂时，可以进行模块划分，每个模板拥有自己的state、mutation、action、getters，方便维护



#### 2 action与mutation的区别

mutation：必为同步函数，专注于修改state中的数据，通过commit来提交要操作的内容，它接受state为第一个参数

action：类似mutation，可包含异步操作，它提交的是mutation，不能直接操作state，它接受一个与store实例具有相同方法和属性的context对象，可以通过commit提交一个mutation，可以通过dispath调用其它action，可以通过context.state、context.getters获取实例数据。



#### 3 vuex与localStorage的区别

vuex：存储在内存中，用于全局共享状态数据、跨组件传值，响应式，页面刷新时数据会丢失

localStorage：存储在浏览器本地，字符串形式永久存储，一般是跨页面传递数据，数据不能响应式，页面刷新数据不丢失



#### 4 vuex的严格模式

在严格模式下，只能由mutation函数改变state中数据，否则将报错，来保证所有的状态变更都能被调试工具跟踪到。

```js
const store = new Vuex.Store({
    strict:true,
})
```

