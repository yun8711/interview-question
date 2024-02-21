

[TOC]



#### 0 Vue 基本原理

当一个 Vue 实例创建时，Vue 会遍历 data 中的属性，用 Object.defineProperty 将它们转为 getter/setter，并在内部追踪相关依赖，在属性被访问和修改时通知变化。每个组件实例都有相应的watcher 程序实例，它会在组件渲染过程中把属性记录为依赖，当依赖项的 setter 被调用时，会通知watcher 重新计算，从而使关联的组件得以更新。



#### vue 设计原则的理解

1. 渐进式：可以自底向上逐层应用，核心库只关注视图层，易于上手，便于与第三方库或现有项目整合；随着应用规模的扩大，再引入路由、状态管理、等其他工具，学习曲线平和。
2. 易用性：提供数据响应式、声明式模板语法、基本配置的组件系统等核心特性，
3. 高效性：虚拟 dom 和 diff 算法，可以拥有较好的性能表现





#### 1 响应式原理/双向绑定原理

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



#### 2 Object.defineProperty()和Proxy

`Object.defineProperty`通过对属性设置getter和setter实现监听，所以（1）需要遍历+递归为每个属性，如果层次比较深，性能消耗很大；（2）只能对预定义过的属性作出响应。（3）对象内部的变化，如对象增删属性、数组变化等无法被监听，vue内部通过重写相关方法的方式解决这个问题。

`Proxy`通过代理整个对象来进行监听，相当于在对象之前设置了一层“拦截”，任何对该对象的访问都可以过滤和改写。



#### 3 vue中使用了哪些设计模式

- 单例模式：new多次，只有一个实例
- 工厂模式：传入参数，就可以创建实例
- 发布订阅模式：中央事件总线
- 观察者模式：watch和dep
- 代理模式：data属性、proxy
- 中介者模式：vuex



#### 4 vue生命周期及相关钩子

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



#### 5 生命周期顺序

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



#### 6 updated在什么时候调用

在更新响应式数据并重新渲染虚拟dom之后，它可以用于执行与dom相关的操作，但默认情况下，并不能保证子组件会被渲染，一般写在$nextTick中。





#### 7 vue data 中属性变化后，视图会立即更新吗

不会立即同步执行重新渲染。Vue 实现响应式并不是数据发生变化之后立即更新 DOM，而是按一定的策略进行 DOM 的更新。

Vue 在更新DOM 时是异步执行的。只要侦听到数据变化， Vue 将开启一个队列， 并缓冲在同一事件循环中发生的所有数据变更。

如果同一个 watcher 被多次触发，只会被推入到队列中一次。这种在缓冲时去除重复数据对于避免不必要的计算和 DOM 操作是非常重要 

的。然后，在下一个的事件循环 tick 中，Vue 刷新队列并执行实际（已去重的）工作。

然后vue会通过nextTick方法，将一个刷新watcher队列的方法放入全局的异步任务队列中。如果已经存在这样的方法，则会等待其完成后再放入。



#### 17 $nextTick

本质是对 js 的 EventLoop 的一种应用。 核心是利用 Promise、MutationObserver、setImmediate、setTimeout 等原生方法来模拟对应的微任务、宏任务的实现。是为了利用这些异步回调任务队列来实现 Vue 框架中的异步回调队列。

实际项目中，用来设置一个回调，并让程序在下次dom更新后调用。

因为vue对dom是异步更新，所以当某个操作引起dom更新，从数据改变到dom更新不是立即执行，而是在下一个事件循环才会触发。

如果这时逻辑上需要立刻对改变后的dom进行操作，是不会生效的，就需要用$nextTick设置一个回调，来告诉vue在dom更新后需要执行哪些操作。



#### 8 diff算法

对虚拟节点进行对比，并返回一个patch对象，用来存储两个节点树不同的地方，最后用patch记录的消息去局部更新dom。

特点：从根节点开始向下逐层进行同层级比较；循环从两边向中间进行。

整体策略：深度优先，同层比较



#### 9 Vue.use是干什么的/vue插件

