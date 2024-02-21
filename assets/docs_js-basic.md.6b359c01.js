import{_ as s,S as n,N as a,Q as l}from"./chunks/framework.d2ce16e8.js";const A=JSON.parse('{"title":"js 基础","description":"","frontmatter":{"outline":"deep"},"headers":[],"relativePath":"docs/js-basic.md","filePath":"docs/js-basic.md","lastUpdated":1708540145000}'),p={name:"docs/js-basic.md"},o=l(`<h1 id="js-基础" tabindex="-1">js 基础 <a class="header-anchor" href="#js-基础" aria-label="Permalink to &quot;js 基础&quot;">​</a></h1><h2 id="核心知识" tabindex="-1">核心知识 <a class="header-anchor" href="#核心知识" aria-label="Permalink to &quot;核心知识&quot;">​</a></h2><h3 id="原型、原型链" tabindex="-1">原型、原型链 <a class="header-anchor" href="#原型、原型链" aria-label="Permalink to &quot;原型、原型链&quot;">​</a></h3><p>1、**prototype **和 <code>__proto__</code></p><p>每个函数都有一个 <code>prototype</code> 属性，它是函数在创建时由 js 引擎添加到函数上的，它的指向是一个对象，被称为<strong>原型对象</strong>或<strong>原型</strong>。</p><p>原型对象上包含了可以由该构造函数的所有实例共享的属性和方法。</p><p>对象包含一个 <code>[[Prototype]]</code> 属性（浏览器中通过<code>__proto__</code>可以访问，通过<code>Object.getPrototypeOf() </code>方法可以获取），它的指向是创建这个对象的构造函数的 <code>prototype</code>。</p><p>所以说，<code>obj.__proto__ === test.prototype</code></p><p>2、<strong>原型链</strong></p><p>因为对象的<code>__proto__</code>属性指向了“原型”对象，而这个“原型”对象又指向它自己的“原型”对象，这样递归下去，就形成了一个原型链。</p><p>原型链是 js 中一种实现继承的机制。当你访问一个对象的属性时，如果对象自身没有这个属性，那么就会沿着原型链查找这个属性，直到找到为止或者到达原型链的末尾。</p><p>所以说，原型对象上的属性和方法可以由该函数的所有实例共享。</p><p>原型链的终点是null。</p><p>3、<strong>函数与对象的关系</strong></p><p>函数是一种特殊的对象，它有一个特殊的功能，就是可以被调用（执行）。当一个函数被用作构造函数来创建对象时，这个函数就被称为构造函数。</p><p>在 js 中，所有的对象都是由函数创建的：</p><ul><li>实例对象通过 new 关键字显式调用构造函数来创建</li><li>字面量对象虽然没有显示的调用构造函数，实际上也是 js 解释器通过<code> let xx=new Object()</code> 来创建的</li></ul><p>4、<strong>构造函数与普通函数</strong></p><p>在写法上：</p><ul><li>构造函数通常以大写字母开头，以区别于普通函数</li><li>构建函数使用 new 关键字来创建新的对象实例</li></ul><p>使用目的上：</p><ul><li>构造函数主要用于创建和初始化一个对象</li><li>普通函数通常用于执行特定的任务或计算并返回结果</li></ul><br><h3 id="new操作符的实现过程" tabindex="-1"><code>new</code>操作符的实现过程 <a class="header-anchor" href="#new操作符的实现过程" aria-label="Permalink to &quot;\`new\`操作符的实现过程&quot;">​</a></h3><ol><li>在当前函数作用域内在中创建一个新的空对象，即<code>{}</code></li><li>为这个对象添加<code>__proto__</code>属性，让它指向构造函数的原型对象，并为原型对象指定constructor属性，指向构造函数</li><li>调用<code>apply</code>或<code>call</code>方法，切换上下文，执行构造函数方法，为对象添加其他属性</li><li>返回这个对象，</li></ol><div class="language-js"><button title="Copy Code" class="copy"></button><span class="lang">js</span><pre class="shiki material-theme-palenight"><code><span class="line"><span style="color:#676E95;font-style:italic;">//Fun为构造函数, args表示传参</span></span>
<span class="line"><span style="color:#C792EA;">function</span><span style="color:#BABED8;"> </span><span style="color:#82AAFF;">myNew</span><span style="color:#89DDFF;">(</span><span style="color:#BABED8;font-style:italic;">Fun</span><span style="color:#89DDFF;">,</span><span style="color:#BABED8;"> </span><span style="color:#89DDFF;">...</span><span style="color:#BABED8;font-style:italic;">args</span><span style="color:#89DDFF;">)</span><span style="color:#BABED8;"> </span><span style="color:#89DDFF;">{</span></span>
<span class="line"><span style="color:#89DDFF;">    </span><span style="color:#676E95;font-style:italic;">// 1.在内存中创建一个新对象</span></span>
<span class="line"><span style="color:#F07178;">    </span><span style="color:#C792EA;">let</span><span style="color:#F07178;"> </span><span style="color:#BABED8;">obj</span><span style="color:#F07178;"> </span><span style="color:#89DDFF;">=</span><span style="color:#F07178;"> </span><span style="color:#89DDFF;">{};</span></span>
<span class="line"><span style="color:#F07178;">    </span></span>
<span class="line"><span style="color:#89DDFF;">    </span><span style="color:#676E95;font-style:italic;">// 2.把新对象的原型指针指向构造函数的原型属性</span></span>
<span class="line"><span style="color:#F07178;">    </span><span style="color:#BABED8;">obj</span><span style="color:#89DDFF;">.</span><span style="color:#BABED8;">__proto__</span><span style="color:#F07178;"> </span><span style="color:#89DDFF;">=</span><span style="color:#F07178;"> </span><span style="color:#FFCB6B;">Fun</span><span style="color:#89DDFF;">.</span><span style="color:#BABED8;">prototype</span><span style="color:#89DDFF;">;</span></span>
<span class="line"><span style="color:#F07178;">    </span></span>
<span class="line"><span style="color:#89DDFF;">    </span><span style="color:#676E95;font-style:italic;">// 3.改变this指向，并且执行构造函数内部的代码（传参）</span></span>
<span class="line"><span style="color:#F07178;">    </span><span style="color:#C792EA;">let</span><span style="color:#F07178;"> </span><span style="color:#BABED8;">res</span><span style="color:#F07178;"> </span><span style="color:#89DDFF;">=</span><span style="color:#F07178;"> </span><span style="color:#BABED8;">Fun</span><span style="color:#89DDFF;">.</span><span style="color:#82AAFF;">apply</span><span style="color:#F07178;">(</span><span style="color:#BABED8;">obj</span><span style="color:#89DDFF;">,</span><span style="color:#F07178;"> </span><span style="color:#BABED8;">args</span><span style="color:#F07178;">)</span><span style="color:#89DDFF;">;</span></span>
<span class="line"><span style="color:#F07178;">    </span></span>
<span class="line"><span style="color:#89DDFF;">    </span><span style="color:#676E95;font-style:italic;">// 4.判断函数执行结果的类型</span></span>
<span class="line"><span style="color:#F07178;">    </span><span style="color:#89DDFF;font-style:italic;">if</span><span style="color:#F07178;"> (</span><span style="color:#BABED8;">res</span><span style="color:#F07178;"> </span><span style="color:#89DDFF;">instanceof</span><span style="color:#F07178;"> </span><span style="color:#FFCB6B;">Object</span><span style="color:#F07178;">) </span><span style="color:#89DDFF;">{</span></span>
<span class="line"><span style="color:#F07178;">        </span><span style="color:#89DDFF;font-style:italic;">return</span><span style="color:#F07178;"> </span><span style="color:#BABED8;">res</span><span style="color:#89DDFF;">;</span></span>
<span class="line"><span style="color:#F07178;">    </span><span style="color:#89DDFF;">}</span><span style="color:#F07178;"> </span><span style="color:#89DDFF;font-style:italic;">else</span><span style="color:#F07178;"> </span><span style="color:#89DDFF;">{</span></span>
<span class="line"><span style="color:#F07178;">        </span><span style="color:#89DDFF;font-style:italic;">return</span><span style="color:#F07178;"> </span><span style="color:#BABED8;">obj</span><span style="color:#89DDFF;">;</span></span>
<span class="line"><span style="color:#F07178;">    </span><span style="color:#89DDFF;">}</span></span>
<span class="line"><span style="color:#89DDFF;">}</span></span>
<span class="line"></span>
<span class="line"><span style="color:#C792EA;">function</span><span style="color:#BABED8;"> </span><span style="color:#82AAFF;">One</span><span style="color:#89DDFF;">(</span><span style="color:#BABED8;font-style:italic;">name</span><span style="color:#89DDFF;">,</span><span style="color:#BABED8;"> </span><span style="color:#BABED8;font-style:italic;">age</span><span style="color:#89DDFF;">)</span><span style="color:#BABED8;"> </span><span style="color:#89DDFF;">{</span></span>
<span class="line"><span style="color:#F07178;">    </span><span style="color:#89DDFF;">this.</span><span style="color:#BABED8;">name</span><span style="color:#F07178;"> </span><span style="color:#89DDFF;">=</span><span style="color:#F07178;"> </span><span style="color:#BABED8;">name</span><span style="color:#89DDFF;">;</span></span>
<span class="line"><span style="color:#F07178;">    </span><span style="color:#89DDFF;">this.</span><span style="color:#BABED8;">age</span><span style="color:#F07178;"> </span><span style="color:#89DDFF;">=</span><span style="color:#F07178;"> </span><span style="color:#BABED8;">age</span><span style="color:#89DDFF;">;</span></span>
<span class="line"><span style="color:#89DDFF;">}</span></span>
<span class="line"><span style="color:#C792EA;">let</span><span style="color:#BABED8;"> a </span><span style="color:#89DDFF;">=</span><span style="color:#BABED8;"> </span><span style="color:#89DDFF;">new</span><span style="color:#BABED8;"> </span><span style="color:#82AAFF;">One</span><span style="color:#BABED8;">()</span><span style="color:#89DDFF;">;</span></span>
<span class="line"><span style="color:#BABED8;">console</span><span style="color:#89DDFF;">.</span><span style="color:#82AAFF;">log</span><span style="color:#BABED8;">(a)</span><span style="color:#89DDFF;">;</span></span>
<span class="line"></span>
<span class="line"></span>
<span class="line"><span style="color:#C792EA;">let</span><span style="color:#BABED8;"> obj </span><span style="color:#89DDFF;">=</span><span style="color:#BABED8;"> </span><span style="color:#82AAFF;">myNew</span><span style="color:#BABED8;">(One</span><span style="color:#89DDFF;">,</span><span style="color:#BABED8;"> </span><span style="color:#89DDFF;">&quot;</span><span style="color:#C3E88D;">XiaoMing</span><span style="color:#89DDFF;">&quot;</span><span style="color:#89DDFF;">,</span><span style="color:#BABED8;"> </span><span style="color:#89DDFF;">&quot;</span><span style="color:#C3E88D;">18</span><span style="color:#89DDFF;">&quot;</span><span style="color:#BABED8;">)</span><span style="color:#89DDFF;">;</span></span>
<span class="line"><span style="color:#BABED8;">console</span><span style="color:#89DDFF;">.</span><span style="color:#82AAFF;">log</span><span style="color:#BABED8;">(</span><span style="color:#89DDFF;">&quot;</span><span style="color:#C3E88D;">newObj:</span><span style="color:#89DDFF;">&quot;</span><span style="color:#89DDFF;">,</span><span style="color:#BABED8;"> obj)</span><span style="color:#89DDFF;">;</span></span></code></pre></div><h3 id="this" tabindex="-1">this <a class="header-anchor" href="#this" aria-label="Permalink to &quot;this&quot;">​</a></h3><p>this 并不是一个好的设计，它会随着作用域不同而变化。</p><p>this代表函数调用相关联的对象，通常叫做函数上下文</p><p>1、函数调用模式</p><p>在全局作用域或函数外部使用this，它指向全局对象。非严格模式下指向全局对象（在浏览器中，全局对象是window，在 nodejs 中，全局对象是 global），严格模式下是undefined</p><div class="language-js"><button title="Copy Code" class="copy"></button><span class="lang">js</span><pre class="shiki material-theme-palenight"><code><span class="line"><span style="color:#BABED8;">console</span><span style="color:#89DDFF;">.</span><span style="color:#82AAFF;">log</span><span style="color:#BABED8;">(</span><span style="color:#89DDFF;">this</span><span style="color:#BABED8;">)</span><span style="color:#89DDFF;">;</span><span style="color:#BABED8;"> </span><span style="color:#676E95;font-style:italic;">// window</span></span></code></pre></div><p>2、方法调用时</p><p>在函数内部使用this，它的值取决于函数如何被调用。如果函数是作为一个方法被调用的，那么this就指向调用该方法的对象</p><div class="language-js"><button title="Copy Code" class="copy"></button><span class="lang">js</span><pre class="shiki material-theme-palenight"><code><span class="line"><span style="color:#C792EA;">let</span><span style="color:#BABED8;"> obj </span><span style="color:#89DDFF;">=</span><span style="color:#BABED8;"> </span><span style="color:#89DDFF;">{</span></span>
<span class="line"><span style="color:#BABED8;">  </span><span style="color:#F07178;">name</span><span style="color:#89DDFF;">:</span><span style="color:#BABED8;"> </span><span style="color:#89DDFF;">&#39;</span><span style="color:#C3E88D;">John</span><span style="color:#89DDFF;">&#39;</span><span style="color:#89DDFF;">,</span></span>
<span class="line"><span style="color:#BABED8;">  </span><span style="color:#82AAFF;">sayHello</span><span style="color:#89DDFF;">:</span><span style="color:#BABED8;"> </span><span style="color:#C792EA;">function</span><span style="color:#89DDFF;">()</span><span style="color:#BABED8;"> </span><span style="color:#89DDFF;">{</span></span>
<span class="line"><span style="color:#F07178;">    </span><span style="color:#BABED8;">console</span><span style="color:#89DDFF;">.</span><span style="color:#82AAFF;">log</span><span style="color:#F07178;">(</span><span style="color:#89DDFF;">&#39;</span><span style="color:#C3E88D;">Hello, </span><span style="color:#89DDFF;">&#39;</span><span style="color:#F07178;"> </span><span style="color:#89DDFF;">+</span><span style="color:#F07178;"> </span><span style="color:#89DDFF;">this.</span><span style="color:#BABED8;">name</span><span style="color:#F07178;">)</span><span style="color:#89DDFF;">;</span></span>
<span class="line"><span style="color:#F07178;">  </span><span style="color:#89DDFF;">}</span></span>
<span class="line"><span style="color:#89DDFF;">};</span></span>
<span class="line"></span>
<span class="line"><span style="color:#BABED8;">obj</span><span style="color:#89DDFF;">.</span><span style="color:#82AAFF;">sayHello</span><span style="color:#BABED8;">()</span><span style="color:#89DDFF;">;</span><span style="color:#BABED8;"> </span><span style="color:#676E95;font-style:italic;">// Hello, John</span></span></code></pre></div><p>在这个例子中，sayHello方法内的this指向obj对象。</p><p>3、构造器调用模式</p><p>在构造函数中使用this，它指向新创建的对象实例。</p><div class="language-js"><button title="Copy Code" class="copy"></button><span class="lang">js</span><pre class="shiki material-theme-palenight"><code><span class="line"><span style="color:#C792EA;">function</span><span style="color:#BABED8;"> </span><span style="color:#82AAFF;">Person</span><span style="color:#89DDFF;">(</span><span style="color:#BABED8;font-style:italic;">name</span><span style="color:#89DDFF;">)</span><span style="color:#BABED8;"> </span><span style="color:#89DDFF;">{</span></span>
<span class="line"><span style="color:#F07178;">  </span><span style="color:#89DDFF;">this.</span><span style="color:#BABED8;">name</span><span style="color:#F07178;"> </span><span style="color:#89DDFF;">=</span><span style="color:#F07178;"> </span><span style="color:#BABED8;">name</span><span style="color:#89DDFF;">;</span></span>
<span class="line"><span style="color:#89DDFF;">}</span></span>
<span class="line"></span>
<span class="line"><span style="color:#C792EA;">let</span><span style="color:#BABED8;"> john </span><span style="color:#89DDFF;">=</span><span style="color:#BABED8;"> </span><span style="color:#89DDFF;">new</span><span style="color:#BABED8;"> </span><span style="color:#82AAFF;">Person</span><span style="color:#BABED8;">(</span><span style="color:#89DDFF;">&#39;</span><span style="color:#C3E88D;">John</span><span style="color:#89DDFF;">&#39;</span><span style="color:#BABED8;">)</span><span style="color:#89DDFF;">;</span></span>
<span class="line"><span style="color:#BABED8;">console</span><span style="color:#89DDFF;">.</span><span style="color:#82AAFF;">log</span><span style="color:#BABED8;">(john</span><span style="color:#89DDFF;">.</span><span style="color:#BABED8;">name)</span><span style="color:#89DDFF;">;</span><span style="color:#BABED8;"> </span><span style="color:#676E95;font-style:italic;">// John</span></span></code></pre></div><p>在这个例子中，Person构造函数中的this指向新创建的对象john。</p><p>4、apply/call/bind 调用模式</p><p>当函数使用call、apply或bind方法被调用时，this指向传递给这些方法的第一个参数</p><div class="language-js"><button title="Copy Code" class="copy"></button><span class="lang">js</span><pre class="shiki material-theme-palenight"><code><span class="line"><span style="color:#C792EA;">function</span><span style="color:#BABED8;"> </span><span style="color:#82AAFF;">sayHello</span><span style="color:#89DDFF;">()</span><span style="color:#BABED8;"> </span><span style="color:#89DDFF;">{</span></span>
<span class="line"><span style="color:#F07178;">  </span><span style="color:#BABED8;">console</span><span style="color:#89DDFF;">.</span><span style="color:#82AAFF;">log</span><span style="color:#F07178;">(</span><span style="color:#89DDFF;">&#39;</span><span style="color:#C3E88D;">Hello, </span><span style="color:#89DDFF;">&#39;</span><span style="color:#F07178;"> </span><span style="color:#89DDFF;">+</span><span style="color:#F07178;"> </span><span style="color:#89DDFF;">this.</span><span style="color:#BABED8;">name</span><span style="color:#F07178;">)</span><span style="color:#89DDFF;">;</span></span>
<span class="line"><span style="color:#89DDFF;">}</span></span>
<span class="line"></span>
<span class="line"><span style="color:#C792EA;">let</span><span style="color:#BABED8;"> john </span><span style="color:#89DDFF;">=</span><span style="color:#BABED8;"> </span><span style="color:#89DDFF;">{</span><span style="color:#BABED8;"> </span><span style="color:#F07178;">name</span><span style="color:#89DDFF;">:</span><span style="color:#BABED8;"> </span><span style="color:#89DDFF;">&#39;</span><span style="color:#C3E88D;">John</span><span style="color:#89DDFF;">&#39;</span><span style="color:#BABED8;"> </span><span style="color:#89DDFF;">};</span></span>
<span class="line"><span style="color:#C792EA;">let</span><span style="color:#BABED8;"> jane </span><span style="color:#89DDFF;">=</span><span style="color:#BABED8;"> </span><span style="color:#89DDFF;">{</span><span style="color:#BABED8;"> </span><span style="color:#F07178;">name</span><span style="color:#89DDFF;">:</span><span style="color:#BABED8;"> </span><span style="color:#89DDFF;">&#39;</span><span style="color:#C3E88D;">Jane</span><span style="color:#89DDFF;">&#39;</span><span style="color:#BABED8;"> </span><span style="color:#89DDFF;">};</span></span>
<span class="line"></span>
<span class="line"><span style="color:#BABED8;">sayHello</span><span style="color:#89DDFF;">.</span><span style="color:#82AAFF;">call</span><span style="color:#BABED8;">(john)</span><span style="color:#89DDFF;">;</span><span style="color:#BABED8;"> </span><span style="color:#676E95;font-style:italic;">// Hello, John</span></span>
<span class="line"><span style="color:#BABED8;">sayHello</span><span style="color:#89DDFF;">.</span><span style="color:#82AAFF;">call</span><span style="color:#BABED8;">(jane)</span><span style="color:#89DDFF;">;</span><span style="color:#BABED8;"> </span><span style="color:#676E95;font-style:italic;">// Hello, Jane</span></span></code></pre></div><p>在这个例子中，sayHello函数中的this分别指向john和jane对象。</p><p>5、箭头函数中</p><p>箭头函数中使用this，指向定义函数时的父级作用域的 this，且无法被改变</p><div class="language-js"><button title="Copy Code" class="copy"></button><span class="lang">js</span><pre class="shiki material-theme-palenight"><code><span class="line"><span style="color:#C792EA;">let</span><span style="color:#BABED8;"> obj </span><span style="color:#89DDFF;">=</span><span style="color:#BABED8;"> </span><span style="color:#89DDFF;">{</span></span>
<span class="line"><span style="color:#BABED8;">  </span><span style="color:#F07178;">name</span><span style="color:#89DDFF;">:</span><span style="color:#BABED8;"> </span><span style="color:#89DDFF;">&#39;</span><span style="color:#C3E88D;">John</span><span style="color:#89DDFF;">&#39;</span><span style="color:#89DDFF;">,</span></span>
<span class="line"><span style="color:#BABED8;">  </span><span style="color:#82AAFF;">sayHello</span><span style="color:#89DDFF;">:</span><span style="color:#BABED8;"> </span><span style="color:#C792EA;">function</span><span style="color:#89DDFF;">()</span><span style="color:#BABED8;"> </span><span style="color:#89DDFF;">{</span></span>
<span class="line"><span style="color:#F07178;">    </span><span style="color:#82AAFF;">setTimeout</span><span style="color:#F07178;">(</span><span style="color:#89DDFF;">()</span><span style="color:#F07178;"> </span><span style="color:#C792EA;">=&gt;</span><span style="color:#F07178;"> </span><span style="color:#89DDFF;">{</span></span>
<span class="line"><span style="color:#F07178;">      </span><span style="color:#BABED8;">console</span><span style="color:#89DDFF;">.</span><span style="color:#82AAFF;">log</span><span style="color:#F07178;">(</span><span style="color:#89DDFF;">&#39;</span><span style="color:#C3E88D;">Hello, </span><span style="color:#89DDFF;">&#39;</span><span style="color:#F07178;"> </span><span style="color:#89DDFF;">+</span><span style="color:#F07178;"> </span><span style="color:#89DDFF;">this.</span><span style="color:#BABED8;">name</span><span style="color:#F07178;">)</span><span style="color:#89DDFF;">;</span></span>
<span class="line"><span style="color:#F07178;">    </span><span style="color:#89DDFF;">},</span><span style="color:#F07178;"> </span><span style="color:#F78C6C;">1000</span><span style="color:#F07178;">)</span><span style="color:#89DDFF;">;</span></span>
<span class="line"><span style="color:#F07178;">  </span><span style="color:#89DDFF;">}</span></span>
<span class="line"><span style="color:#89DDFF;">};</span></span>
<span class="line"></span>
<span class="line"><span style="color:#BABED8;">obj</span><span style="color:#89DDFF;">.</span><span style="color:#82AAFF;">sayHello</span><span style="color:#BABED8;">()</span><span style="color:#89DDFF;">;</span><span style="color:#BABED8;"> </span><span style="color:#676E95;font-style:italic;">// Hello, John</span></span></code></pre></div><p>优先级：</p><p>构造器调用 &gt; apply/call/bind &gt; 方法调用 &gt; 函数调用</p><h2 id="js-内存管理" tabindex="-1">js 内存管理 <a class="header-anchor" href="#js-内存管理" aria-label="Permalink to &quot;js 内存管理&quot;">​</a></h2><h3 id="堆和栈" tabindex="-1">堆和栈 <a class="header-anchor" href="#堆和栈" aria-label="Permalink to &quot;堆和栈&quot;">​</a></h3><p>堆和栈的概念存在于数据结构和操作系统中，js中常说的是针对操作系统。</p><p>在数据结构中：</p><ul><li>栈中数据先进后出（像个有底的桶）</li><li>堆是一个优先队列，按优先级来排序，可以按大小来规定</li></ul><p>在操作系统中，内存分为栈区和堆区：</p><ul><li>栈区内存由编译器自动分配释放，存放函数的参数值，局部变量的值等。其操作方式类似于数据结构中的栈</li><li>堆区内存一般由开发者分配释放，若不释放，则由垃圾回收机制回收</li></ul>`,56),e=[o];function t(c,r,y,F,D,i){return n(),a("div",null,e)}const E=s(p,[["render",t]]);export{A as __pageData,E as default};
