---
outline: deep
---



# js 基础



## 核心知识

### 原型、原型链

1、**prototype **和 `__proto__`

每个函数都有一个 `prototype` 属性，它是函数在创建时由 js 引擎添加到函数上的，它的指向是一个对象，被称为**原型对象**或**原型**。

原型对象上包含了可以由该构造函数的所有实例共享的属性和方法。

对象包含一个 `[[Prototype]]` 属性（浏览器中通过`__proto__`可以访问，通过`Object.getPrototypeOf() `方法可以获取），它的指向是创建这个对象的构造函数的 `prototype`。

所以说，`obj.__proto__ === test.prototype`

2、**原型链**

因为对象的`__proto__`属性指向了“原型”对象，而这个“原型”对象又指向它自己的“原型”对象，这样递归下去，就形成了一个原型链。

原型链是 js 中一种实现继承的机制。当你访问一个对象的属性时，如果对象自身没有这个属性，那么就会沿着原型链查找这个属性，直到找到为止或者到达原型链的末尾。

所以说，原型对象上的属性和方法可以由该函数的所有实例共享。

原型链的终点是null。

3、**函数与对象的关系**

函数是一种特殊的对象，它有一个特殊的功能，就是可以被调用（执行）。当一个函数被用作构造函数来创建对象时，这个函数就被称为构造函数。

在 js 中，所有的对象都是由函数创建的：

- 实例对象通过 new 关键字显式调用构造函数来创建
- 字面量对象虽然没有显示的调用构造函数，实际上也是 js 解释器通过` let xx=new Object()` 来创建的

4、**构造函数与普通函数**

在写法上：

- 构造函数通常以大写字母开头，以区别于普通函数
- 构建函数使用 new 关键字来创建新的对象实例

使用目的上：

- 构造函数主要用于创建和初始化一个对象
- 普通函数通常用于执行特定的任务或计算并返回结果

<br/>

### `new`操作符的实现过程

1. 在当前函数作用域内在中创建一个新的空对象，即`{}`
2. 为这个对象添加`__proto__`属性，让它指向构造函数的原型对象，并为原型对象指定constructor属性，指向构造函数
3. 调用`apply`或`call`方法，切换上下文，执行构造函数方法，为对象添加其他属性
4. 返回这个对象，

```js
//Fun为构造函数, args表示传参
function myNew(Fun, ...args) {
    // 1.在内存中创建一个新对象
    let obj = {};
    
    // 2.把新对象的原型指针指向构造函数的原型属性
    obj.__proto__ = Fun.prototype;
    
    // 3.改变this指向，并且执行构造函数内部的代码（传参）
    let res = Fun.apply(obj, args);
    
    // 4.判断函数执行结果的类型
    if (res instanceof Object) {
        return res;
    } else {
        return obj;
    }
}

function One(name, age) {
    this.name = name;
    this.age = age;
}
let a = new One();
console.log(a);


let obj = myNew(One, "XiaoMing", "18");
console.log("newObj:", obj);
```



### this

this 并不是一个好的设计，它会随着作用域不同而变化。

this代表函数调用相关联的对象，通常叫做函数上下文

1、函数调用模式

在全局作用域或函数外部使用this，它指向全局对象。非严格模式下指向全局对象（在浏览器中，全局对象是window，在 nodejs 中，全局对象是 global），严格模式下是undefined

```js
console.log(this); // window
```

2、方法调用时

在函数内部使用this，它的值取决于函数如何被调用。如果函数是作为一个方法被调用的，那么this就指向调用该方法的对象

```js
let obj = {
  name: 'John',
  sayHello: function() {
    console.log('Hello, ' + this.name);
  }
};

obj.sayHello(); // Hello, John
```

在这个例子中，sayHello方法内的this指向obj对象。

3、构造器调用模式

在构造函数中使用this，它指向新创建的对象实例。

```js
function Person(name) {
  this.name = name;
}

let john = new Person('John');
console.log(john.name); // John
```

在这个例子中，Person构造函数中的this指向新创建的对象john。

4、apply/call/bind 调用模式

当函数使用call、apply或bind方法被调用时，this指向传递给这些方法的第一个参数

```js
function sayHello() {
  console.log('Hello, ' + this.name);
}

let john = { name: 'John' };
let jane = { name: 'Jane' };

sayHello.call(john); // Hello, John
sayHello.call(jane); // Hello, Jane
```

在这个例子中，sayHello函数中的this分别指向john和jane对象。

5、箭头函数中

箭头函数中使用this，指向定义函数时的父级作用域的 this，且无法被改变

```js
let obj = {
  name: 'John',
  sayHello: function() {
    setTimeout(() => {
      console.log('Hello, ' + this.name);
    }, 1000);
  }
};

obj.sayHello(); // Hello, John
```

优先级：

构造器调用 > apply/call/bind > 方法调用 > 函数调用





## js 内存管理

### 堆和栈

堆和栈的概念存在于数据结构和操作系统中，js中常说的是针对操作系统。

在数据结构中：

- 栈中数据先进后出（像个有底的桶）
- 堆是一个优先队列，按优先级来排序，可以按大小来规定

在操作系统中，内存分为栈区和堆区：

- 栈区内存由编译器自动分配释放，存放函数的参数值，局部变量的值等。其操作方式类似于数据结构中的栈
- 堆区内存一般由开发者分配释放，若不释放，则由垃圾回收机制回收
