---
outline: deep
---



# js数据类型



## 数据类型

### 基本数据类型

Undefined、Null、Boolean、Number、String、Object，Symbol（ES6新增），BigInt（ES2020新增）

### 引用数据类型

Object，Array（特殊的对象），Function（可调用的对象），

其他：Map、Set、WeakMap、WeakSe、Date、RegExp，

以及Promise等其他内置对象



### 基本/引用数据类型的区别

1、基本数据类型的值是不可变的，当操作一个基本数据类型的变量时，实际上是在操作这个变量的副本，而不是原始值

```js
let a = 1;
let b = a;
b = 2;
console.log(a); // 1
console.log(b); // 2
```

对引用数据类型的变量的操作，实际上是操作这个变量的引用

2、存储位置和赋值方式：

- 基本数据类型的值存储在栈（stack）内存中，占用空间小、大小固定、属于频繁使用的数据
- 引用数据类型存储在堆（heap）内存中，占据空间大，大小不固定。在栈中存储了指针，指向堆内存地址



### NaN

`typeof NaN`返回number，但是它不等于自己

`isNaN`方法会尝试将参数转换为数值，任何不能被转换为数值的值都返回true，因此非数字值也会返回true，影响判断

`Number.isNaN()`函数会先判断参数是否为数字，不会对参数进行转换，对于NaN的判断更准确



### 为什么 typeof null === object

在JavaScript的最初版本中，使用的是32位系统，为了性能考虑使用低位存储了变量的类型信息，000开头代表是对象，而null表示为全零，所以导致typeof null返回的是object。

虽然这是一个已知的错误，但由于这个错误已经被JavaScript广泛采用，修复它可能会导致一些现有的JavaScript代码无法工作



### null 与 undefined 的区别

undefined

- 表示未定义，就是变量声明了，但还未赋值。
- 它不是一个保留字，可以用作变量名，一般不建议这么做，如果想获得一个undefined值，可使用`void 0`这种方式

null

- 表示空值，一般用来做为可能返回对象的变量的初始化值。null在使用typeof进行判断时会返回"object"



### 包装类型

基本数据类型（Number、String、Boolean）都有对应的包装类型，这些包装类型的对象是一种特殊的引用类型，它们在很多情况下表现得像基本数据类型。

当我们对一个基本数据类型的值调用方法时，JavaScript会临时将其转换为对应的包装类型对象，以便我们可以调用对象的方法。调用结束后，再将其转换回基本数据类型

**注意**：虽然基本数据类型有对应的包装类型，但不推荐直接使用包装类型创建对象，可能会引起一些意想不到的结果

```js
let str1 = 'Hello';
let str2 = new String('Hello');

console.log(str1 === str2); // false
```

在这个例子中，str1和str2的值看起来是一样的，但它们的类型不同，str1是基本数据类型，str2是引用数据类型，所以它们的比较结果是false



### 类数组对象

一种拥有length属性和索引元素，但不具有数组原型上的方法（如push，pop）的对象，常见的类数组对象有：

-  `arguments` 对象：它在函数内部可用，用于访问函数的实参
- `document.getElementsByTagName`或`document.querySelectorAll`返回的NodeList对象

它们不能直接调用数组的方法，但可以通过 `Array.prototype` 间接调用：

```js
// 使用Array.prototype上的方法
Array.prototype.push.call(arrayLike, 'd');

// 将类数组对象转换为真正的数组
let array = Array.from(arrayLike);

// 使用扩展运算符转换为数组
let array = [...arrayLike];
```



### Map和Object的区别

- Map默认不包含任何键，只能显式插入键；Object原型链上的键名可能与自定义键名冲突。
- Map的键可以是任意值，包括函数、对象、基本类型；Object的键必须是String或Symbol
- Map中的key是有序的，按插入顺序；Object的键是无序的
- Map有size属性，Object键值个数只能手动计算
- Map可以被直接迭代，Object要以某种方式转换后才能迭代
- Map在频繁增删值的场景下表现更好



### Map 和 WeakMap

都是用于存储键值对的集合，区别在于：

1、键的类型：

- 在Map中，键可以是任何类型，包括对象、基本类型或者null。
- WeakMap中，键必须是对象，不能是基本类型

2、遍历

