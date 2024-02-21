[TOC]



#### 1 vue-router两种模式实现原理

都是利用浏览器自身的属性，基于h5的api，通过调用浏览器提供的接口来实现前端路由。

vue-router通过mixin全局混入在beforeCreate钩子中将router加入vue实例中，监听当前路由的变化来匹配不同的路由规则，加载对应的组件。

**hash模式：**

原理：hash是指url中#及之后的字符串，当url中的hash值改变时，触发`onhashchange`事件，路由系统监听此事件来实现。

vue-router的默认模式，用url的hash来模拟完整的url，hash值不会被包含在请求中，只用来指导浏览器动态，不会向后端发送请求。只有hash改变才会被添加到浏览器记录栈。hash原本用来做页面定位，可以兼容到IE8。

**history模式：**

原理：使用h5的`pushState()`和`replaceState()`方法，对浏览器记录栈进行修改，并监听`popState`事件（前进后退）来触发状态变更。

history模式下，前端url必须和实际向后端发起请求的url一致，否则会返回404，所以服务端需要配置一个缺省页面，比如index.html，当任何静态资源都不匹配时，返回这个页面。可以兼容到IE10。



#### 2 vue-router跳转和location.href的区别

`location.href`使用简单方便，但会刷新页面

`history.pushState()`，静态跳转，不刷新页面

`router.push()`：与`history.pushState()`行为相同，使用的diff算法，实现了按需加载，减少了dom消耗



#### 3 路由钩子/导航守卫

当需要通过路由来进行一些操作，比如登录权限验证、页面进度条、页面loading、控制页面滚动条。

植入方式：全局、单个路由独享、组件级

**全局路由钩子**

beforeEach：全局前置守卫，进入路由之前

beforeResolve：全局解析守卫，在beforeRouteEnter之后调用

afterEach：全局后置钩子，进入路由之后

**单个路由独享**

beforeEnter：为某个路由单独配置守卫，参数：to、from、next

**组件内钩子**

beforeRouteEnter：进入组件前触发，这时不能访问this

beforeRouteUpdate：当前地址改变且组件被复用时触发，比如：带有动态参数的路径foo/1和foo/2之间跳转时

beforeRouteLeave：离开组件时被调用



#### 4 路由导航解析流程

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



#### 5 路由懒加载

1. vue-router官方写法，接收一个返回promise组件的函数：`const List=()=>import('@/components/list.vue')`或`const UserDetails = () => import(/* webpackChunkName: "group-user" */ './UserDetails.vue')`
2. vue异步组件技术：`component: resolve => require(['@/components/list'], resolve)`
3. webpack的`require.ensure()`，旧版本中使用。



#### 6 $route和$router的区别

$route是**路由信息对象**，它包括path、params、hash、query、fullPath、matched、name等路由信息参数，

$router是**路由实例对象**，它包括了路由的跳转方法，钩子函数等



#### 7 路由跳转方式

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



#### 8 params和query的区别

query：要用path来引入，类似get请求传参，在地址栏中可以显示参数，刷新不会丢失参数

params：使用路由的name来引入，类似post请求传参，参数不在地址中显示，刷新会丢失参数