Vue.use用来加载插件，需要在new Vue之前调用，它会自动阻止多次注册相同的插件。插件通常用来为vue添加全局功能。

vue插件，应该暴露一个install方法，这个方法的第一个参数是vue构造器，第二个参数是一个可选的选项对象。



#### 10 template和jsx的区别

对于runtime来说，只需要保证组件存在render函数即可。

在webpack中，使用vue-loader编译.vue文件，内部依赖的vue-template-compiler模块，能将template预编译成render函数。而添加了jsx的语法糖解析器babel-plugin-transform-vue-jsx后，就可以直接手写render函数。

所以，它们都是render的一种表现形式，不同的是：jsx灵活性更高，在复杂组件中更有优势；template在结构上更符合视图与逻辑分离的习惯，简单、好维护。



#### 11 组件渲染流程/template到render的过程/模板编译原理

vue 中的模板 template 无法被浏览器解析并渲染，因为这不是浏览器标准，所以需要将 template 转化成 js 函数，这样浏览器就可以执行函数并渲染出对应的 html 元素，这个转换的过程就是模板编译。

模板编译的过程分 3 个阶段：解析 parse，优化 optimize，生成 generate（template -> ast -> render函数）

步骤：

1. 解析：通过正则表达式（html-parser）对template字符串进行解析，将标签、指令、属性等解析成AST抽象语法树
2. 优化：遍历ast，标识静态节点，方便在重新渲染时进行 diff 比较，优化运行时性能
3. 生成：通过generate将ast编译成render字符串，将静态部分放在静态渲染方法staticRenderFns中，最后通过`new Function('render字符串')`生成render函数



#### 12 组件通信的方式

props/$emit：父子组件。父组件通过props向子组件传值；子组件通过$emit向父组件传值，父组件通过v-on获取子组件的值

$parent/$children：父子组件。访问父组件/子组件实例，无法跨级或兄弟间通信

ref：父子组件。指向子元素，可以是普通dom元素或组件实例

$emit/$on：兄弟组件，跨级组件。通过一个空的Vue实例作为中央事件总线，用它来触发事件和监听事件，可以实现任何组件间的通信

vuex：通过全局state存放数据，在任何组件内都可以获取值或修改值

$attrs/$listeners：跨级组件。用来识别父作用域中没有通过prop所传递的特性（除class和style）和事件（不含.native修饰器的）。通过`v-bind="$attrs"`把属性传入内部组件，一般配置interitAttrs选项一起使用。通过`v-on="$listeners"`把事件传入内部组件。

provide/inject：跨级组件。允许一个祖先组件向其所有后代注入一个依赖，不论组件层次有多深，并在上下游关系成立的时间里始终生效。祖先组件通过provider提供变量，后代组件通过inject来获取变量。它的主要作用是解决跨级组件间的通信，不是响应的，是子组件获取上级组件的状态，在跨级 组件间建立一种主动提供与依赖注入的关系。



#### 13 函数式组件

将组件标记为functional，无状态（没有响应数据），无实例（没有this），无生命周期，只接受一些props，渲染性能有一定提高。组件需要的一切都是通过reder函数的context参数传递的。

组件选项：

- functional：设置为true，表示该组件为一个函数式组件
- props：可选，传递值到组件内部
- reder：必须，提供渲染函数来返回一个vnode，接收两个参数：
  - createElement：
  - context：组件需要的一切都是通过context参数传递，它是一个对象，包含如下字段：
    - props：提供所有prop的对象
    - children：vnode子节点的数组
    - slots：一个函数，返回了包含所有插槽的对象
    - scopedSlots：一个暴露传入的作用域插槽的对象，也以函数形式暴露普通插槽
    - data：传递给组件的整个数据对象，作为createElement的第二个参数传入组件
    - parent：对父组件的引用
    - listeners：一个包含所有父组件为当前组件注册的事件监听器的对象，这是data.on的一个别名
    - injections：如果使用了inject选项，则该对象包含了应当被注入的property



#### 14 渲染函数/rander