- Map对象可以被遍历，它是可迭代的
- WeakMap不可以被遍历，因为其键是弱引用，随时可能消失，并且JavaScript引擎有可能随机删除键/值对

3、键值总数

- Map对象有一个size属性，返回映射对象中的键/值对数目
- WeakMap没有size属性，不能计算和获取大小

4、方法

- Map有更多的方法，例如`clear()`和`forEach()`
- WeakMap只有四个方法：`get(), set(), has(), delete()`

5、弱引用

- WeakMap持有的是每个键对象的**“弱引用”**，这意味着在没有其他引用存在时，WeakMap的键是可以被垃圾回收的。这个特性使得WeakMap特别适合创建与对象关联的私有数据
- Map中的键则不会被垃圾回收机制影响。



### WeakMap 应用场景

1、关联额外信息：当我们想在一个对象上关联一些额外的信息，但又不想干扰垃圾回收时，可以使用WeakMap。

例如，我们可以将一个DOM元素作为键，将一些与之相关的信息作为值。当DOM元素被删除时，这些信息也会被自动清理。

```js
let wm = new WeakMap();
let element = document.getElementById('some-element');
wm.set(element, 'some information');
```

2、缓存计算结果：如果我们有一个函数，它接受一个对象作为参数，并返回一些计算结果，我们可以使用WeakMap来缓存这些结果。当相同的对象再次传入时，我们可以直接从WeakMap中获取结果，而不需要重新计算

```js
let wm = new WeakMap();

function compute(obj) {
  if (wm.has(obj)) {
    return wm.get(obj);
  } else {
    let result = /* some expensive computation */;
    wm.set(obj, result);
    return result;
  }
}
```

3、私有属性：在ES6类中，我们可以使用WeakMap来实现私有属性。我们可以将实例对象作为键，将私有属性作为值。由于WeakMap的键是弱引用，所以当实例对象被垃圾回收时，私有属性也会被清理。

```js
let wm = new WeakMap();

class MyClass {
  constructor() {
    wm.set(this, { privateData: 'secret' });
  }

  doSomething() {
    let privateData = wm.get(this).privateData;
    // do something with privateData
  }
}
```

4、在 Vue3 源码中，WeakMap被用于存储与每个组件实例相关的依赖项（deps）和观察者（observers），这些数据在组件实例被销毁时不再需要，因此使用WeakMap可以确保它们被正确地清理

因为WeakMap允许将对象作为键，并且当这个对象被垃圾回收时，对应的值也会被自动清理。这使得WeakMap成为存储与对象生命周期绑定的数据的理想选择

```js
// 创建一个WeakMap来存储私有数据
const privateData = new WeakMap();

// 在组件实例创建时，将私有数据存储在WeakMap中
function createComponentInstance() {
  const instance = {};
  privateData.set(instance, {
    deps: [],
    observers: []
  });
  return instance;
}

// 在组件实例销毁时，私有数据会自动从WeakMap中清理
function destroyComponentInstance(instance) {
  // do some cleanup
  instance = null;
}
```





## 数据类型检测

1、typeof运算符

判断string、number、boolean、undefined、function为预期，array、object、null等被判断为object

2、instanceof 运算符

原理是判断**构造函数的原型（prototype 属性）**是否在**实例对象的原型链上**

**注意**：对于基本类型的检测会返回false，因为基本类型是没有原型链的

```js
console.log([] instanceof Array); // true
console.log({} instanceof Object); // true
console.log('Hello' instanceof String); // false
```

3、constructor 属性

通过访问原型上的constructor属性（它指向对象的构造函数）来判断数据类型

**注意**：如果原型被改写，则不能返回预期结果

```js
console.log((123).constructor === Number); // true
console.log(('Hello').constructor === String); // true
console.log((true).constructor === Boolean); // true
console.log(({}).constructor === Object); // true
console.log(([]).constructor === Array); // true
```

4、`Object.prototype.toString.call()` 方法

是一种更准确的类型检测方法，通过Object的原型上的toString方法，返回值是一个字符串，形式为`[object Type]`，其中Type是对象的类型

像array、function等类型都重写了toString方法，所以它可以正确区分数组、null和对象

