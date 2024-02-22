---
outline: deep
---



## Webpack

### 什么是webpack

一个打包模块化js的工具，专注于构建模块化项目。通过loader转换文件，通过plugin注入钩子，最后输出由多个模块组合成的文件。

优点：

- 专注于处理模块化的项目，开箱即用，
- 通过plugin扩展，完整好用又灵活
- 通过loader扩展，可以解析打包所有类型的文件
- 社区活跃

构建流程：

1. 初始化参数：从配置文件读取、合并参数
2. 开始编译：用上一步的参数初始化Complier对象，加载所有配置的插件
3. 确定入口：根据配置中的entry找到入口文件
4. 编译模块：从入口文件出发，调用所有配置的loader对模块进行翻译，找到模块的依赖，再不断递归，直到找到所有依赖的文件
5. 完成模块编译：从上一步得到模块内容以及它们之间的依赖关系
6. 输出资源：根据入口和模块之间的依赖关系，组装与一个个包含多个模块的chunk，再把每个chunk转换成单独的文件加入到输出列表
7. 输出完成：在确定好输出内容后，根据配置确定输出的路径和文件名，最终写入到文件系统



### 如何提高 webpack 构建速度

1. 多⼊⼝情况下，使⽤ CommonsChunkPlugin 来提取公共代码 
2. 通过 externals 配置来提取常⽤库 
3. 利⽤ DllPlugin 和 DllReferencePlugin 预编译资源模块 通过 DllPlugin 来对那些我们引⽤但是绝对不会修改的 npm 包来进⾏预编译，再通过 DllReferencePlugin 将预编译的模块加载进来。 
4. 使⽤ Happypack 实现多线程加速编译 
5. 使⽤ webpack-uglify-parallel 来提升 uglifyPlugin 的压缩速度。原理上 webpack-uglify-parallel 采⽤了多核并⾏压缩来提升压缩速度 
6. 使⽤ Tree-shaking 和 Scope Hoisting 来剔除多余代码



### webpack 如何优化前端性能

⽤webpack 优化前端性能是指优化 webpack 的输出结果，让打包的最终结果在浏览器运⾏快速⾼效。

- 压缩代码：删除多余的代码、注释、简化代码的写法等等⽅式。可以利⽤webpack的 UglifyJsPlugin 和 ParallelUglifyPlugin 来压缩 JS⽂件， 利⽤ cssnano （css-loader?minimize）来压缩 css 
- 利⽤CDN 加速: 在构建过程中，将引⽤的静态资源路径修改为 CDN 上对应的路径。可以利⽤webpack 对于 output 参数和各 loader 的 publicPath 参数来修改资源路径 
- Tree Shaking: 将代码中永远不会⾛到的⽚段删除掉。可以通过在启动 webpack 时追加参数 --optimize-minimize 来实现 Code Splitting: 将代码按路由维度或者组件分块(chunk),这样做到按需加载，同时可以充分利⽤浏览器缓存 
- 提取公共第三⽅库: SplitChunksPlugin 插件来进⾏公共模块抽取，利⽤浏览器缓存可以⻓期缓存这些⽆需频繁变动的公共代码



### webpack热更新原理

Hot Moudle Replacement，缩写HMR，又叫热替换，这个机制可以在运行时更新各种模块，而无需刷新浏览器。

Webpack 热更新的原理主要包括以下几个步骤：

1、当源代码发生变化时，Webpack 会重新编译修改的模块，然后生成一个新的模块版本

2、Webpack 通过 WebSocket 通信，将新生成的模块哈希值发送给客户端

3、客户端接收到新的模块哈希值后，向服务器发送 Ajax 请求，获取到具体的改动内容（这个过程称为热更新的 JSON）

4、客户端根据获取到的热更新的 JSON，用新的模块替换旧的模块

5、如果替换模块失败，或者新的模块无法处理更新，那么会触发整个页面的刷新。