vue允许开发者以多种方式构建模板，最常见的方式是只把html与指令和模板语法一起用于响应功能。但也可以借助渲染函数，使用原生js来构建模板，这些函数与编译器非常接近，所以比其他模板更加高效、快捷。



#### 15 通用组件封装注意

尽量做到高内聚，低耦合，按照单向数据流，遵循单一原则

1. 对props传入的参数增加限制和验证
2. 如果是通用组件，应该把事件处理交给父组件处理，
3. 合理使用slot插槽，提高组件通用性
4. 合理使用vuex，应该避免通过vuex传参
5. 合理运用scoped编写css，既要避免样式污染，也要避免产生大量的重复代码



#### 16 keep-alive

是一个vue内置的抽象组件，自身不会渲染dom元素，也不会出现在组件的父组件链中。用来包裹动态组件，缓存不活动组件的内部状态，避免组件重复渲染。

属性：

- include：匹配的组件会被缓存，可以是字符串、数组、正则表达式，可以用逗号分隔
- exclude：匹配的组件不会被缓存，优先级大于include，可以是字符串、数组、正则表达式，可以用逗号分隔
- max：指定缓存组件的最大数量，字符串或数字

实现流程：

1. 判断组件name，不在include或者exclude中，说明组件不被缓存，直接返回vnode
2. 获取组件实例key，如果有获取实例的key，否则重新生成
3. key生成规则：`cid+"::"+tag`，仅靠cid还不够，因为相同的构造函数可以注册为不同的本地组件
4. 如果缓存内存在，则直接从缓存中获取组件实例，不存在则添加到缓存对象中
5. 最大缓存数量，当缓存组件数量超过max值时，清除keys数组中第一个组件



#### 18 delete和Vue.delete删除的区别

delete只是被删除的元素变成了empty/undefined，其他的元素的键值还是不变

Vue.delete或vm.$delete用来删除对象的属性，避免属性删除不能被检测到的问题，但目标对象不能是vue实例或根数据对象；也可以用来删除数组中的元素。



#### 19 自定义指令

组件是代码复用和抽象的主要形式，但有的情况下仍然需要对普通dom元素进行底层操作，这时就要用到指令，除了vue内置的指令，还可以自定义指令。

全局定义，使用`Vue.directive('focus',{})`，局部定义：`directives:{focus:{}}`

一个指令定义对象可以提供以下钩子函数，均为可选：

- bind：只调用一次，指令第一次绑定到元素时调用，这里进行一次性的初始化设置
- inserted：被绑定元素插入父节点时调用
- update：所在组件的vnode更新时调用，
- componentUpdated：指令所在组件的vnode及其子vnode全部更新后调用
- unbind：只调用一次，指令与元素解绑时调用

使用示例：

复制指令、权限指令等



#### 20 mixin、extends的覆盖逻辑

都是用于合并、拓展组件，两者均通过mergeOptions方法实现合并。

- mixins接收一个混入对象的数组，其中混入对象可以像正常的实例对象一样包含实例选项，这些选项会被合并到最终的选项中。mixin钩子会按照传入顺序依次调用，并先于组件被调用，所以mixin中的选项可以被覆盖。
- extends主要是为了便于扩展单文件组件，单继承，只能暴露一个extends对象；接收一个外部的包含选项的对象或构造函数，对构造器进行扩展。执行优先级比mixins高

mergeOptions的执行过程：

1. 规范化选项（normalizeProps、normalizeInject、normalizeDirectives）
2. 对未合并的选项，进行判断
3. 合并处理，根据一个通过vue实例所包含的选项进行逐一判断合并，将结果存储在新定义的options对象里
4. 返回合并结果options



#### 21 组件的name属性

- 可以实现组件递归调用
- 可以表示组件的具体名称，方便调试和查找



#### 22 data为什么是一个函数

组件就是一个Vue实例，实例是通过构造函数创建的，每个实例都会继承原型上的方法或属性。对于引用类型的数据，多个实例间会共享这个对象，造成互相之间的影响。

组件要实现复用，就需要每个组件都有自己的数据。数据以函数返回值的形式定义，data()函数的this会指向当前实例，也就让每个组件有自己的私有数据空间。