```js
console.log(Object.prototype.toString.call([])); // "[object Array]"
console.log(Object.prototype.toString.call({})); // "[object Object]"
console.log(Object.prototype.toString.call(null)); // "[object Null]"
console.log(Object.prototype.toString.call(undefined)); // "[object Undefined]"
console.log(Object.prototype.toString.call(123)); // "[object Number]"
console.log(Object.prototype.toString.call('Hello')); // "[object String]"
console.log(Object.prototype.toString.call(true)); // "[object Boolean]"
console.log(Object.prototype.toString.call(function() {})); // "[object Function]"
```

5、其他特殊的判断方法

`Number.isFinite()`：检查一个值是否为有限的数。

`Number.isInteger()`：检查一个值是否为整数。

`Number.isNaN()`：检查一个值是否为NaN。这个方法比全局的isNaN()更严格，因为它只对NaN返回true，而全局的isNaN()会首先尝试将参数转换为数字。

`Array.isArray()`：检查一个值是否为数组



## 数据类型转换

### 类型转换方法

主要是指使用`Number()、String()、Boolean()`三个函数，手动将各种类型的值转换为目标类型

1、**转为字符串：**`toString()`方法不可转null、undefined，`String()`都能转

String()方法的规则：

1. 先调用对象自身的toString()方法，返回原始类型则对该值使用String()方法
2. 如果返回对象，再调用valueOf方法，如果返回原始类型的值，则使用该值的String函数
3. 如果valueOf返回对象，报错

具体转换：

- 数值：转为对应的字符串
- 字符串：原来的值
- 布尔值：true转为"true"，false转为"false"
- undefined：转为"undefined"
- null：转为"null"
- 对象：返回一个类型字符串
  - 对象：返回一个类型字符串，如：`String({a: 1}) // "[object Object]"`
  - 数组：返回数组的字符串形式，相当于调用Array.prototype.join()方法
  - Date：转为时间格式字符串

2、**转为数字：`**Number()`，比`parseInt`严格

具体转换：

- 数值：原来的值
- 字符串：如果可以被解析为数值，则转换为相应的值，空字符串转为0，否则返回NaN
- 布尔值：true转为1，false转为0
- undefined：转为NaN
- null：转为0
- 对象：
  - 对象：NaN
  - 数组：空数组转为0，只有一个元素时且可以转为数字时，对该元素使用Number()转换，其他均为NaN
  - Date：返回时间戳

3、**转为布尔值：`**Boolean()`

- 转为false：undefined、null、0（含-0和+0）、NaN、空字符串
- 其他情况全转为true



### Object.is()、`===`、`==`的区别

双等号会进行类型转换再判断

三等号不做类型转换，先判断类型

`Object.is()` 一般与三等号相同，但对特殊值做了处理，如-0和+0不相等，两个NaN相等



### == 转换规则

- 都是对象：两个对象都是同一引用返回true
- null和undefined：true
- 如果类型相同：
  - Number：+0==-0，NaN与任何值不相等
- 如果类型不同：
  - 数字与字符串：转为数字值
  - 如果有Boolean：转为1或0
  - 对象与数字/字符串：调用对象的valueOf()和toString()将对象转为原始值



### === 转换规则

- 类型不同返回false
- 都是对象：两个对象都是同一引用返回true
- 两个都为null或undefined，返回true
- 任意一个数为NaN，返回false
- 否则比较两个数的值：
  - 数字类型必须值相同，+0与-0相同



### 关系运算符（<, >, <=, >=）转换规则

- 数据类型相同：
  - 都为字符串：按Unicode编码按顺序比较
  - 都为数值：按值比较
- 数据类型不同：
  - 含NaN：返回false
  - 一方为数值，另一方会转换为数值然后比较，否则为false
  - 一方为字符串，别一方转换为字符串后比较，否则为false
  - 如果有对象，则调用对象的valueOf()和toString()将对象转为原始值
  - 如果一方为布尔值，则会转换为数值



## 数值计算

### 精度丢失/为什么0.1+0.2!==0.3，如何能相等

js中number类型遵循IEEE 754标准，使用64位浮点格式表示数字，也就是双精度浮点数，在二进制中，1 符号位，11指数位，52尾数，就是说小数部分最多只保留52位，后面的位数就会被舍弃（0舍1入）。

这就导致了 js 不能精确表达所有的浮点数，而只能是一个近似值。

有些数在转换成二进制时会发生无限循环，多余的位数会被截断，造成精度丢失。