这个过程中，Webpack Dev Server 和 HMR 插件起到了关键作用。Webpack Dev Server 为文件提供了一个简单的 web 服务器，并且能够实时重新加载。HMR 插件会在运行时替换、添加或删除模块，而无需重新加载整个页面。

核心是客户端从服务端拉取更新后的文件，准确的说是chunk需要更新的部分。实际上是服务端与浏览器之间维护了一个websocket，当本地资源改变时，会向浏览器推送更新，并带上构建时的hash，让客户端与上一次资源进行对比。如果存在差异，会向服务端发起请求来获取更新的内容，这样客户端就可以借助这些信息获取chunk的增量更新。



### bundle、chunk、module 是什么

bundle：是由 webpack 打包出来的⽂件； 

chunk：代码块，⼀个 chunk 由多个模块组合⽽成，⽤于代码的合并和分割； 

module：是开发中的单个模块，在 webpack 的世界，⼀切皆模块，一个模块对应⼀个⽂件，webpack 会从配置的 entry 中递归开始找出所有依赖的模块



### webpack 中 loader 和 plugin 的不同

**不同的作⽤** 

Loader 翻译为**"加载器"**。Webpack 将⼀切⽂件视为模块，但是默认只能解析 js、json⽂件，如果想解析并打包其他类型的模块，就需要使用loader进行加载和解析。 所以 Loader 的作⽤是**让 webpack 拥有了加载和解析⾮ JavaScript⽂件的能⼒**。 

Plugin 翻译为"插件"，主要是用来**扩展 webpack 的功能**，让它具有更多的灵活性。在 Webpack 运⾏的⽣命周期中会⼴播出许多事件，Plugin 可以监听这些事件，在合适的时机通过 Webpack 提供的 API 改变输出结果。 

**不同的⽤法**

Loader 在 module.rules 中配置，也就是说他作为模块的解析规则⽽存在。 类型为数组，每⼀项都是⼀个 Object ，⾥⾯描述了对于什么类型的⽂件（ test ），使⽤什么加载( loader )和使⽤的参数 （ options ） 

Plugin在 plugins 中单独配置。类型为数组，每⼀项是⼀个 plugin 的实例，参数都通过构造函数传⼊。 



### webpack 常见的 loader

file-loader：把⽂件输出到⼀个⽂件夹中，在代码中通过相对 URL 去引⽤输出的⽂件 

url-loader：和 file-loader 类似，但是能在⽂件很⼩的情况下以 base64 的⽅式把⽂件内容注⼊到代码中去 

source-map-loader：加载额外的 Source Map ⽂件，以⽅便断点调试

image-loader：加载并且压缩图⽚⽂件 

babel-loader：把 ES6 转换成 ES5 

css-loader：加载 CSS，⽀持模块化、压缩、⽂件导⼊等特性 

style-loader：把 CSS 代码注⼊到 JavaScript 中，通过 DOM 操作去加载 CSS。 

eslint-loader：通过 ESLint 检查 JavaScript 代码 

**注意**：在 Webpack 中，loader 的执行顺序是从右向左执行的。因为 

webpack 选择了 compose 这样的函数式编程方式，这种方式的表达式执行是从右向左的。 



### webpack 常见的 plugin

define-plugin：定义环境变量 

html-webpack-plugin：简化 html⽂件创建

uglifyjs-webpack-plugin：通过 UglifyES 压缩 ES6 代码 

webpack-parallel-uglify-plugin: 多核压缩，提⾼压缩速度 

webpack-bundle-analyzer: 可视化 webpack 输出⽂件的体积 

mini-css-extract-plugin: CSS 提取到单独的⽂件中，⽀持按需加载



### webpack 与 grunt、gulp 的不同？

Grunt、Gulp 是基于任务运⾏的⼯具： 它们会⾃动执⾏指定的任务，就像流⽔线，把资源放上去然后通过不同插件进⾏加⼯，它们包含活 跃的社区，丰富的插件，能⽅便的打造各种⼯作流。 