#### 23 data属性可以和methods中方法同名吗？

可以同名，但methods的方法名会被data的属性名覆盖，控制台也会报错，但不影响执行。

源码定义的initState执行的顺序是：props>methods>data>computed>watch



#### 24 provide和reject

provide：`Object | () => Object`，一个对象或返回对象的函数

reject：`Array<string> | { [key: string]: string | Symbol | Object }`，一个字符串数组或一个对象，该对象包含可注入其后代的property。

需要一起使用，允许祖先组件向所有后代组件注入一个依赖，不论层次有多深，并在上下游关系成立的时间时始终生效。

为高阶组件提供的数据传递方式，它会使组件之间的耦合度变得很高，尤其是滥用跨多级组件进行传值，代码的稳定性和可维护性大降低。



#### 25 computed、watch、method的区别

**computed 计算属性：**避免模板中放入太多的逻辑让模板过重且难以维护，且多次使用的情况下，尽量采取计算属性的方式

- 如果一个属性是由其他属性计算而来，一般会使用computed
- 基于它们依赖的响应式数据进行缓存，默认会先获取缓存值，只有依赖的数据改变了才会重新计算
- 不支持异步
- computed属性可以设置get方法和set方法。取值使用get方法，数据变化时会调用set方法

**watch 监听器**

- 更多的是观察作用
- 不支持缓存，数据变化就会触发相应的操作
- 支持异步，当要执行异步或昂贵的操作以响应变化时，需要使用watch
- 还有两个参数：
  - immediate：组件加载后立即触发回调
  - deep：深度监听，一般用于对复杂数据的监听，如数组、对象

**method 方法**

- 调用总会执行该函数



#### 26 slot插槽

是vue的内容分发机制，组件内部的模板引擎使用slot元素作为承载分发内容的出口。

实现原理：当子组件vm实例化时，获取的父组件传入的slot标签的内容，并存放在`vm.$slot.xxx`中，`xxx`默认为default，当组件执行渲染函数时，遇到slot标签时，会用$slot中的内容进行替换，此时可以为插槽传递数据，若存在数据，则可称该插槽为作用域插槽。

分为三类：

- 默认插槽：双叫匿名插槽，当slot没有指定name属性值时，它的值就是default，一个组件内只能有一个匿名插槽
- 具名插槽：指定了name且不为default的插槽，一个组件可以有多个具名插槽
- 作用域插槽：默认插槽、具名插槽的变体，特点是在子组件渲染作用域插槽时，可以将子组件内部的数据传递给父组件，让父组件根据子组件传递的数据来决定如何渲染该插槽



#### 27 filters过滤器

不会修改数据，用来过滤数据，改变数据的输出，一般用来数据格式化，比如时间格式化、价格显示。

过滤器就是个函数，它会把表达式中的值始终当作第一个参数。



#### 28 修饰符

**事件修饰符**

`.stop`：防止事件冒泡，等同于`event.stopPropagation()`

`.prevent`：阻止浏览器的默认事件（比如：a标签自动跳转、form中submit导致页面刷新、网页右键单机弹出菜单），等同于`event.preventDefault()`

`.capture`：开启捕获模式，给元素添加监听器。添加了该修饰符时，先从外到里捕获，剩下的由里到外冒泡

`.self`：只触发自己范围内的事件，不包含子元素

`.once`：只会触发一次

`.passive`：通俗的说，就是浏览器每次在事件触发时都会查询是否有preventDefault阻止该次事件的默认行为，加上passive就是为了告诉浏览器，不用查询了，没有使用preventDefault阻止默认行为。一般用在滚动监听这种情况，让内核线程跳过查询，提升流畅度。

`.native`：加在自定组件的事件上，保证事件能执行

**按键修饰符：**允许为v-on在监听键盘事件时添加修饰符

.enter、.tab、.delete、.esc、.space、.up、.down、left、.right

**系统修饰键**

.ctrl、.alt、.shift、.meta

**鼠标按钮修饰符**

.left、.right、.middle



#### 29 vue中key的作用

