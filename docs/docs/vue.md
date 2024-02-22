---
outline: deep
---



# Vue

### vue中使用了哪些设计模式

- 单例模式：new多次，只有一个实例
- 工厂模式：传入参数，就可以创建实例
- 发布订阅模式：中央事件总线
- 观察者模式：watch和dep
- 代理模式：data属性、proxy
- 中介者模式：vuex



### 响应式原理/双向绑定原理

采用**数据劫持**结合**发布-订阅者模式**的方式，通过 Object.defineProperty 劫持各个属性的 getter/setter，在数据变化时发布消息给订阅者，触发相应的监听回调。

主要构成模块包括：

- Observer类：对数据对象进行递归遍历，给属性添加 getter、setter，实现数据劫持
- Compile： 模板指令解析器，编译指令及模板语法，将模板中的变量替换成数据，然后初始化渲染页面视图，并将每个指令对应的节点绑定更新函数，添加监听数据的订阅者，一旦数据变化，收到通知，更新视图
- Watcher：订阅者，属性变化时收到消息并执行update回调。是 Observer 和 Compile 通信的桥梁，主要做的事情：1）在自身实例化时往属性订阅器（dep）里添加自己 2）自身必须有一个 update 方法；3）待属性变动 dep.notice()通知时，调用自身的 update()方法，并触发 Compile 中绑定的回调
- MVVM 作为数据绑定的入口，整合 Observer、Compile 和 Watcher 三者，通过 Observer 来监听自己的 model 数据变化，通过 Compile 来解析编译模板指令，最终利用 Watcher 搭起 Observer 和 Compile 之间的通信桥梁，达到数据变化 -> 视图更新；视图交互变化(input) -> 数据 model 变更的双向绑定效果。

通过Observer来监听model数据变化，通过compile解析编译模板指令，最终利用watcher完成observer和compile之间的通信，达到双向绑定/响应式的效果。

实现步骤主要有：

1. Observe对属性进行递归遍历，通过`Object.defineProperty()`方法给属性添加get、set访问器属性，使其变成响应式，在数据读取或修改时就会触发这两个方法。
2. 指令解析器会解析模板指令，并将模板中的变量替换成具体的数据，并给对应的节点添加watcher实例.
3. 在获取数据的过程中，触发get方法，依赖收集器会记录这些订阅者。
4. 当给数据重新赋值时，触发set方法，依赖收集器通知已经记录的订阅者，订阅者调用自身的update方法，触发compile中绑定的回调，更新视图。



### Object.defineProperty()和Proxy

`Object.defineProperty`通过对属性设置getter和setter实现监听，所以（1）需要遍历+递归为每个属性，如果层次比较深，性能消耗很大；（2）只能对预定义过的属性作出响应。（3）对象内部的变化，如对象增删属性、数组变化等无法被监听，vue内部通过重写相关方法的方式解决这个问题。

`Proxy`通过代理整个对象来进行监听，相当于在对象之前设置了一层“拦截”，任何对该对象的访问都可以过滤和改写。



### vue2生命周期

调用new Vue()，实例化vue对象，然后初始化事件和生命周期，接下来开始组件生命周期：

1. beforeCreate：初始化阶段。此时vue组件对象被创建，但对象属性还未绑定，此时不能访问data、methods、conputed、watch等属性，一般用来初始化非响应式变量
2. init injections&reactivity：挂载数据，属性赋值，包括属性和computed运算
3. created：实例已经初始化，可以访问data、methods、conputed、watch等属性，但还没挂载到dom，不能访问$ref、$el等，一般用于简单的axios请求，页面的初始化
4. 判断el属性、template属性：
   1. 如果没有el属性，就停止编译，生命周期停止，等待手动调用vm.$mount()完成全局变量$el的绑定
   2. 如果有el属性，再判断是否有template模板：
      1. 有则将其作为模板编译成render函数，如果没有则将外部html作为模板编译，因此，template中的模板优先级高于outer HTML
      2. 如果有render函数，则会替换template
