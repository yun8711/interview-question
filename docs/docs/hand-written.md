---
outline: deep

---

# 手撕代码

### 防抖

```js
function debounce(func,duration=500){
  let timerId;
  return function (...args){  // 通过 args 提取要传递的参数
    if(timerId){
      clearTimeout(timerId);
      timerId=null;
    }
    settimeOut(()=>{
      func.apply(this,args); // 保证 this 的指向，同时给要执行的函数传参
    },duration)
  }
}
```

<br/>

### 节流

```js
// 节流函数：时间戳版
function throttle(fn, delay) {
  let preTime = Date.now();

  return function (...args) {
    const nowTime = Date.now();

    if (nowTime - preTime >= delay) {
      preTime = Date.now();
      return fn.apply(this, args);
    }
  };
}

// 定时器版
function throttle(fn, wait) {
  let timeout = null;

  return function (...args) {
    if (!timeout) {
      timeout = setTimeout(() => {
        fn.apply(this, args);
        timeout = null;
      }, wait);
    }
  };
}
```

<br/>

### instanceof 的实现

```js
function myInstanceof(left,right){
  // 获取对象的原型
  let proto=Object.getPrototypeOf(left)
  // 获取构造函数的 prototype 对象
  let prototype=right.prototype;
  // 判断构造函数的 prototype 对象是否在对象的原型链上
  while(true){
    if(!proto) return false;
    if(proto===prototype) return true;
    // 如果没有找到，就继续从其原型上找，Object.getPrototypeOf方法用来获取指定对象的原型
    proto=Object.getPrototypeOf(proto);
  }
}
```

<br/>

### new 操作符

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

<br/>

### ajax、promise、async/await

```js
const ajax = (method, url, data, success, fail) => {
  	//1、创建一个XMLHttpRequest对象的实例
    var request = new XMLHttpRequest()
    
    //2、创建HTTP请求，可以使用XMLHttpRequest的open方法
    request.open(method, url);
  
  	//3、设置响应HTTP请求状态变化事件的回调函数
    request.onreadystatechange = function(){
        //判断XMLHttpRequest对象的readyState属性值是否为4表示异步调用完成
      	if(request.readyState !== 4) return;
        //4、设置获取服务器返回数据的语句
        if(xhr.status==200){
           //得到返回结果，对返回结果做一些操作
            success (request)
        } else {
            fail(request)
        }
    }
  
  	//设置请求失败时的监听函数
  	xhr.onerror=function(){
      console.log(this.statusText)
    }
  
  	// 设置请求头
  	xhr.responseType='json'
  	xhr.setRequestHeader("Accept","application/json")
  
  	//发送HTTP请求
    request.send();
}
```

<br/>

### Promise 封装 ajax

```js
function getJson(url) {
  return new Promise((resolve, reject) => {
    // 创建XMLHttpRequest对象
    let xhr = new XMLHttpRequest();
    // 设置请求方式和请求地址
    xhr.open("GET", url, true);
    // 设置状态监听函数
    xhr.onreadystatechange = () => {
      if (xhr.readyState === 4) {
        if (xhr.status === 200) {
          resolve(xhr.responseText);
        } else {
          reject(new Error(xhr.statusText));
        }
      }
    };
    // 设置错误监听函数
    xhr.onerror = () => {
      reject(new Error(xhr.statusText));
    };
    // 设置请求头
    xhr.responseType = "json";
    xhr.setRequestHeader("Accept", "application/json");
    // 发送请求
    xhr.send();
  });
}
```

<br/>

### 深拷贝

```js
function deepCopy(data, hash = new WeakMap()) {
      if(typeof data !== 'object' || data === null){
            throw new TypeError('传入参数不是对象')
        }
      // 判断传入的待拷贝对象的引用是否存在于hash中
      if(hash.has(data)) {
            return hash.get(data)
        }
      let newData = {};
      const dataKeys = Object.keys(data);
      dataKeys.forEach(value => {
         const currentDataValue = data[value];
         // 基本数据类型的值和函数直接赋值拷贝 
         if (typeof currentDataValue !== "object" || currentDataValue === null) {
              newData[value] = currentDataValue;
          } else if (Array.isArray(currentDataValue)) {
             // 实现数组的深拷贝
            newData[value] = [...currentDataValue];
          } else if (currentDataValue instanceof Set) {
             // 实现set数据的深拷贝
             newData[value] = new Set([...currentDataValue]);
          } else if (currentDataValue instanceof Map) {
             // 实现map数据的深拷贝
             newData[value] = new Map([...currentDataValue]);
          } else { 
             // 将这个待拷贝对象的引用存于hash中
             hash.set(data,data)
             // 普通对象则递归赋值
             newData[value] = deepCopy(currentDataValue, hash);
          } 
       }); 
      return newData;
  }
```

初次调用deepCopy时，参数会创建一个WeakMap结构的对象，这种数据结构的特点之一是，存储键值对中的健必须是对象类型。

- 首次调用时，weakMap为空，不会走上面那个`if(hash.has())`语句，如果待拷贝对象中有属性也为对象时，则将该待拷贝对象存入weakMap中，此时的健值和健名都是对该待拷贝对象的引用
- 然后递归调用该函数
- 再次进入该函数，传入了上一个待拷贝对象的对象属性的引用和存储了上一个待拷贝对象引用的weakMap，因为如果是循环引用产生的闭环，那么这两个引用是指向相同的对象的，因此会进入if(hash.has())语句内，然后return，退出函数，所以不会一直递归进栈，以此防止栈溢出。

<br/>

### 实现一个发布订阅模式

PubSub 类有三个方法：

- subscribe 方法用于订阅事件
- unsubscribe 方法用于取消订阅
- publish 方法用于发布事件。每个事件都有一个回调函数数组，当事件被发布时，所有订阅该事件的回调函数都会被调用。

```js
class PubSub {
  constructor() {
    this.subscribers = {};
  }

  // 订阅事件
  subscribe(event, callback) {
    if (!this.subscribers[event]) {
      this.subscribers[event] = [];
    }
    this.subscribers[event].push(callback);
  }

  // 取消订阅
  unsubscribe(event, callback) {
    if (!this.subscribers[event]) return;
    const index = this.subscribers[event].indexOf(callback);
    if (index !== -1) {
      this.subscribers[event].splice(index, 1);
    }
  }

  // 发布事件
  publish(event, data) {
    if (!this.subscribers[event]) return;
    this.subscribers[event].forEach(callback => callback(data));
  }
}
```