key主要用在diff算法中，在新旧vnode对比时用来辨识节点。如果不使用key，vue会最大限度减少动态元素并尽可能的复用相同元素。如果使用了key，它会基于key的变化重新排列元素顺序，并会移除key不存在的元素。

简单的说：key的作用就是在更新组件时判断两个节点是否相同，相同就复用，不相同就删除旧的创建新的。

不建议使用index作为key，如果只是渲染展示没有问题，以下情况时会有问题，原因是：

- 对数据进行逆序添加/逆序删除等破坏顺序的操作，会产生没必要的dom更新，数据过多时效率过低
- 如果结构中包含输入类的dom，会产生错误dom更新，比如动态切换选择项、form表单



#### 30 v-if、v-show区别

**v-if**

动态的向dom树内添加或删除dom元素，当元素切换时，会有局部的编译/卸载过程，会销毁和重建内部的事件监听和子组件，因此有更高的切换消耗，适合不会经常改变的场景；v-if是惰性的，如果初始条件为false则什么也不做，只有条件为true时才开始局部编译。

**v-show**

通过设置dom元素的display样式属性控制显隐，只是简单的css切换，在任何条件下，都会被编译，然后被缓存，dom元素会被保留，因此v-show有更高的初始渲染消耗；适合频繁切换的场景。



#### 31 v-if、v-show、v-html原理

v-if：调用addIfCondition方法，生成vnode时会忽略对应节点，render的时候就不会渲染

v-show：会生成vnode，render的时候也会渲染成真实节点，只在render过程中会在节点的属性中修改display值

v-html：会先移除节点下的所有节点，调用html方法，通过addProp添加innerHTML属性，设置innerHTML为v-html的值



#### 32 v-for和v-if一起使用

在v2中，v-for比v-if优先级高；在v3中，v-if比v-for优先级高。

v-for和v-if一起使用时，在显示结果上没有问题，但会带来不必要的性能消耗。

可以通过computed先对数据进行计算过滤。



#### 33 v-model的实现

一个语法糖，父组件给子组件`v-bind:value`和`v-on:input`，子组件通过`$emit('input')`来通知父组件。

在一些输入类型组件，为了避免`:value`被占用的情况，可以通过model选项来改变传入子组件的值。



#### 34 Vue项目性能优化

**代码优化**

- 减少data中数据，尤其是没有响应式需求的数据
- 数据层级不要过深，合理设置响应式数据
- 避免v-if、v-for一起使用
- 合理使用v-if和v-show
- v-for中设置key值
- v-for中给每项元素绑定事件时，可以使用事件委托
- 使用keep-alive缓存组件
- 使用函数式组件
- 使用路由懒加载、异步组件
- 防抖、节流
- 第三方模块按需导入
- 图片懒加载
- 长列表动态加载，虚拟滚动、时间分片策略

**打包优化**

- 加快打包速度
  - 优化Loader，比如给Loader指定更精确的文件搜索范围
  - 使用happypack开启多线程打包
  - 使用DllPlugin，将特定的类库提前打包然后引入，减少类库打包次数
- 减少打包体积
  - 按需加载
  - 开启Scope Hoisting，尽可能把打包出来的模块合并到一个函数中
  - 使用tree shaking，删除未被引用的代码
- 优化前端性能
  - 压缩代码，删除多余的代码、注释，简化代码写法等，默认开启
  - 使用cdn方式加载第三方模块
  - splitChunks抽离公共文件，作到按需加载，充分利用浏览器缓存



#### Vue 中封装的数组方法有哪些，如何实现页面更新

在 Vue2 中响应式是利用 Object.defineProperty 对数据进行拦截，它的缺点是：

- 无法监听动态属性，即数据的新增和删除
- 无法监听数组长度的变化
- 无法监听数组索引值的修改

这个方法不能监听数组内部变化、长度变化等，所以需要对这些操作进行 hack。

Vue2 将被侦听的数组的变更方法进行了包裹，所以它们也会触发视图更新，这些方法包括：push、pop、shift、unshift、splice、sort、reverse。



