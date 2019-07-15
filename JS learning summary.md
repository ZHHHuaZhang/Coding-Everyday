# JS Learning summary

## JavaScript参考文档

### 表达式和运算符

#### yield

yield 关键字用来暂停和恢复一个生成器函数（(function* 或遗留的生成器函数）。
yield关键字使生成器函数执行暂停，yield关键字后面的表达式的值返回给生成器的调用者。它可以被认为是一个基于生成器的版本的return关键字。

yield关键字实际返回一个IteratorResult对象，它有两个属性，value和done。value属性是对yield表达式求值的结果，而done是false，表示生成器函数尚未完全完成。

一旦遇到 yield 表达式，生成器的代码将被暂停运行，直到生成器的 next() 方法被调用。每次调用生成器的next()方法时，生成器都会恢复执行，直到达到以下某个值：

yield，导致生成器再次暂停并返回生成器的新值。 下一次调用next()时，在yield之后紧接着的语句继续执行。
throw用于从生成器中抛出异常。这让生成器完全停止执行，并在调用者中继续执行，正如通常情况下抛出异常一样。
到达生成器函数的结尾；在这种情况下，生成器的执行结束，并且IteratorResult给调用者返回undefined并且done为true。
到达return 语句。在这种情况下，生成器的执行结束，并将IteratorResult返回给调用者，其值是由return语句指定的，并且done 为true。
如果将参数传递给生成器的next()方法，则该值将成为生成器当前yield操作返回的值。

在生成器的代码路径中的yield运算符，以及通过将其传递给Generator.prototype.next()指定新的起始值的能力之间，生成器提供了强大的控制力。

```javascript
function* countAppleSales () {
  var saleList = [3, 7, 5];
  for (var i = 0; i < saleList.length; i++) {
    yield saleList[i];
  }
}
var appleStore = countAppleSales(); // Generator { }
console.log(appleStore.next()); // { value: 3, done: false }
console.log(appleStore.next()); // { value: 7, done: false }
console.log(appleStore.next()); // { value: 5, done: false }
console.log(appleStore.next()); // { value: undefined, done: true }
```

## 基础

### 面向对象三大要素

面向对象三大要素：封装、继承、多态

### js基础数据类型

Boolean
Null
Undefined
Number
String
Symbol (ECMAScript 6 新定义)
Object

### 原始数据类型和引用类型的区别

在内存中的存储方式不同，原始数据类型在内存中是栈存储，引用类型是堆存储 栈（stack）为自动分配的内存空间，它由系统自动释放；而堆（heap）则是动态分配的内存，大小不定也不会自动释放。

## 函数

### 箭头函数

箭头函数表达式的语法比函数表达式更简洁，并且没有自己的this，arguments，super或 new.target。这些函数表达式更适用于那些本来需要匿名函数的地方，并且它们不能用作构造函数。
引入箭头函数有两个方面的作用：更简短的函数并且不绑定this。

```javascript
var elements = [
  'Hydrogen',
  'Helium',
  'Lithium',
  'Beryllium'
];

elements.map(function(element) {
  return element.length;
}); // 返回数组：[8, 6, 7, 9]

// 上面的普通函数可以改写成如下的箭头函数
elements.map((element) => {
  return element.length;
}); // [8, 6, 7, 9]

// 当箭头函数只有一个参数时，可以省略参数的圆括号
elements.map(element => {
 return element.length;
}); // [8, 6, 7, 9]

// 当箭头函数的函数体只有一个 `return` 语句时，可以省略 `return` 关键字和方法体的花括号
elements.map(element => element.length); // [8, 6, 7, 9]

// 在这个例子中，因为我们只需要 `length` 属性，所以可以使用参数解构
// 需要注意的是字符串 `"length"` 是我们想要获得的属性的名称，而 `lengthFooBArX` 则只是个变量名，
// 可以替换成任意合法的变量名
elements.map(({ "length": lengthFooBArX }) => lengthFooBArX); // [8, 6, 7, 9]

//不绑定this
function Person() {
  // Person() 构造函数定义 `this`作为它自己的实例.
  this.age = 0;

  setInterval(function growUp() {
    // 在非严格模式, growUp()函数定义 `this`作为全局对象,
    // 与在 Person()构造函数中定义的 `this`并不相同.
    this.age++;
  }, 1000);
}

var p = new Person();
function Person() {
  var that = this;
  that.age = 0;

  setInterval(function growUp() {
    //  回调引用的是`that`变量, 其值是预期的对象
    that.age++;
  }, 1000);
}

//在ECMAScript 3/5中，通过将this值分配给封闭的变量，可以解决this问题。

// 箭头函数不会创建自己的this,它只会从自己的作用域链的上一层继承this。因此，在下面的代码中，传递给setInterval的函数内的this与封闭函数中的this值相同：
function Person(){
  this.age = 0;

  setInterval(() => {
    this.age++; // |this| 正确地指向 p 实例
  }, 1000);
}

var p = new Person();
//通过 call 或 apply 调用
var adder = {
  base : 1,
  add : function(a) {
    var f = v => v + this.base;
    return f(a);
  },

  addThruCall: function(a) {
    var f = v => v + this.base;
    var b = {
      base : 2
    };
    return f.call(b, a);
  }
};

console.log(adder.add(1));         // 输出 2
console.log(adder.addThruCall(1)); // 仍然输出 2（而不是3 ——译者注）

//不绑定arguments
var arguments = [1, 2, 3];
var arr = () => arguments[0];

arr(); // 1

function foo(n) {
  var f = () => arguments[0] + n; // 隐式绑定 foo 函数的 arguments 对象. arguments[0] 是 n
  return f();
}

foo(1); // 2

//像函数一样使用箭头函数
'use strict';
var obj = {
  i: 10,
  b: () => console.log(this.i, this),
  c: function() {
    console.log( this.i, this)
  }
}
obj.b();
// undefined, Window{...}
obj.c();
// 10, Object {...}

//使用 new 操作符
箭头函数不能用作构造器，和 new一起用会抛出错误。
var Foo = () => {};
var foo = new Foo(); // TypeError: Foo is not a constructor

//使用prototype属性
箭头函数没有prototype属性。

//使用 yield 关键字
yield 关键字通常不能在箭头函数中使用（除非是嵌套在允许使用的函数内）。因此，箭头函数不能用作生成器。

```

### arguments

arguments 是一个对应于传递给函数的参数的类数组对象。

```javascript
// arguments对象不是一个 Array 。它类似于Array，但除了length属性和索引元素之外没有任何Array属性。例如，它没有 pop 方法。但是它可以被转换为一个真正的Array：
var args = Array.prototype.slice.call(arguments);
var args = [].slice.call(arguments);

// ES2015
const args = Array.from(arguments);
const args = [...arguments];

// 对参数使用 typeof
//typeof参数返回 'object'。
console.log(typeof arguments);    // 'undefined'
// arguments 对象只能在函数内使用
function test(a){
    console.log(a,Object.prototype.toString.call(arguments));
    console.log(arguments[0],arguments[1]);
    console.log(typeof arguments[0]);
}
test(1);
/*
1 "[object Arguments]"
1 undefined
number
*/

```

## 声明

### let

let 语句声明一个块级作用域的本地变量，并且可选的将其初始化为一个值。

```javascript
//作用域规则
// let声明的变量只在其声明的块或子块中可用，这一点，与var相似。二者之间最主要的区别在于var声明的变量的作用域是整个封闭函数。
function varTest() {
  var x = 1;
  if (true) {
    var x = 2;  // 同样的变量!
    console.log(x);  // 2
  }
  console.log(x);  // 2
}

function letTest() {
  let x = 1;
  if (true) {
    let x = 2;  // 不同的变量
    console.log(x);  // 2
  }
  console.log(x);  // 1
}

//简化内部函数代码
var list = document.getElementById("list");

for (let i = 1; i <= 5; i++) {
  var item = document.createElement("LI");
  item.appendChild(document.createTextNode("Item " + i));

  let j = i;
  item.onclick = function (ev) {
    console.log("Item " + j + " is clicked.");
  };
  list.appendChild(item);
}

//在程序或者函数的顶层，let并不会像var一样在全局对象上创造一个属性，比如
var x = 'global';
let y = 'global';
console.log(this.x); // "global"
console.log(this.y); // undefined

//模仿私有接口
var SomeConstructor;

{
    let privateScope = {};

    SomeConstructor = function SomeConstructor () {
        this.someProperty = "foo";
        privateScope.hiddenProperty = "bar";
    }

    SomeConstructor.prototype.showPublic = function () {
        console.log(this.someProperty); // foo
    }

    SomeConstructor.prototype.showPrivate = function () {
        console.log(privateScope.hiddenProperty); // bar
    }

}

var myInstance = new SomeConstructor();

myInstance.showPublic();
myInstance.showPrivate();

console.log(privateScope.hiddenProperty); // error

// 重复声明
在同一个函数或块作用域中重复声明同一个变量会引起SyntaxError。
if (x) {
  let foo;
  let foo; // SyntaxError thrown.
}
//在 switch 语句中只有一个块，你可能因此而遇到错误。
let x = 1;
switch(x) {
  case 0:
    let foo;
    break;
  case 1:
    let foo; // SyntaxError for redeclaration.
    break;
}

然而，需要特别指出的是，一个嵌套在 case 子句中的块会创建一个新的块作用域的词法环境，就不会产生上诉重复声明的错误。

let x = 1;

switch(x) {
  case 0: {
    let foo;
    break;
  }  
  case 1: {
    let foo;
    break;
  }
}

//暂存死区
let 被创建在包含该声明的（块）作用域顶部，一般被称为“提升”。与通过  var 声明的有初始化值 undefined 的变量不同，通过 let 声明的变量直到它们的定义被执行时才初始化。在变量初始化前访问该变量会导致 ReferenceError。该变量处在一个自块顶部到初始化处理的“暂存死区”中。
function do_something() {
  console.log(bar); // undefined
  console.log(foo); // ReferenceError
  var bar = 1;
  let foo = 2;
}

// let后跟一个函数传递的参数时将导致循环内部报错。
function go(n){
  for (let n of n.a) { // ReferenceError: n is not defined
    console.log(n);
  }
}

go({a:[1,2,3]});

//循环定义中的let作用域
var i = 0;
for (let i = i; i < 10; i++) {
  console.log(i);
}
//报错以上 let 声明的 i 将会变成 undefined；chrome 版本50.0.2661.102 (64-bit)；推荐以下写法：
var i = 0;
for (let l = i; l < 10; l++) {  
　console.log(l);
}

//例子
//let  对比 var
// let的作用域是块，而var的作用域是函数
var a = 5;
var b = 10;

if (a === 5) {
  let a = 4; // The scope is inside the if-block
  var b = 1; // The scope is inside the function

  console.log(a);  // 4
  console.log(b);  // 1
}

console.log(a); // 5
console.log(b); // 1

//let 在循环中
for (let i = 0; i < 10; i++) {
  console.log(i); // 0, 1, 2, 3, 4 ... 9
}

console.log(i); // i is not defined

```

### function*

function* 这种声明方式(function关键字后跟一个星号）会定义一个生成器函数 (generator function)，它返回一个  Generator  对象。

```javascript
function* generator(i) {
  yield i;
  yield i + 10;
}

var gen = generator(

console.log(gen.next().value);
// expected output: 10

console.log(gen.next().value);
// expected output: 20
```

## Debug

要解决空指针以及 undefined 或 null 值的问题， 你可以使用 typeof 操作符， 例如：

if (typeof foo !== 'undefined') {
  // Now we know that foo is defined, we are good to go.
}

## 脚本调用策略

### async 和 defer

* 如果脚本无需等待页面解析，且无依赖独立运行，那么应使用 async。
* 如果脚本需要等待解析，且依赖于其它脚本，调用这些脚本时应使用 defer，将关联的脚本按所需顺序置于 HTML 中。

## 变量

### 定义

我们说，变量是用来存储数值的，那么有一个重要的概念需要区分。变量不是数值本身，
它们仅仅是一个用于存储数值的容器。你可以把变量想象成一个个用来装东西的纸箱子。

### 命名规则

你可以给你的变量赋任何你喜欢的名字，但有一些限制。 一般你应当坚持使用拉丁字符(0-9,a-z,A-Z)和下划线字符。

* 你不应当使用规则之外的其他字符，因为它们可能引发错误，或对国际用户来说难以理解。
* 变量名不要以下划线开头—— 以下划线开头的被某些JavaScript设计为特殊的含义，因此可能让人迷惑。
* 变量名不要以数字开头。这种行为是不被允许的，并且将引发一个错误。
* 一个可靠的命名约定叫做 "小写驼峰命名法"，用来将多个单词组在一起，小写整个命名的第一个字母然后大写剩下单词的首字符。我们已经在文章中使用了这种命名方法。
* 让变量名直观，它们描述了所包含的数据。不要只使用单一的字母/数字，或者长句。
* 变量名大小写敏感——因此myage与myAge是2个不同的变量。
* 最后也是最重要的一点—— 你应当避免使用JavaScript的保留字给变量命名。保留字，即是组成JavaScript的实际语法的单词！因此诸如 var, function, let和 for等，都不能被作为变量名使用。浏览器将把它们识别为不同的代码项，因此你将得到错误。

## 比较运算符

您可能会看到有些人在他们的代码中使用 == 和!=来判断相等和不相等，这些都是JavaScript中的有效运算符，但它们与===/!==不同，前者测试值是否相同， 但是数据类型可能不同，而后者的严格版本测试值和数据类型是否相同。 严格的版本往往导致更少的错误，所以我们建议您使用这些严格的版本。

## 字符串

### 单引号双引号

在JavaScript中，您可以选择单引号或双引号来包裹字符串。
ps:java中单引号引的数据 是char类型的双引号引的数据 是String类型的 。

### 转义字符串中的字符

在JavaScript中，我们通过在字符之前放一个反斜杠来实现这一点。试试这个:

```  javascript
var bigmouth = 'I\'ve got no right to take my place...';
bigmouth;
```

### 字符与数字转换

转化为Number

``` javascript
var myString = '123';
var myNum = Number(myString);
typeof myNum;
```

转化为String

``` javascript
var myNum = 123;
var myString = myNum.toString();
typeof myString;
```

### 在字符串中查找子字符串并提取它

```javascript
var browserType = 'mozilla';//全局变量

browserType.indexOf('zilla');
/* 结果是2，因为子字符串“zilla”从“mozilla”内的位
  置2（0，1，2 - 所以3个字符）开始。 这样的代码
  可以用来过滤字符串。 例如，假设我们有一个Web地
  址列表，但我们只想打印出包含“mozilla”的那些地址。
*/

browserType.indexOf('vanilla');
// 这应该会得到-1的结果 - 当在主字符串中找不到子
// 字符串（在本例中为“vanilla”）时返回-1。
if(browserType.indexOf('mozilla') !== -1) {
  // do stuff with the string
}

browserType.slice(2);
//这返回“zilla” - 这是因为2的字符位置是字母z，
// 并且因为没有包含第二个参数，所以返回的子字符串
// 是字符串中的所有剩余字符。
```

### 替换字符串的某部分

```javascript
browserType.replace('moz','van');
// 注意，在实际程序中，想要真正更新browserType变量的值，
// 您需要设置变量的值等于刚才的操作结果；它不会自动更新子
// 串的值。所以事实上你需要这样写：browserType = browse
// rType.replace('moz','van');。
```

### 大小写转化

```javascript
var radData = 'My NaMe Is MuD';
radData.toLowerCase();
radData.toUpperCase();
```

## 数组

### 字符串和数组之间的转换

```javascript
var myData = 'Manchester,London,Liverpool,Birmingham,Leeds,Carlisle';

var myArray = myData.split(',');
myArray;

//使用 join() 方法进行相反的操作
var myNewString = myArray.join(',');
myNewString;

// 另一种方法是使用 toString() 方法。 toString（）可以比join（）
// 更简单，因为它不需要一个参数，但更有限制。 使用 join() 可以指
// 定不同的分隔符
var dogNames = ["Rocket","Flash","Bella","Slugger"];
dogNames.toString(); //Rocket,Flash,Bella,Slugger
```

### 添加和删除数组项

```javascript
var myArray = ['Manchester', 'London', 'Liverpool', 'Birmingham', 'Leeds', 'Carlisle'];

//要在数组末尾添加或删除一个项目，我们可以使用  push() 和 pop()。
myArray.push('Cardiff');
myArray;
myArray.push('Bradford', 'Brighton');
myArray;
//当方法调用完成时，将返回数组的新长度

// 数组中删除最后一个元素的话直接使用 pop() 就可以
myArray.pop();//当方法调用完成时，将返回已删除的项目。

//unshift() 和 shift() 从功能上与 push() 和 pop() 完全相同，只是它们分别作用于数组的开始，而不是结尾。
myArray.unshift('Edinburgh');
myArray;

var removedItem = myArray.shift();
myArray;
removedItem;
```

## 条件语句

何不是 false, undefined, null, 0, NaN 的值，或一个空字符串（''）在作为条件语句进行测试时实际返回true

``` javascript
var cheese = 'Cheddar';

if (cheese) {
  console.log('Yay! Cheese available for making cheese on toast.');
} else {
  console.log('No cheese on toast for you today.');
}
```

if和else if 之间是有联系的,当不满足if中的条件的时候,就会去执行else if ,如果if中的条件已经满足了,就不会去判断else if中的条件了

双if是每一个if都会进行判断,依次对if进行判断,互相之间不会影响;

### 逻辑运算符：&&  , || 和 "!"

```javascript
if (x === 5 || 7 || 10 || 20) {
  // run my code
}
//wrong way

// 在这个例子里 if(...) 里的条件总为真，因为 7 (或者其它非零的数)
// 的值总是为真. 这个条件实际意思是 "如果x等于5, 或者7为真 — 它总
// 是成立的". 这不是我们想要的逻辑，为了 让它正常工作你必须指定每
// 个或表达式两边都是完整的检查:

//right way
if (x === 5 || x === 7 || x === 10 ||x === 20) {
  // run my code
}
```

### 函数调运算符

```javascript
btn.onclick = displayMessage;//点击按钮便运行

btn.onclick = displayMessage();//没有点击按钮便运行

btn.onclick = function() {
  displayMessage('Woo, this is a different message!');
};
```

函数名后面的括号叫做函数调运运算符

## 事件

每个可用的事件都会有一个**事件处理器**，也就是事件触发时会运行的代码块。当我们定义了一个用来回应事件被激发的代码块的时候，我们说我们**注册了一个事件处理器**。

### addEventListener()和removeEventListener()

```javascript
var btn = document.querySelector('button');

function bgChange() {
  var rndCol = 'rgb(' + random(255) + ',' + random(255) + ',' + random(255) + ')';
  document.body.style.backgroundColor = rndCol;
}

btn.addEventListener('click', bgChange);

//匿名函数
btn.addEventListener('click', function() {
  var rndCol = 'rgb(' + random(255) + ',' + random(255) + ',' + random(255) + ')';
  document.body.style.backgroundColor = rndCol;
});

//移除事件监听器
btn.removeEventListener('click', bgChange);

```

### 事件对象

事件对象，它被自动传递给事件处理函数，以提供额外的功能和信息。

```javascript
function bgChange(e) {
  var rndCol = 'rgb(' + random(255) + ',' + random(255) + ',' + random(255) + ')';
  e.target.style.backgroundColor = rndCol;
  console.log(e);
}  

btn.addEventListener('click', bgChange);
```

事件对象 e 的target属性始终是事件刚刚发生的元素的引用
a
您可以使用任何您喜欢的名称作为事件对象 - 您只需要选择一个名称，然后可以在事件处理函数中引用它。 开发人员最常使用 e / evt / event，因为它们很简单易记。 坚持标准总是很好。

### 事件冒泡及捕获

在一个元素上有两个相同类型的事件处理器被激活会发生什么

在现代浏览器中，默认情况下，所有事件处理程序都在冒泡阶段进行注册。

```javascript
btn.onclick = function() {
  videoBox.setAttribute('class', 'showing');
}
//单击按钮显示

videoBox.onclick = function() {
  videoBox.setAttribute('class', 'hidden');
};//div 单击后隐藏

video.onclick = function() {
  video.play();
};//视频单击后显示

//wrong：单击视频后div也被隐藏
//原因：冒泡原理，这是因为video在<div>之内 - video是<div>的一个子元素 - 所以点击video实际上是同时也运行<div>上的事件处理程序。
//逐级向上触发

//解决方案_stopPropagation
//  当在事件对象上调用该函数时，它只会让当前事件处理程序运行，但事件不会在冒泡链上进一步扩大，因此将不会有更多事件处理器被运行(不会向上冒泡)。
video.onclick = function(e) {
  e.stopPropagation();
  video.play();
};
```

## 对象入门

### 点表示法 括号表示法 子命名空间

```javascript
//子命名空间
name : ['Bob', 'Smith'],
//改成子命名空间
name : {
  first : 'Bob',
  last : 'Smith'
},
//点表示法
person.age
person.name.first
//括号表示法替代
person['age']
person['name']['first']
```

对象做了字符串到值的映射，而数组做的是数字到值的映射。

### 设置对象成员

```javascript
person['eyes'] = 'hazel'
person.farewell = function() { alert("Bye everybody!") }

var myDataName = 'height'
var myDataValue = '1.75m'
person[myDataName] = myDataValue

```

括号表示法一个有用的地方是它不仅可以动态的去设置对象成员的值，还可以动态的去设置成员的名字。
点表示法只能接受字面量的成员的名字，不接受变量作为名字。

### "this"的含义

关键字"this"指向了当前代码运行时的对象

### javascript面向对象

```javascript
//普通定义构建函数
function createNewPerson(name) {
  var obj = {};
  obj.name = name;
  obj.greeting = function () {
    alert('Hi! I\'m ' + this.name + '.');
  }
  return obj;
}
//javascript定义构建函数
function Person(name) {
  this.name = name;
  this.greeting = function() {
    alert('Hi! I\'m ' + this.name + '.');
  };
}
//creat方法
var person2 = Object.create(person1);//person2是基于person1创建的

```

 一个构建函数通常是大写字母开头，这样便于区分构建函数和普通函数。
 关键字 new 跟着一个含参函数，用于告知浏览器我们想要创建一个对象实例，非常类似函数调用，并把结果保存到变量中

### 对象原型

JavaScript 常被描述为一种基于原型的语言 (prototype-based language)——每个对象拥有一个原型对象，对象以其原型为模板、从原型继承方法和属性。原型对象也可能拥有原型，并从中继承方法和属性，一层一层、以此类推。这种关系常被称为原型链 (prototype chain)，它解释了为何一个对象会拥有定义在其他对象中的属性和方法。

```javascript
Person.prototype.farewell = function() {
  alert(this.name.first + ' has left the building. Bye for now!');
}

person1.farewell();
//整条继承链动态地更新了，任何由此构造器创建的对象实例都自动获得了这个方法。
```

### call函数

```javascript
//call继承
function Teacher(first, last, age, gender, interests, subject) {
  Person.call(this, first, last, age, gender, interests);

  this.subject = subject;
}
//另一种方法
function Teacher(first, last, age, gender, interests, subject) {
  this.name = {
    first,
    last
  };
  this.age = age;
  this.gender = gender;
  this.interests = interests;
  this.subject = subject;
}
//从无参构造函数继承
function Brick() {
  this.width = 10;
  this.height = 20;
}

function BlueGlassBrick() {
  Brick.call(this);

  this.opacity = 0.5;
  this.color = 'blue';
}
//继承了Brick中的width和height
```

### 设置原型和构造器引用

``` javascript
Teacher.prototype = Object.create(Person.prototype);
//创建一个和Person.prototype一样的新的原型属性值（这个属性指向一个包括属性和方法的对象），然后将其作为Teacher.prototype的属性值。这意味着Teacher.prototype现在会继承Person.prototype的所有属性和方法
Teacher.prototype.constructor//构造属性指向Person()
Teacher.prototype.constructor = Teacher;//修正
```

注：每一个函数对象（Function）都有一个prototype属性，并且只有函数对象有prototype属性，因为prototype本身就是定义在Function对象下的属性。当我们输入类似var person1=new Person(...)来构造对象时，JavaScript实际上参考的是Person.prototype指向的对象来生成person1。另一方面，Person()函数是Person.prototype的构造函数，也就是说Person===Person.prototype.constructor（不信的话可以试试）。

在定义新的构造函数Teacher时，我们通过function.call来调用父类的构造函数，但是这样无法自动指定Teacher.prototype的值，这样Teacher.prototype就只能包含在构造函数里构造的属性，而没有方法。因此我们利用Object.create()方法将Person.prototype作为Teacher.prototype的原型对象，并改变其构造器指向，使之与Teacher关联。

任何您想要被继承的方法都应该定义在构造函数的prototype对象里，并且永远使用父类的prototype来创造子类的prototype，这样才不会打乱类继承结构。

## 操作文档

### 创建放置节点

```javascript
var sect = document.querySelector('section');
var para = document.createElement('p');
para.textContent = 'We hope you enjoyed the ride.';
sect.appendChild(para);
var text = document.createTextNode(' — the premier source for web development knowledge.');//创建文本节点
var linkPara = document.querySelector('p');
linkPara.appendChild(text);
```

### 移动和删除元素

``` javascript
sect.appendChild(linkPara);
// 这样可以把段落下移到section的底部。你可能想过要做第二个副本，但是情况并非如此 — linkPara是指向该段落唯一副本的引用。如果你想做一个副本并也把它添加进去，只能用Node.cloneNode() 方法来替代。
sect.removeChild(linkPara);//删除节点
linkPara.parentNode.removeChild(linkPara);//删除节点自身
```

### 操作样式

```javascript
para.style.color = 'white';
para.style.backgroundColor = 'black';
para.style.padding = '10px';
para.style.width = '250px';
para.style.textAlign = 'center';
//注意: CSS样式的JavaSript属性版本以小驼峰式命名法书写，而CSS版本带连接符号（backgroundColor 对 background-color）。确保你不会混淆，否则就不能工作。

//另一个方法 在HTML的<head>中添加
<style>
.highlight {
  color: white;
  background-color: black;
  padding: 10px;
  width: 250px;
  text-align: center;
}
</style>

para.setAttribute('class', 'highlight');
```

两种方式各有优缺点，选择哪种取决于你自己。第一种方式无需安装，适合简单应用，第二种方式更加正统（没有CSS和JavaScript的混合，没有内联样式，而这些被认为是不好的体验）。当你开始构建更大更具吸引力的应用时，你可能会更多地使用第二种方法，但这完全取决于你自己。

## 画图

## web浏览器的重要部分

### window

window是载入浏览器的标签，在JavaScript中用Window对象来表示，使用这个对象的可用方法，你可以返回窗口的大小（参见Window.innerWidth和Window.innerHeight），操作载入窗口的文档，存储客户端上文档的特殊数据（例如使用本地数据库或其他存储设备），为当前窗口绑定event handler，等等。

### navigator

navigator表示浏览器存在于web上的状态和标识（即用户代理）。在JavaScript中，用Navigator来表示。你可以用这个对象获取一些信息，比如来自用户摄像头的地理信息、用户偏爱的语言、多媒体流等等。

### document

document（在浏览器中用DOM表示）是载入窗口的实际页面，在JavaScript中用Document 对象表示，你可以用这个对象来返回和操作文档中HTML和CSS上的信息。例如获取DOM中一个元素的引用，修改其文本内容，并应用新的样式，创建新的元素并添加为当前元素的子元素，甚至把他们一起删除。

## 终端

终端就是连接内核与交互界面的这座桥，它允许用户在交互界面上打开一个叫做「Terminal 终端」的应用程序，在其中输入命令，系统会直接给出反馈。

因为终端这座桥，实际允许用户间接控制系统内核，也就是系统的大脑，因此它理论上具备控制一切的权利。

## NPM

Node Package Manager

## 脚手架

项目开始时配置的模板

## 循环补充

labele语句需要与break与continue配合

```javascript
var num = 0;
        for (var i = 0 ; i < 10 ; i++){
             for (var j = 0 ; j < 10 ; j++){
                  if( i == 5 && j == 5 ){
                        break;
                  }
             num++;
             }
        }

       alert(num); // 循环在 i 为5，j 为5的时候跳出 j循环，但会继续执行 i 循环，输出 95
//使用lable后 搭配break  
var num = 0;
    outPoint:
    for (var i = 0 ; i < 10 ; i++){
         for (var j = 0 ; j < 10 ; j++){
              if( i == 5 && j == 5 ){
                    break outPoint;
              }
         num++;
         }
    }

    alert(num); // 循环在 i 为5，j 为5的时候跳出双循环，返回到outPoint层继续执行，输出 55
 //搭配continue语句
 var num = 0;  
　　outPoint:  
　　for(var i = 0; i < 10; i++)  
　　{  
   　　for(var j = 0; j < 10; j++)  
    　　{  
        　　if(i == 5 && j == 5)  
        　　{  
            　　continue outPoint;  
       　　 }  
       　　 num++;  
    　　}  
　　}  
　　alert(num);  //95
```

for in 和for of

```javascript
let arr = [3, 5, 7];
arr.foo = "hello";

for (let i in arr) {
   console.log(i); // logs "0", "1", "2", "foo"
}

for (let i of arr) {
   console.log(i); // logs "3", "5", "7" // 注意这里没有 hello
}

// for...in 循环遍历的结果是数组元素的下标
// for...of 遍历的结果是元素的值
```

## JavaScript 标准库

Math.floor() 返回小于或等于一个给定数字的最大整数。

Function.call() 使用一个指定的 this 值和单独给出的一个或多个参数来调用一个函数。

Object.keys(obj) 一个表示给定对象的所有可枚举属性的字符串数组。

### push

push() 方法将一个或多个元素添加到数组的末尾，并返回该数组的新长度。

```javascript
var vegetables = ['parsnip', 'potato'];
var moreVegs = ['celery', 'beetroot'];

// 将第二个数组融合进第一个数组
// 相当于 vegetables.push('celery', 'beetroot');
Array.prototype.push.apply(vegetables, moreVegs);

console.log(vegetables);
// ['parsnip', 'potato', 'celery', 'beetroot']

// 像数组一样使用对象
var obj = {
    length: 0,

    addElem: function addElem (elem) {
        // obj.length is automatically incremented
        // every time an element is added.
        [].push.call(this, elem);
    }
};

// Let's add some empty objects just to illustrate.

obj.addElem({});
obj.addElem({});
console.log(obj.length);
// → 2
//我们将该集合存储在对象本身上，并使用在 Array.prototype.push 上使用的 call 来调用该方法，使其认为我们正在处理数组，而它只是像平常一样运作，这要感谢 JavaScript 允许我们建立任意的执行上下文。
```

### slice

slice() 方法提取一个字符串的一部分，并返回一新的字符串。

```javascript
// 返回现有数组的一部分
var fruits = ['Banana', 'Orange', 'Lemon', 'Apple', 'Mango'];
var citrus = fruits.slice(1, 3);

// fruits contains ['Banana', 'Orange', 'Lemon', 'Apple', 'Mango']
// citrus contains ['Orange','Lemon']

//使用 slice
// 在下例中, slice从myCar中创建了一个新数组newCar.两个数组都包含了一个myHonda对象的引用. 当myHonda的color属性改变为purple, 则两个数组中的对应元素都会随之改变.
// 使用slice方法从myCar中创建一个newCar.

var myHonda = { color: 'red', wheels: 4, engine: { cylinders: 4, size: 2.2 } };
var myCar = [myHonda, 2, "cherry condition", "purchased 1997"];
var newCar = myCar.slice(0, 2);

// 输出myCar, newCar,以及各自的myHonda对象引用的color属性.
console.log('myCar = ' + JSON.stringify(myCar));
console.log('newCar = ' + JSON.stringify(newCar));
console.log('myCar[0].color = ' + JSON.stringify(myCar[0].color));
console.log('newCar[0].color = ' + JSON.stringify(newCar[0].color));

// 改变myHonda对象的color属性.
myHonda.color = 'purple';
console.log('The new color of my Honda is ' + myHonda.color);

//输出myCar, newCar中各自的myHonda对象引用的color属性.
console.log('myCar[0].color = ' + myCar[0].color);
console.log('newCar[0].color = ' + newCar[0].color);
//输出结果
myCar = [{color: 'red', wheels: 4, engine: {cylinders: 4, size: 2.2}}, 2,
       'cherry condition', 'purchased 1997']
newCar = [{color: 'red', wheels: 4, engine: {cylinders: 4, size: 2.2}}, 2]
myCar[0].color = red
newCar[0].color = red
The new color of my Honda is purple
myCar[0].color = purple
newCar[0].color = purple
```

### map

map() 方法创建一个新数组，其结果是该数组中的每个元素都调用一个提供的函数后返回的结果。

```javascript
var new_array = arr.map(function callback(currentValue[, index[, array]]) {
 // Return element for new_array
 }[, thisArg])
 map 方法会给原数组中的每个元素都按顺序调用一次  callback 函数。callback 每次执行后的返回值（包括 undefined）组合起来形成一个新数组。
 //求数组中每个元素的平方根节
  var numbers = [1, 4, 9];
  var roots = numbers.map(Math.sqrt);
  // roots的值为[1, 2, 3], numbers的值仍为[1, 4, 9]

// 使用 map 重新格式化数组中的对象节
var kvArray = [{key: 1, value: 10},
               {key: 2, value: 20},
               {key: 3, value: 30}];
var reformattedArray = kvArray.map(function(obj)
{
   var rObj = {};
   rObj[obj.key] = obj.value;
   return rObj;
});
// reformattedArray 数组为： [{1: 10}, {2: 20}, {3: 30}],

// kvArray 数组未被修改:
// [{key: 1, value: 10},
//  {key: 2, value: 20},
//  {key: 3, value: 30}]
//

//使用一个包含一个参数的函数来mapping(构建)一个数字数组
var numbers = [1, 4, 9];
var doubles = numbers.map(function(num) {
  return num * 2;
});

// doubles数组的值为： [2, 8, 18]
// numbers数组未被修改： [1, 4, 9]
//

//一般的map 方法节
var map = Array.prototype.map
var a = map.call("Hello World", function(x) {
  return x.charCodeAt(0);
})
// a的值为[72, 101, 108, 108, 111, 32, 87, 111, 114, 108, 100]
//

//querySelectorAll 应用
var elems = document.querySelectorAll('select option:checked');
var values = Array.prototype.map.call(elems, function(obj) {
  return obj.value;
});
//

//使用技巧案例
// 下面的语句返回什么呢:
["1", "2", "3"].map(parseInt);
// 你可能觉的会是[1, 2, 3]
// 但实际的结果是 [1, NaN, NaN]

// 通常使用parseInt时,只需要传递一个参数.
// 但实际上,parseInt可以有两个参数.第二个参数是进制数.
// 可以通过语句"alert(parseInt.length)===2"来验证.
// map方法在调用callback函数时,会给它传递三个参数:当前正在遍历的元素,
// 元素索引, 原数组本身.
// 第三个参数parseInt会忽视, 但第二个参数不会,也就是说,
// parseInt把传过来的索引值当成进制数来使用.从而返回了NaN.

function returnInt(element) {
  return parseInt(element, 10);
}

['1', '2', '3'].map(returnInt); // [1, 2, 3]
// 意料之中的结果

// 也可以使用简单的箭头函数，结果同上
['1', '2', '3'].map( str => parseInt(str) );

// 一个更简单的方式:
['1', '2', '3'].map(Number); // [1, 2, 3]
// 与`parseInt` 不同，下面的结果会返回浮点数或指数:
['1.1', '2.2e2', '3e300'].map(Number); // [1.1, 220, 3e+300]

// Polyfill 原生js实现map
// 实现 ECMA-262, Edition 5, 15.4.4.19
// 参考: http://es5.github.com/#x15.4.4.19
if (!Array.prototype.map) {
  Array.prototype.map = function(callback, thisArg) {

    var T, A, k;

    if (this == null) {
      throw new TypeError(" this is null or not defined");
    }

    // 1. 将O赋值为调用map方法的数组.
    var O = Object(this);

    // 2.将len赋值为数组O的长度.
    var len = O.length >>> 0;

    // 3.如果callback不是函数,则抛出TypeError异常.
    if (Object.prototype.toString.call(callback) != "[object Function]") {
      throw new TypeError(callback + " is not a function");
    }

    // 4. 如果参数thisArg有值,则将T赋值为thisArg;否则T为undefined.
    if (thisArg) {
      T = thisArg;
    }

    // 5. 创建新数组A,长度为原数组O长度len
    A = new Array(len);

    // 6. 将k赋值为0
    k = 0;

    // 7. 当 k < len 时,执行循环.
    while(k < len) {

      var kValue, mappedValue;

      //遍历O,k为原数组索引
      if (k in O) {

        //kValue为索引k对应的值.
        kValue = O[ k ];

        // 执行callback,this指向T,参数有三个.分别是kValue:值,k:索引,O:原数组.
        mappedValue = callback.call(T, kValue, k, O);

        // 返回值添加到新数组A中.
        A[ k ] = mappedValue;
      }
      // k自增1
      k++;
    }

    // 8. 返回新数组A
    return A;
  };
}
```

## Web Api 接口参考

void ctx.arc(x, y, radius, startAngle, endAngle, anticlockwise);

CanvasRenderingContext2D.arc() 是 Canvas 2D API 绘制圆弧路径的方法。 圆弧路径的圆心在 (x, y) 位置，半径为 r ，根据anticlockwise （默认为顺时针）指定的方向从 startAngle 开始绘制，到 endAngle 结束。

window​.onresize
onresize属性可以用来获取或设置当前窗口的resize事件的事件处理函数

## 小技巧

更改最后一个符号：使用slice语句

```javascript
//示例：
refused.textContent = refused.textContent.slice(0,refused.textContent.length-2) + '.';
//改为句号
```

特殊字符

```javascript
 alert('Yo!I\`m '+this.name.first+'.');
 //前面加\
```

## this关键字详解

  当前执行代码的环境对象
  无论是否在严格模式下，在全局执行环境中（在任何函数体外部）this 都指向全局对象。

  ```javascript
    function f1(){
    return this;
  }
  //在浏览器中：
  f1() === window;   //在浏览器中，全局对象是window

  //在Node中：
  f1() === global;
  ```

## 箭头函数详解

## call函数详解

```javascript
//基础用法继承调用父构造函数
function Product(name, price) {
  this.name = name;
  this.price = price;
}

function Food(name, price) {
  Product.call(this, name, price);
  this.category = 'food';
}

function Toy(name, price) {
  Product.call(this, name, price);
  this.category = 'toy';
}

var cheese = new Food('feta', 5);
var fun = new Toy('robot', 40);
//使用 call 方法调用函数并且指定上下文的 'this'
// 当调用 greet 方法的时候，该方法的this值会绑定到 obj 对象
function greet() {
  var reply = [this.animal, 'typically sleep between', this.sleepDuration].join(' ');
  console.log(reply);
}

var obj = {
  animal: 'cats', sleepDuration: '12 and 16 hours'
};

greet.call(obj);  // cats typically sleep between 12 and 16 hours

//使用 call 方法调用匿名函数
var animals = [
  { species: 'Lion', name: 'King' },
  { species: 'Whale', name: 'Fail' }
];

for (var i = 0; i < animals.length; i++) {
  (function(i) {
    this.print = function() {
      console.log('#' + i + ' ' + this.species
                  + ': ' + this.name);
    }
    this.print();
  }).call(animals[i], i);
}
//解析：function.call()给每个数组元素对象添加一个 print 方法

//使用 call 方法调用函数并且不指定第一个参数（argument）
var sData = 'Wisen';

function display() {
  console.log('sData value is %s ', this.sData);
}

display.call();  // sData value is Wisen
//this会被绑为全局对象
```

## apply方法详解

call()方法的作用和 apply() 方法类似，区别就是call()方法接受的是参数列表，而apply()方法接受的是一个参数数组。

```javascript
//用 apply 将数组添加到另一个数组
//concat是创建并返回一个新数组
var array = ['a', 'b'];
var elements = [0, 1, 2];
array.push.apply(array, elements);
console.info(array); // ["a", "b", 0, 1, 2]
```

## bind方法详解

bind()方法创建一个新的函数，在调用时设置this关键字为提供的值。并在调用新函数时，将给定参数列表作为原函数的参数序列的前若干项。

返回值：返回一个原函数的拷贝，并拥有指定的this值和初始参数。

```javascript
// 期望方法中的 this 是原来的对象（比如在回调中传入这个方法）。如果不做特殊处理的话，一般会丢失原来的对象。基于这个函数，用原始的对象创建一个绑定函数，巧妙地解决了这个问题：
this.x = 9;    // 在浏览器中，this指向全局的 "window" 对象
var module = {
  x: 81,
  getX: function() { return this.x; }
};

module.getX(); // 81

var retrieveX = module.getX;
retrieveX();
// 返回9 - 因为函数是在全局作用域中调用的

// 创建一个新函数，把 'this' 绑定到 module 对象
// 新手可能会将全局变量 x 与 module 的属性 x 混淆
var boundGetX = retrieveX.bind(module);
boundGetX(); // 81
```

## 闭包

闭包是函数和声明该函数的词法环境的组合。
闭包就是指有权访问另一个函数作用域中的变量的函数。

```javascript
function makeFunc() {
    var name = "Mozilla";
    function displayName() {
        alert(name);
    }
    return displayName;
}

var myFunc = makeFunc();
myFunc();

function makeFunc() {
    var name = "Mozilla";
    function displayName() {
        alert(name);
    }
    return displayName;//返回该函数
}

var myFunc = makeFunc();//return display
myFunc();
//闭包是由函数以及创建该函数的词法环境组合而成。这个环境包含了这个闭包创建时所能访问的所有局部变量。
//

function makeAdder(x) {
  return function(y) {
    return x + y;
  };
}

var add5 = makeAdder(5);
var add10 = makeAdder(10);

console.log(add5(2));  // 7
console.log(add10(2)); // 12
// add5 和 add10 都是闭包。它们共享相同的函数定义，但是保存了不同的词法环境。在 add5 的环境中，x 为 5。而在 add10 中，x 则为 10。
//

//实用的闭包节
function makeSizer(size) {
  return function() {
    document.body.style.fontSize = size + 'px';
  };
}

var size12 = makeSizer(12);
var size14 = makeSizer(14);
var size16 = makeSizer(16);

document.getElementById('size-12').onclick = size12;
document.getElementById('size-14').onclick = size14;
document.getElementById('size-16').onclick = size16;

<a href="#" id="size-12">12</a>
<a href="#" id="size-14">14</a>
<a href="#" id="size-16">16</a>
//

// 用闭包模拟私有方法
var Counter = (function() {
  var privateCounter = 0;
  function changeBy(val) {
    privateCounter += val;
  }
  return {
    increment: function() {
      changeBy(1);
    },
    decrement: function() {
      changeBy(-1);
    },
    value: function() {
      return privateCounter;
    }
  }
})();

console.log(Counter.value()); /* logs 0 */
Counter.increment();
Counter.increment();
console.log(Counter.value()); /* logs 2 */
Counter.decrement();
console.log(Counter.value()); /* logs 1 */

var Counter = (function() {
  var privateCounter = 0;
  function changeBy(val) {
    privateCounter += val;
  }
  return {
    increment: function() {
      changeBy(1);
    },
    decrement: function() {
      changeBy(-1);
    },
    value: function() {
      return privateCounter;
    }
  }
})();

console.log(Counter.value()); /* logs 0 */
Counter.increment();
Counter.increment();
console.log(Counter.value()); /* logs 2 */
Counter.decrement();
console.log(Counter.value()); /* logs 1 */
//这个环境中包含两个私有项：名为 privateCounter 的变量和名为 changeBy 的函数。这两项都无法在这个匿名函数外部直接访问。必须通过匿名函数返回的三个公共函数访问。

var makeCounter = function() {
  var privateCounter = 0;
  function changeBy(val) {
    privateCounter += val;
  }
  return {
    increment: function() {
      changeBy(1);
    },
    decrement: function() {
      changeBy(-1);
    },
    value: function() {
      return privateCounter;
    }
  }  
};

var Counter1 = makeCounter();
var Counter2 = makeCounter();
console.log(Counter1.value()); /* logs 0 */
Counter1.increment();
Counter1.increment();
console.log(Counter1.value()); /* logs 2 */
Counter1.decrement();
console.log(Counter1.value()); /* logs 1 */
console.log(Counter2.value()); /* logs 0 */
//每次调用其中一个计数器时，通过改变这个变量的值，会改变这个闭包的词法环境。然而在一个闭包内对变量的修改，不会影响到另外一个闭包中的变量。
//


//闭包面试题
function fun(n,o){
  console.log(o);
  return {
    fun: function(m){
      return fun(m,n);
    }
  };
}

var a = fun(0);  // ?
a.fun(1);        // ?
a.fun(2);        // ?
a.fun(3);        // ?

var b = fun(0).fun(1).fun(2).fun(3);  // ?

var c = fun(0).fun(1);  // ?
c.fun(2);        // ?
c.fun(3);        // ?
undefined
// 0
// 0
// 0
// undefined, 0, 1, 2
// undefined, 0
// 1
// 1
```

如果不是某些特定任务需要使用闭包，在其它函数中创建函数是不明智的，因为闭包在处理速度和内存消耗方面对脚本性能具有负面影响。

## 严格模式

``` javascript
  "use strict";
```

为未来的ECMAScript版本铺平道路

## 坑_待解决

匿名函数也称为函数表达式。函数表达式与函数声明有一些区别。函数声明会进行**声明提升（declaration hoisting）**，而函数表达式不会。

任何您想要被继承的方法都应该定义在构造函数的prototype对象里，并且永远使用父类的prototype来创造子类的prototype，这样才不会打乱类继承结构。ps:不定义在原型上会发生什么

## 问题方向

学习哪个框架 vue react
网络基础知识
