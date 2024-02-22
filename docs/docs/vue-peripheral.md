---
outline: deep
---



# Vue 生态

## vue-router



### 路由导航解析流程

1. 导航被触发。
2. 在失活的组件里调用：beforeRouteLeave，可取消离开
3. 调用全局前置守卫： beforeEach，可用于登录验证，全局loading等
4. 在重用的组件里调用：beforeRouteUpdate
5. 在路由配置里调用，路由独享守卫：beforeEnter
6. 解析异步路由组件。
7. 在被激活的组件里调用：beforeRouteEnter
8. 调用全局解析守卫：beforeResolve
9. 导航被确认
10. 调用全局后置钩子：afterEach
11. 触发dom更新，组件的生命周期：beforeCreate、created、beforeMount、deactivated、mounted、activated
12. 调用beforeRouteEnter 守卫中传给 next 的回调函数，创建好的组件实例会作为回调函数的参数传入

<br/>

### vue-router两种模式实现原理

都是利用浏览器自身的属性，基于h5的api，通过调用浏览器提供的接口来实现前端路由。

vue-router通过mixin全局混入在beforeCreate钩子中将router加入vue实例中，监听当前路由的变化来匹配不同的路由规则，加载对应的组件。

1、**hash模式：**

原理：hash是指url中#及之后的字符串，当url中的hash值改变时，触发`onhashchange`事件，路由系统监听此事件来实现。

vue-router的默认模式，用url的hash来模拟完整的url，hash值不会被包含在请求中，只用来指导浏览器动态，不会向后端发送请求。只有hash改变才会被添加到浏览器记录栈。hash原本用来做页面定位，可以兼容到IE8。

2、**history模式：**

原理：使用h5的`pushState()`和`replaceState()`方法，对浏览器记录栈进行修改，并监听`popState`事件（前进后退）来触发状态变更。

history模式下，前端url必须和实际向后端发起请求的url一致，否则会返回404，所以服务端需要配置一个缺省页面，比如index.html，当任何静态资源都不匹配时，返回这个页面。可以兼容到IE10。

<br/>

### vue-router跳转和location.href的区别

`location.href`使用简单方便，但会刷新页面

`history.pushState()`，静态跳转，不刷新页面

`router.push()`：与`history.pushState()`行为相同，使用的diff算法，实现了按需加载，减少了dom消耗

<br/>

### 路由守卫

当需要通过路由来进行一些操作，比如登录权限验证、页面进度条、页面loading、控制页面滚动条。

植入方式：全局、单个路由独享、组件级

1、**全局路由钩子**

beforeEach：全局前置守卫，进入路由之前

beforeResolve：全局解析守卫，在beforeRouteEnter之后调用

afterEach：全局后置钩子，进入路由之后

2、**单个路由独享**

beforeEnter：为某个路由单独配置守卫，参数：to、from、next

3、**组件内钩子**

beforeRouteEnter：进入组件前触发，这时不能访问this

beforeRouteUpdate：当前地址改变且组件被复用时触发，比如：带有动态参数的路径foo/1和foo/2之间跳转时

beforeRouteLeave：离开组件时被调用

<br/>

### 路由跳转方式

声明式，router-link标签

```html
<router-link :to="{name:'home'}"></router-link>
<router-link :to="{path:'/home'}"></router-link>
```

编程式

```js 
this.$router.push('/home')
this.$router.push({name:'home'})
this.$router.push({path:'/home'})
```

<br/>

### $route和$router的区别

$route是**路由信息对象**，它包括path、params、hash、query、fullPath、matched、name等路由信息参数，

$router是**路由实例对象**，它包括了路由的跳转方法，钩子函数等

<br/>

### params和query的区别

query：要用path来引入，类似get请求传参，在地址栏中可以显示参数，刷新不会丢失参数

params：使用路由的name来引入，类似post请求传参，参数不在地址中显示，刷新会丢失参数

<br/>

### 路由懒加载

1. vue-router官方写法，接收一个返回promise组件的函数：`const List=()=>import('@/components/list.vue')`或`const UserDetails = () => import(/* webpackChunkName: "group-user" */ './UserDetails.vue')`
2. vue异步组件技术：`component: resolve => require(['@/components/list'], resolve)`
3. webpack的`require.ensure()`，旧版本中使用。



## Vuex

### vuex的原理

专为vue开发的全局状态管理机制，可以方便实现组件之间的数据共享；单一数据源，核心就是store（仓库），易于开发和维护；数据是响应式的。

- state：单一状态树，每个应用仅包含一个store实例，一般不可以直接修改里面的数据。
- mutations：用来定义修改store中数据的同步方法，第一个参数是state
- action：类似mutation，可以包含异步操作，它的参数是一个与store具有相同方法和属性的context对象。通过commit提交一个mutation，可以通过dispath调用其它action，可以通过context.state、context.getters获取实例数据。
- getters：类似组件中的计算属性，用来对一些数据进行过滤。也有缓存性。
- modules：在项目比较复杂时，可以进行模块划分，每个模板拥有自己的state、mutation、action、getters，方便维护



### action与mutation的区别

mutation：必为同步函数，专注于修改state中的数据，通过commit来提交要操作的内容，它接受state为第一个参数

action：类似mutation，可包含异步操作，它提交的是mutation，不能直接操作state，它接受一个与store实例具有相同方法和属性的context对象，可以通过commit提交一个mutation，可以通过dispath调用其它action，可以通过context.state、context.getters获取实例数据。



### vuex与localStorage的区别

vuex：存储在内存中，用于全局共享状态数据、跨组件传值，响应式，页面刷新时数据会丢失

localStorage：存储在浏览器本地，字符串形式永久存储，一般是跨页面传递数据，数据不能响应式，页面刷新数据不丢失



### vuex的严格模式

在严格模式下，只能由mutation函数改变state中数据，否则将报错，来保证所有的状态变更都能被调试工具跟踪到。

```js
const store = new Vuex.Store({
    strict:true,
})
```



## Pinia