Webpack 是基于模块化打包的⼯具：⾃动化处理模块，webpack 把⼀切当成模块，当 webpack 处理应⽤程序时，它会递归地构建⼀个依 赖关系图 (dependency graph)，其中包含应⽤程序需要的每个模块，然后将所有这些模块打包成⼀个或多个 bundle。 

因此这是完全不同的两类⼯具，⽽现在主流的⽅式是⽤npm script 代 替 Grunt、Gulp，npm script 同样可以打造任务流



### 代码分割

Webpack 的代码分割（Code Splitting）是一种优化技术，它可以将一个大的代码包分割成多个小的包，这样可以减少初始加载时间，提高应用的性能

Webpack 的代码分割的原理主要包括以下几个步骤：

1、在代码中，使用特定的语法（如 import() 或 require.ensure()）标记出需要分割的模块

2、当 Webpack 打包时，它会识别出这些语法，并将相关的模块打包成一个单独的代码包（也被称为 chunk）

3、在加载应用时，主代码包会首先被加载。当需要使用到分割出来的模块时，会异步地加载对应的代码包。

4、当代码包被加载后，模块会被执行并提供给主代码使用。

在 Webpack 中，代码分割可以通过两种方式来实现：

- 一种是使用 `import()` 语法，推荐的方式，因为它是 ECMAScript 的标准，并且可以和 async/await 一起使用
- 一种是使用 `require.ensure()`



### webpack、rollup、parcel 优劣

webpack 适⽤于⼤型复杂的前端站点构建。webpack 有强⼤的 loader 和插件⽣态，打包后的⽂件实际上就是⼀个⽴即执⾏函数，这个⽴即执⾏函数接收⼀个参数，这个参数是模块对象，键为各个模块的路径，值为模块内容。⽴即执⾏函数内部则处理模块之间的引⽤，执⾏模块等,这种情况更适合⽂件依赖复杂的应⽤开发。

rollup 适⽤于基础库的打包，如 vue、d3 等。Rollup 就是将各个模块打包进⼀个⽂件中，并且通过 Tree-shaking 来删除⽆⽤的代码，可以最⼤程度上降低代码体积，但是rollup没有webpack如此多的的如代码分割、按需加载等⾼级功能，其更聚焦于库的打包，因此更适合库的开发。

parcel 适⽤于简单的实验性项⽬。他可以满⾜低⻔槛的快速看到效果，但是⽣态差、报错信息不够全⾯都是他的硬伤，除了⼀些玩具项⽬或者实验项⽬不建议使⽤。



### vue-loader

是webpack的加载器模块，专门用来解析.vue文件，允许webpack提取和处理模板、脚本、样式，还允许把静态资源视为模块依赖性。







## Babel

### Babel 的原理是什么

babel 的转译过程也分为三个阶段，这三步具体是： 

- 解析 Parse: 将代码解析⽣成抽象语法树（AST），即词法分析与语法分析的过程； 
- 转换 Transform: 对于 AST 进⾏变换⼀系列的操作，babel 接受得到 AST 并通过 babel-traverse 对其进⾏遍历，在此过程中进⾏添 加、更新及移除等操作；
- ⽣成 Generate: 将变换后的 AST 再转换为 JS 代码, 使⽤到的模块是 babel-generator。 



## Git

### git pull 和 git fetch 的区别

git fetch 只是将远程仓库的变化下载下来，并没有和本地分支合并。 

git pull 会将远程仓库的变化下载下来，并和当前分支合并。



### git rebase 和 git merge 的区别

都是用于分支合并，关键在 commit 记录的处理上不同： 

git merge 会新建一个新的 commit 对象，然后两个分支以前的 commit 记录都指向这个新 commit 记录。这种方法会保留之前每个分支的 commit 历史。 

git rebase 会先找到两个分支的第一个共同的 commit 祖先记录，然后将提取当前分支这之后的所有 commit 记录，然后将这个 commit 记录添加到目标分支的最新提交后面。经过这个合并后，两个分支合并后的 commit 记录就变为了线性的记录了。



## Vite



