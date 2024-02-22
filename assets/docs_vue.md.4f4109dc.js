import{_ as a,S as r,N as i,B as e,j as t,Z as l,Q as o}from"./chunks/framework.d2ce16e8.js";const C=JSON.parse('{"title":"Vue","description":"","frontmatter":{"outline":"deep"},"headers":[],"relativePath":"docs/vue.md","filePath":"docs/vue.md","lastUpdated":1708601980000}'),p={name:"docs/vue.md"},d=o('<h1 id="vue" tabindex="-1">Vue <a class="header-anchor" href="#vue" aria-label="Permalink to &quot;Vue&quot;">​</a></h1><h3 id="vue中使用了哪些设计模式" tabindex="-1">vue中使用了哪些设计模式 <a class="header-anchor" href="#vue中使用了哪些设计模式" aria-label="Permalink to &quot;vue中使用了哪些设计模式&quot;">​</a></h3><ul><li>单例模式：new多次，只有一个实例</li><li>工厂模式：传入参数，就可以创建实例</li><li>发布订阅模式：中央事件总线</li><li>观察者模式：watch和dep</li><li>代理模式：data属性、proxy</li><li>中介者模式：vuex</li></ul><h3 id="响应式原理-双向绑定原理" tabindex="-1">响应式原理/双向绑定原理 <a class="header-anchor" href="#响应式原理-双向绑定原理" aria-label="Permalink to &quot;响应式原理/双向绑定原理&quot;">​</a></h3><p>采用<strong>数据劫持</strong>结合<strong>发布-订阅者模式</strong>的方式，通过 Object.defineProperty 劫持各个属性的 getter/setter，在数据变化时发布消息给订阅者，触发相应的监听回调。</p><p>主要构成模块包括：</p><ul><li>Observer类：对数据对象进行递归遍历，给属性添加 getter、setter，实现数据劫持</li><li>Compile： 模板指令解析器，编译指令及模板语法，将模板中的变量替换成数据，然后初始化渲染页面视图，并将每个指令对应的节点绑定更新函数，添加监听数据的订阅者，一旦数据变化，收到通知，更新视图</li><li>Watcher：订阅者，属性变化时收到消息并执行update回调。是 Observer 和 Compile 通信的桥梁，主要做的事情：1）在自身实例化时往属性订阅器（dep）里添加自己 2）自身必须有一个 update 方法；3）待属性变动 dep.notice()通知时，调用自身的 update()方法，并触发 Compile 中绑定的回调</li><li>MVVM 作为数据绑定的入口，整合 Observer、Compile 和 Watcher 三者，通过 Observer 来监听自己的 model 数据变化，通过 Compile 来解析编译模板指令，最终利用 Watcher 搭起 Observer 和 Compile 之间的通信桥梁，达到数据变化 -&gt; 视图更新；视图交互变化(input) -&gt; 数据 model 变更的双向绑定效果。</li></ul><p>通过Observer来监听model数据变化，通过compile解析编译模板指令，最终利用watcher完成observer和compile之间的通信，达到双向绑定/响应式的效果。</p><p>实现步骤主要有：</p><ol><li>Observe对属性进行递归遍历，通过<code>Object.defineProperty()</code>方法给属性添加get、set访问器属性，使其变成响应式，在数据读取或修改时就会触发这两个方法。</li><li>指令解析器会解析模板指令，并将模板中的变量替换成具体的数据，并给对应的节点添加watcher实例.</li><li>在获取数据的过程中，触发get方法，依赖收集器会记录这些订阅者。</li><li>当给数据重新赋值时，触发set方法，依赖收集器通知已经记录的订阅者，订阅者调用自身的update方法，触发compile中绑定的回调，更新视图。</li></ol><h3 id="object-defineproperty-和proxy" tabindex="-1">Object.defineProperty()和Proxy <a class="header-anchor" href="#object-defineproperty-和proxy" aria-label="Permalink to &quot;Object.defineProperty()和Proxy&quot;">​</a></h3><p><code>Object.defineProperty</code>通过对属性设置getter和setter实现监听，所以（1）需要遍历+递归为每个属性，如果层次比较深，性能消耗很大；（2）只能对预定义过的属性作出响应。（3）对象内部的变化，如对象增删属性、数组变化等无法被监听，vue内部通过重写相关方法的方式解决这个问题。</p><p><code>Proxy</code>通过代理整个对象来进行监听，相当于在对象之前设置了一层“拦截”，任何对该对象的访问都可以过滤和改写。</p><h3 id="vue2生命周期" tabindex="-1">vue2生命周期 <a class="header-anchor" href="#vue2生命周期" aria-label="Permalink to &quot;vue2生命周期&quot;">​</a></h3><p>调用new Vue()，实例化vue对象，然后初始化事件和生命周期，接下来开始组件生命周期：</p>',15),n=e("li",null,"beforeCreate：初始化阶段。此时vue组件对象被创建，但对象属性还未绑定，此时不能访问data、methods、conputed、watch等属性，一般用来初始化非响应式变量",-1),u=e("li",null,"init injections&reactivity：挂载数据，属性赋值，包括属性和computed运算",-1),s=e("li",null,"created：实例已经初始化，可以访问data、methods、conputed、watch等属性，但还没挂载到dom，不能访问$ref、$el等，一般用于简单的axios请求，页面的初始化",-1),c=e("li",null,[t("判断el属性、template属性： "),e("ol",null,[e("li",null,"如果没有el属性，就停止编译，生命周期停止，等待手动调用vm.$mount()完成全局变量$el的绑定"),e("li",null,[t("如果有el属性，再判断是否有template模板： "),e("ol",null,[e("li",null,"有则将其作为模板编译成render函数，如果没有则将外部html作为模板编译，因此，template中的模板优先级高于outer HTML"),e("li",null,"如果有render函数，则会替换template")])])])],-1),h=e("li",null,"mounted：vue实例已经挂载到dom上，此时可以通过DOM API获取到dom节点，$ref属性可以访问",-1),m=e("li",null,"beforeUpdate：响应式数据更新后，触发模板更新时，会调用watcher的render函数。",-1),b=e("li",null,"updated：dom更新之后，可执行依赖于dom的操作",-1),v=e("li",null,"beforeDestroy：实例销毁之前，这时this仍然可用",-1),f=e("li",null,"destroyed：实例销毁后调用，清空watcher、事件、删除dom、删除子实例等",-1),g=o('<p>下面两个钩子与keep-alive有关：</p><p>activated：被包裹的组件在显示时触发</p><p>deactivated：被包裹的组件在失活时触发</p><p>其他：</p><p>errorCaptured：2.5+，在捕获一个来自后代组件的错误时触发，三个参数：错误对象、出错的组件实例、包含错误来源信息的字符串，此钩子可以返回false以阻止错误继续向上传播。</p><p>errorHandler：一个全局配置，用来捕获全局异常状态，参数同上</p><h3 id="生命周期顺序" tabindex="-1">生命周期顺序 <a class="header-anchor" href="#生命周期顺序" aria-label="Permalink to &quot;生命周期顺序&quot;">​</a></h3><p><strong>父子组件情况</strong></p><p>加载时：父beforeCreate -&gt; 父created -&gt; 父beforeMount -&gt; 子beforeCreate -&gt; 子created -&gt; 子beforeMount -&gt; 子mounted -&gt; 父mounted</p><p>子组件更新：父beforeUpdate-&gt;子beforeUpdate-&gt;子updated-&gt;父updated</p><p>父组件更新：父beforeUpdate-&gt;父updated</p><p>销毁：父beforeDestroy-&gt;子beforeDestroy-&gt;子destroyed-&gt;父destroyed</p><p><strong>混入mixins的情况</strong></p><p>先mixins的生命周期，再走组件的生命周期</p><p>mixins beforeCreate -&gt; 父beforeCreate -&gt; mixins created -&gt; 父created -&gt; mixins beforeMount -&gt; 父beforeMount -&gt; mixins mounted -&gt; 父mounted -&gt; mixins beforeDestroy -&gt; 父beforeDestroy -&gt; mixins destroyed -&gt; 父destroyed</p><p><strong>被keep-alive包裹时</strong></p><p>例如keep-alive中有两个组件A和B：</p><p>A首次激活时，在mounted之后触发activated</p><p>A组件失活B组件激活时，B beforeCreate -&gt; B created -&gt; B beforeMount -&gt; A deactivated -&gt; B mounted -&gt; B activated</p><p>B失活A再激活，B deactivated -&gt; A activated</p><h3 id="vue-data-中属性变化后-视图会立即更新吗" tabindex="-1">vue data 中属性变化后，视图会立即更新吗 <a class="header-anchor" href="#vue-data-中属性变化后-视图会立即更新吗" aria-label="Permalink to &quot;vue data 中属性变化后，视图会立即更新吗&quot;">​</a></h3><p>不会立即同步执行重新渲染。Vue 实现响应式并不是数据发生变化之后立即更新 DOM，而是按一定的策略进行 DOM 的更新。</p><p>Vue 在更新DOM 时是异步执行的。只要侦听到数据变化， Vue 将开启一个队列， 并缓冲在同一事件循环中发生的所有数据变更。</p><p>如果同一个 watcher 被多次触发，只会被推入到队列中一次。这种在缓冲时去除重复数据对于避免不必要的计算和 DOM 操作是非常重要</p><p>的。然后，在下一个的事件循环 tick 中，Vue 刷新队列并执行实际（已去重的）工作。</p><p>然后vue会通过nextTick方法，将一个刷新watcher队列的方法放入全局的异步任务队列中。如果已经存在这样的方法，则会等待其完成后再放入。</p><h2 id="vue3" tabindex="-1">Vue3 <a class="header-anchor" href="#vue3" aria-label="Permalink to &quot;Vue3&quot;">​</a></h2><h3 id="vue3-与-vue2-的区别" tabindex="-1">Vue3 与 Vue2 的区别 <a class="header-anchor" href="#vue3-与-vue2-的区别" aria-label="Permalink to &quot;Vue3 与 Vue2 的区别&quot;">​</a></h3><p>1、响应式系统的变化</p><p>Vue3 使用 Proxy 重写了响应式系统，而 Vue2 使用的是 Object.defineProperty，带来了性能上的很大提升</p><p>2、Composition API</p><p>Vue3 引入了 Composition API，可以更好地重用和组织代码，比如使用 hook。而 Vue2 主要使用 Options API。</p><p>3、更好的 TypeScript 支持:</p><p>Vue3 对 TypeScript 的支持更好，使得在 TypeScript 项目中使用 Vue 变得更加方便。</p><p>4、新的内置组件</p><p>如：Fragment（多根节点组件）、Suspense（异步组件）、Teleport（传送门）</p><p>5、生命周期</p><p>6、工具链</p><p>推荐使用 Vite</p><p>6、其他细节</p><ul><li>支持多根节点</li><li>支持 ref、reactive、shadowRef 等众多进行数据响应式的 api</li></ul><h3 id="hook" tabindex="-1">hook <a class="header-anchor" href="#hook" aria-label="Permalink to &quot;hook&quot;">​</a></h3><p>Vue 3 中的 Hook 是一种新的编程模式，它允许你在组件之间重用状态和副作用的逻辑。在 Vue 3 中，这种模式主要通过 Composition API 来实现。</p><p>Composition API 是 Vue 3 中的一个新特性，它提供了一种更灵活的方式来组织和复用组件的逻辑。在 Composition API 中，你可以使用一系列的函数（也就是所谓的 &quot;Hook&quot;）来创建和管理组件的状态和副作用。</p>',44);function _(x,y,P,V,k,q){return r(),i("div",null,[d,e("ol",null,[n,u,s,c,e("li",null,[t("beforeMount：挂载到dom之前，找到对应的template，并编译成render函数，此时this.$el上有值，但数据还没挂载到页面上，此时"),e("code",null,l(),1),t("还没有被替换掉")]),h,m,b,v,f]),g])}const M=a(p,[["render",_]]);export{C as __pageData,M as default};