5. beforeMount：挂载到dom之前，找到对应的template，并编译成render函数，此时this.$el上有值，但数据还没挂载到页面上，此时`{{}}`还没有被替换掉
6. mounted：vue实例已经挂载到dom上，此时可以通过DOM API获取到dom节点，$ref属性可以访问
7. beforeUpdate：响应式数据更新后，触发模板更新时，会调用watcher的render函数。
8. updated：dom更新之后，可执行依赖于dom的操作
9. beforeDestroy：实例销毁之前，这时this仍然可用
10. destroyed：实例销毁后调用，清空watcher、事件、删除dom、删除子实例等

下面两个钩子与keep-alive有关：

activated：被包裹的组件在显示时触发

deactivated：被包裹的组件在失活时触发

其他：

errorCaptured：2.5+，在捕获一个来自后代组件的错误时触发，三个参数：错误对象、出错的组件实例、包含错误来源信息的字符串，此钩子可以返回false以阻止错误继续向上传播。

errorHandler：一个全局配置，用来捕获全局异常状态，参数同上



### 生命周期顺序

**父子组件情况**

加载时：父beforeCreate -> 父created -> 父beforeMount -> 子beforeCreate -> 子created -> 子beforeMount -> 子mounted -> 父mounted

子组件更新：父beforeUpdate->子beforeUpdate->子updated->父updated

父组件更新：父beforeUpdate->父updated

销毁：父beforeDestroy->子beforeDestroy->子destroyed->父destroyed

**混入mixins的情况**

先mixins的生命周期，再走组件的生命周期

mixins beforeCreate -> 父beforeCreate -> mixins created -> 父created -> mixins beforeMount -> 父beforeMount -> mixins mounted -> 父mounted -> mixins beforeDestroy -> 父beforeDestroy -> mixins destroyed -> 父destroyed

**被keep-alive包裹时**

例如keep-alive中有两个组件A和B：

A首次激活时，在mounted之后触发activated

A组件失活B组件激活时，B beforeCreate -> B created -> B beforeMount -> A deactivated -> B mounted -> B activated

B失活A再激活，B deactivated -> A activated





### vue data 中属性变化后，视图会立即更新吗

不会立即同步执行重新渲染。Vue 实现响应式并不是数据发生变化之后立即更新 DOM，而是按一定的策略进行 DOM 的更新。

Vue 在更新DOM 时是异步执行的。只要侦听到数据变化， Vue 将开启一个队列， 并缓冲在同一事件循环中发生的所有数据变更。

如果同一个 watcher 被多次触发，只会被推入到队列中一次。这种在缓冲时去除重复数据对于避免不必要的计算和 DOM 操作是非常重要 

的。然后，在下一个的事件循环 tick 中，Vue 刷新队列并执行实际（已去重的）工作。

然后vue会通过nextTick方法，将一个刷新watcher队列的方法放入全局的异步任务队列中。如果已经存在这样的方法，则会等待其完成后再放入。



## Vue3

### Vue3 与 Vue2 的区别

1、响应式系统的变化

Vue3 使用 Proxy 重写了响应式系统，而 Vue2 使用的是 Object.defineProperty，带来了性能上的很大提升

2、Composition API

Vue3 引入了 Composition API，可以更好地重用和组织代码，比如使用 hook。而 Vue2 主要使用 Options API。

3、更好的 TypeScript 支持:

Vue3 对 TypeScript 的支持更好，使得在 TypeScript 项目中使用 Vue 变得更加方便。

4、新的内置组件

如：Fragment（多根节点组件）、Suspense（异步组件）、Teleport（传送门）

5、生命周期

6、工具链

推荐使用 Vite

6、其他细节

- 支持多根节点
- 支持 ref、reactive、shadowRef 等众多进行数据响应式的 api



### hook

Vue 3 中的 Hook 是一种新的编程模式，它允许你在组件之间重用状态和副作用的逻辑。在 Vue 3 中，这种模式主要通过 Composition API 来实现。  

Composition API 是 Vue 3 中的一个新特性，它提供了一种更灵活的方式来组织和复用组件的逻辑。在 Composition API 中，你可以使用一系列的函数（也就是所谓的 "Hook"）来创建和管理组件的状态和副作用。 
