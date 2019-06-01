# Learning summary

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

## 坑_待解决

匿名函数也称为函数表达式。函数表达式与函数声明有一些区别。函数声明会进行**声明提升（declaration hoisting）**，而函数表达式不会。

任何您想要被继承的方法都应该定义在构造函数的prototype对象里，并且永远使用父类的prototype来创造子类的prototype，这样才不会打乱类继承结构。ps:不定义在原型上会发生什么

## 问题方向

学习哪个框架 vue react
网络基础知识