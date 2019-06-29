# node learning summary

``` javascript

//package.json文件下
"scripts": {
    "start": "node ./bin/www",
    "devstart": "nodemon ./bin/www"
  },
//文件 /bin/www 是应用入口！它做的第一件事是 require() “真实” 的应用入口（即项目根目录中的 app.js ）

//www 文件
var app = require('../app');

//app.js
var express = require('express');
var app = express();
...
module.exports = app;
//将其添加到 exports 模块（使它可以通过 /bin/www 导入）。
```

require() 是一个全局的 node 函数，可将模块导入当前文件。这里使用相对路径指定 app.js 模块，并省略了 .js 扩展名（可选）。
