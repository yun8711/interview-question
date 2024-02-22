import{_ as l,S as e,N as i,Q as a}from"./chunks/framework.d2ce16e8.js";const M=JSON.parse('{"title":"开发基础知识","description":"","frontmatter":{"outline":"deep"},"headers":[],"relativePath":"docs/develop-basic.md","filePath":"docs/develop-basic.md","lastUpdated":1708601980000}'),o={name:"docs/develop-basic.md"},r=a('<h1 id="开发基础知识" tabindex="-1">开发基础知识 <a class="header-anchor" href="#开发基础知识" aria-label="Permalink to &quot;开发基础知识&quot;">​</a></h1><h2 id="框架通识" tabindex="-1">框架通识 <a class="header-anchor" href="#框架通识" aria-label="Permalink to &quot;框架通识&quot;">​</a></h2><h3 id="mvvm、mvc、mvp-的区别" tabindex="-1">MVVM、MVC、MVP 的区别 <a class="header-anchor" href="#mvvm、mvc、mvp-的区别" aria-label="Permalink to &quot;MVVM、MVC、MVP 的区别&quot;">​</a></h3><p>三种常见的软件架构设计模式，主要通过分离关注点的方式来组件代码结构，优化开发效率。</p><p><strong>MVC</strong></p><p>通过分离 Model、View、Controller来组件代码结构，其中 View 负责页面的显示逻辑，Model 负责存储页面的业务数据及相应数据的操作。并且 View 和 Model 应用了观察者模式，当 Model 层发生变化时会通知有关 View 层更新页面。</p><p>Controller 层是 View 层和 Model 层的纽带，主要负责用户与应用的响应操作，当页面变化时，Controller 中的事件触发器就开始工作，调用 Model 层来完成对 Model 的修改，然后 Model 层再通知 View 层更新。</p><p><strong>MVVM</strong></p><p>由Model、View、ViewModel三部分组成，分别代表：</p><ul><li>Model：数据模型，数据和业务逻辑都在 Model 中定义</li><li>View：UI视图，负责数据展示</li><li>ViewModel：一个同步View和Model的对象，负责监听 Model 中数据的改变并控制视图的更新，处理用户交互操作</li></ul><p>View和Model之间通过ViewModel的双向绑定进行联系，并且它们之间的同步是自动进行的。因此开发者不需要手动操作dom，不需要关注数据状态的同步问题，复杂的数据状态维护完全由mvvm框架统一管理。</p><p><strong>MVP</strong></p><p>MVP 模式是从 MVC 演变而来，通过表示器（Presenter）将视图与模型分离。MVC 中的 Controller 只知道 Model 的接口，因此它没有办法控制 View 层的更新。</p><p>MVP 模式中，View 层的接口暴露给了 Presenter 因此可以在 Presenter 中将 Model 的变化和 View 的变化绑定在一起，以此来实现 View 和 Model 的同步更新。这样就实现了对 View 和 Model 的解耦，Presenter 还包含了其他的响应逻辑。</p><br><h3 id="spa单页面应用" tabindex="-1">SPA单页面应用 <a class="header-anchor" href="#spa单页面应用" aria-label="Permalink to &quot;SPA单页面应用&quot;">​</a></h3><p>仅在web页面初始化时加载相应的html、css、js，一旦加载完成，不会因用户的操作而进行页面的重新加载或跳转；而是用路由机制实现html内容的变换、ui、交互，避免页面的重新加载。</p><p>优点：</p><ul><li>用户体验好，避免不必要的跳转和重复渲染</li><li>对服务器压力小</li><li>前后端分享，架构清晰</li></ul><p>缺点：</p><ul><li>初始加载耗时多：为实现SPA应用功能及显示效果，需要在初次加载时将js、css统一加载</li><li>由于在单一应用内显示所有内容，不能使用浏览器的前进后退功能，所有的页面切换需要自己建立堆栈管理</li><li>SEO难度大</li></ul><br><h3 id="虚拟dom" tabindex="-1">虚拟dom <a class="header-anchor" href="#虚拟dom" aria-label="Permalink to &quot;虚拟dom&quot;">​</a></h3><p>文档对象模型（dom）定义了一个接口，允许js之类的语言访问和操作html文档。元素由树中的节点表示，并允许操作它们。</p><p>虚拟dom（vnode）本质上就是真实dom在内存上的一种结构映射。</p><p>优点：</p><ul><li>将页面状态抽象为js对象的形式，配合不同的渲染工具，可以实现跨平台，例如weex、ssr、uniapp；</li><li>通过事务处理机制、diff算法，将多次dom修改的结果一次性更新到页面上，减少页面渲染和dom的重绘重排次数，提高渲染性能</li><li>无须手动操作dom，简化开发逻辑，提高开发效率</li><li>保证性能下限，在不进行手动优化情况下，性能不会太差</li></ul><p>注意：虚拟dom并不一定比真实dom性能好，首次渲染大量dom时，由于多了一层虚拟dom的计算，会比innerHTML插入慢；如果对真实dom操作进行针对性优化，还是更快。</p><h3 id="ssr的理解" tabindex="-1">SSR的理解 <a class="header-anchor" href="#ssr的理解" aria-label="Permalink to &quot;SSR的理解&quot;">​</a></h3><p>Server-Side Rendering，服务端渲染，就是在服务端完成html结构拼接和页面处理，发送到浏览器，然后为其绑定状态与事件。</p><p>解决了两个问题：</p><ul><li>SEO</li><li>首屏渲染更快，用户无需等待页面所有js加载完成就可以看到视图</li></ul><p>缺点：</p><ul><li>项目复杂度提高</li><li>性能受到影响</li><li>服务器压力变大</li></ul><h3 id="首屏加载慢的原因和解决方案" tabindex="-1">首屏加载慢的原因和解决方案 <a class="header-anchor" href="#首屏加载慢的原因和解决方案" aria-label="Permalink to &quot;首屏加载慢的原因和解决方案&quot;">​</a></h3><p>首屏时间，是指浏览器从响应用户输入网址，到首屏内容渲染完成的时间，此时整个网页不一定要全部渲染完成，但需要展示当前视窗需要的内容。</p><p>原因：</p><ul><li>网络延时问题</li><li>资源文件体积过大</li><li>资源是否重复发送请求去加载</li><li>加载脚本时，渲染内容堵塞</li></ul><p>优化方式：</p><ul><li>减小入口文件体积</li><li>静态资源本地缓存</li><li>UI框架按需加载</li><li>图片资源压缩</li><li>组件重复打包</li><li>开启gzip压纹</li><li>使用ssr</li></ul><h3 id="react-和-vue-的理解-异同" tabindex="-1">React 和 Vue 的理解，异同 <a class="header-anchor" href="#react-和-vue-的理解-异同" aria-label="Permalink to &quot;React 和 Vue 的理解，异同&quot;">​</a></h3><p><strong>相同点</strong></p><ul><li>组件化的开发模式：提高了代码的可维护性和重用性</li><li>响应式数据绑定，当数据变化时，视图会自动更新</li><li>虚拟 DOM 机制：提高重绘性能，高效的页面更新</li></ul><p><strong>不同点</strong></p><ol><li>响应式数据绑定的实现方式不同 <ul><li>Vue3 使用 Proxy，使得代码简洁易懂，并支持动态添加和删除属性</li><li>React 使用 setState 方法手动触发视图重新渲染，代码相对复杂一些</li></ul></li><li>组件状态管理的实现方式不同 <ul><li>Vue3 引入Composition API，使得组件状态管理更加灵活和可维护，可以将逻辑相关的代码封装为单独的函数</li><li>React则通过生命周期方法和hooks来管理组件状态</li></ul></li><li>组件渲染方式不同 <ul><li>Vue 3采用了template语法来描述组件的结构和行为，这使得代码可读性更高，但灵活性略差</li><li>React则采用JSX语法来描述组件的结构和行为，能发挥 js 的原生能力，使用更加灵活，但是，由于JSX需要手动添加标签，因此代码可读性相对较差</li></ul></li><li>API 设计风格不同 <ul><li>Vue 3的API设计倾向于提供语法糖和便捷方法，使得开发者能够更加高效地编写代码</li><li>React则倾向于提供一些基础API，并且鼓励开发者自行封装复杂的功能。这样做可以让代码更加灵活和可扩展</li></ul></li></ol><h3 id="微前端" tabindex="-1">微前端 <a class="header-anchor" href="#微前端" aria-label="Permalink to &quot;微前端&quot;">​</a></h3><p>微前端借鉴了微服务的理念，将一个大的前端应用拆分为多个独立的小型应用，每个应用都可以独立开发、独立运行、独立部署，再将这些小型应用联合为一个完整的应用。微前端既可以将多个项目融合为一，又可以减少项目之间的耦合，提升项目扩展性，相比一整块的前端仓库，微前端架构下的前端仓库倾向于更小更灵活。</p><p>特性：</p><ul><li>技术栈无关：主框架不限制接入应用的技术栈，子应用可自主选择技术栈</li><li>独立开发/部署：各个团队之间仓库独立，单独部署，互不依赖</li><li>增量升级：当一个应用庞大之后，技术升级或重构相当麻烦，而微应用具备渐进式升级的特性</li><li>独立运行时：微应用之间运行时互不依赖，有独立的状态管理</li><li>提升效率：应用越庞大，越难以维护，协作效率越低下。微应用可以很好拆分，提升效率</li></ul><p>方案：</p><ol><li><p>基于iframe完全隔离方案</p><p>可在一个应用中独立运行另一个应用，优点：使用简单；完美隔离js/css；不限制使用，可放置多个iframe来组合业务。缺点：无法保持路由状态；完全的隔离导致与子应用的交互困难；iframe中的弹窗无法突破其本身；整个应用全量加载，加载速度慢。</p></li><li><p>基于single-spa路由劫持方案</p><p>通过劫持路由的方式来做子应用之间的切换，但接入方式需要融合自身的路由，有一定的局限性。例如蚂蚁金服的qiankun，通过<code>import-html-entry</code> 包解析 <code>HTML</code> 获取资源路径，然后对资源进行解析、加载。通过对执行环境的修改，实现了js沙箱、样式隔离等特性。</p></li><li><p>micro-app（京东）</p><p>借鉴了 <code>WebComponent</code> 的思想，通过 <code>CustomElement</code> 结合自定义的 <code>ShadowDom</code>，将微前端封装成一个类 <code>webComponents</code> 组件，从而实现微前端的组件化渲染。</p></li></ol><h2 id="计算机通识" tabindex="-1">计算机通识 <a class="header-anchor" href="#计算机通识" aria-label="Permalink to &quot;计算机通识&quot;">​</a></h2><h3 id="线程、进程、协程" tabindex="-1">线程、进程、协程 <a class="header-anchor" href="#线程、进程、协程" aria-label="Permalink to &quot;线程、进程、协程&quot;">​</a></h3><p>进程就是应用程序的启动实例，是最小的资源管理单位。比如运行一个游戏，打开一个软件，就是开启了一个进程。进程拥有代码和打开的文件资源、数据、独立的内存空间。</p><p>线程从属于进程，是程序的实际执行者，是最小的执行单元，一个进程至少包含一个主线程，也可以有更多的子线程。</p><p>协程，一种比线程更加轻量级的存在，一个线程也可以有多个协程，进程也可以单独拥有协程。协程在线程中实现调度，完全由程序控制，避免了内核级别上下文切换造成的性能损失。</p><br><h3 id="僵尸进程和孤儿进程" tabindex="-1">僵尸进程和孤儿进程 <a class="header-anchor" href="#僵尸进程和孤儿进程" aria-label="Permalink to &quot;僵尸进程和孤儿进程&quot;">​</a></h3><p>孤儿进程：父进程退出了，而它的一个或多个进程还在运行，那这些子进程都会成为孤儿进程。孤儿进程将被 init 进程(进程号为 1)所收养，并由 init 进程对它们完成状态收集工作。</p><p>僵尸进程：子进程比父进程先结束，而父进程又没有释放子进程占用的资源，那么子进程的进程描述符仍然保存在系统中，这种进程称之 为僵尸进程。</p><br><h3 id="多线程的性能影响有哪些" tabindex="-1">多线程的性能影响有哪些 <a class="header-anchor" href="#多线程的性能影响有哪些" aria-label="Permalink to &quot;多线程的性能影响有哪些&quot;">​</a></h3><p>1、上下文切换：当操作系统从一个线程切换到另一个线程时，需要保存当前线程的状态并加载新线程的状态，这个过程会消耗一定的时间和资源</p><p>2、线程创建和销毁：线程的创建和销毁也需要消耗一定的时间和资源。如果频繁地创建和销毁线程，会对性能产生影响</p><p>3、线程同步：多线程环境下，为了保证数据的一致性和完整性，需要进行线程同步，如使用互斥锁、信号量等。线程同步会导致线程阻塞，等待其他线程释放资源，这也会影响性能</p><p>4、资源竞争：多线程可能会竞争同一资源，导致资源的使用效率降低</p><p>5、内存使用：每个线程都需要一定的内存空间来存储线程的状态（如栈、寄存器值等），如果线程数量过多，会占用大量的内存资源</p><p>6、硬件和操作系统的限制：硬件和操作系统对线程的数量和使用都有一定的限制，超过这些限制，性能会下降。</p>',68),t=[r];function p(d,s,n,h,c,u){return e(),i("div",null,t)}const V=l(o,[["render",p]]);export{M as __pageData,V as default};