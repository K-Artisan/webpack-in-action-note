[TOC]

# P1.课程介绍

## 视频教程

- 尚硅谷2020最新版Webpack5实战教程(从入门到精通)
  https://www.bilibili.com/video/BV1e7411j7T5?p=1

- 我的代码：https://github.com/K-Artisan/webpack-in-action-note

## 环境参数
+ Node.js 10+
+ Webpack 4.26+

## 预备技能
+ 基本Node.js知识 和 Npm指令
+ 熟悉ES6

# P2.Webpack简介

## 项目

### 初始化项目
```xml
cnpm init
```
在项目配置的步骤中
+ package name输入： webpack-first-demo，
+ main：index.js
+ 其它默认

### 安装jquery
```xml
cnpm install jquery --save
```

### 创建基本文件
+ index.html
```html
  <!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>webpack简介</title>
    <link rel="stylesheet" href="./index.less">
</head>

<body>
    <h1 id="title">Hello Webpack</h1>
    <script src="./index.js"></script>
</body>

</html>
```
+ index.js
```js
import $ from 'jquery';

$(function () {
    $('#title').click(function () {
        $('body').css('backgroundColor', 'deeppink');
    });
})
```

+ index.less
```css
body,
html {
    margin: 0;
    padding: 0;
    height: 100%;
    background-color: pink;
}

#title{
    color: #ffffff;
}
```

### 出现的问题
+ 浏览器无法识别ES6的语法 

至此在浏览器中浏览出现如下错误提示：
```xml
Uncaught SyntaxError: Cannot use import statement outside a module
```
原因是：

+ 浏览器无法识别ES6的语法

+ 浏览器无法识别`less`文件 
浏览器无法识别`less`文件，需要工具将`less`文件编译成`css`文件

+ 浏览器无法识别其它语言
浏览器无法识别其它语言(如jsx，vue)，需要特定的工具转化成js语法

### 构建工具

鉴于上节出现的问题，需要一个大的工具，把上面需要的一些小工具包装来，webpack就是这样一种构建工具

## Webpack是什么 
Webpack 是一种前端资源构建工具，一个静态模块打包器（module bunndler）。在Webpack看来，前端的所有资源文件（js\json\css\img\less\...）都会作为模块处理
它将根据模块的依赖关系进行静态分析，打包生成对应的静态资源（bundle）

### 入口文件

一般Rect、Vue开发，通常会将一个文件中引入整个项目需要的所有资源，如本例中的`index.js`，该文件称之为入口文件，在入口文件引入文件后

```html
//引入js资源
import $ from 'jquery';
//引入样式资源
import './index.less';
//引入图片、字体等资源
//...
```

就会产生一条依赖链：

```xml
├── index.js/
    ├── index.js 
    ├── index.less
    ├── jquery.js

```

Webpack将这些文件组成一个`chunk`（块），然后编译成浏览器能识别的js语法、css语法等，这个过程叫打包，然后输出一个文件，即`bundle`

```xm
├──入口文件：index.js
    ├── index.js                               
    ├── index.less        
    ├── jquery.js  
    ├── ...
 => webpack 
 => [chunk]
 => 编译
    ├── xxx.js(ES6，Vue等) ->js
    ├── index.less ->css  
 =>输出bundle.js
 
```

# P3.Webpack的5个核心概念

https://www.webpackjs.com/concepts/

## Entry

指示 webpack 应该使用哪个文件为入口启动开始打包，来作为构建其内部*依赖图*的开始。

## Output

告诉 webpack 打包后的资源*bundles*输出到哪里 ，以及如何命名这些文件，默认值为 `./dist`。基本上，整个应用程序结构，都会被编译到你指定的输出路径的文件夹中。你可以通过在配置中指定一个 `output` 字段，来配置这些处理过程：

## Loader

让 webpack 能够去处理那些非 JavaScript 文件（webpack 自身只理解 JavaScript）

## Plugins

插件则可以用于执行范围更广的任务。插件的范围包括，从打包优化和压缩，一直到重新定义环境中的变量。[插件接口](https://www.webpackjs.com/api/plugins)功能极其强大，可以用来处理各种各样的任务。

## Mode

模式（Mode）指示webpack使用相应的模式配置

|    选项     |                             描述                             |            特点            |
| :---------: | :----------------------------------------------------------: | :------------------------: |
| development | 会将process.NODE_ENV的值设置为development,启用NamedChunksPlugin和NamedModulesPlugin | 能让代码本地调试运行的环境 |
| production  | 会将process.NODE_ENV设置为production,启用ModuleConcatenation，NoEmitOnErrorsPlugin等 | 能让代码优化上线运行的环境 |

# P4. Webpack初体验

## 创建项目

### 初始化项目

```xml
cnpm init
```

   初始配置如下：

```xml
{
  "name": "webpack-test",
  "version": "1.0.0",
  "description": "Webpack初体验",
  "main": "src/index.js",
  "scripts": {
    "test": "echo \"Error: no test specified\" && exit 1"
  },
  "author": "",
  "license": "ISC"
}
```

### 安装webpack和webpack-cli

这里进行全局安装
```xml
cnpm install webpack webpack-cli -g
```
在添加到开发依赖
```xml
cnpm install webpack webpack-cli -D
```
这时`package.json`文件，新增如下开发依赖:
```json
  "devDependencies": {
    "webpack": "^4.43.0",
    "webpack-cli": "^3.3.12"
  }
```

## 创建基本文件

## 项目结构

手动创建文件夹及其文件:

+ build
+ src和 src/index.js
+ src\index.html

至此，项目结构如下：

```xml
/P04.Webpack初体验
    ├── build                               
    ├── src  
        ├── index.html
        ├── index.js  
    ├── node_module 
    ├── package.json
```
## 首页index.html

创建首页文件`build/index.html`

```html
<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Document</title>
</head>

<body>
    <!-- 引入打包后的资源 -->
    <script src="./built.js"></script>
</body>

</html>
```


## 入口文件

将入口文件`index.js`修改为:

```js
/*
index.js: webpack入口起点文件

1. 运行指令：
   开发环境：webpack ./src/index.js -o ./build/built.js --mode=development
   生成环境：webpack ./src/index.js -o ./build/built.js --mode=production
*/

function add(x, y) {
    return x + y;
}

console.log(add(1,2));
```



##  运行开发指令

```xml
webpack ./src/index.js -o ./build/built.js --mode=development
```

结果提示：

```xml
Hash: b67461cf072bee7f194e
Version: webpack 4.43.0
Time: 142ms
Built at: 2020-07-13 1:18:15
   Asset      Size  Chunks             Chunk Names
built.js  4.03 KiB    main  [emitted]  main
Entrypoint main = built.js
[./src/index.js] 240 bytes {main} [built]
```

- Hash:每次运行命令都产生一个唯一值

开发环境打包的输出的文件`built.js`

```js
/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, { enumerable: true, get: getter });
/******/ 		}
/******/ 	};
/******/
/******/ 	// define __esModule on exports
/******/ 	__webpack_require__.r = function(exports) {
/******/ 		if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 			Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 		}
/******/ 		Object.defineProperty(exports, '__esModule', { value: true });
/******/ 	};
/******/
/******/ 	// create a fake namespace object
/******/ 	// mode & 1: value is a module id, require it
/******/ 	// mode & 2: merge all properties of value into the ns
/******/ 	// mode & 4: return value when already ns object
/******/ 	// mode & 8|1: behave like require
/******/ 	__webpack_require__.t = function(value, mode) {
/******/ 		if(mode & 1) value = __webpack_require__(value);
/******/ 		if(mode & 8) return value;
/******/ 		if((mode & 4) && typeof value === 'object' && value && value.__esModule) return value;
/******/ 		var ns = Object.create(null);
/******/ 		__webpack_require__.r(ns);
/******/ 		Object.defineProperty(ns, 'default', { enumerable: true, value: value });
/******/ 		if(mode & 2 && typeof value != 'string') for(var key in value) __webpack_require__.d(ns, key, function(key) { return value[key]; }.bind(null, key));
/******/ 		return ns;
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = "./src/index.js");
/******/ })
/************************************************************************/
/******/ ({

/***/ "./src/index.js":
/*!**********************!*\
  !*** ./src/index.js ***!
  \**********************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("/*\r\nindex.js: webpack入口起点文件\r\n\r\n1. 运行指令：\r\n   开发环境：webpack ./src/index.js -o ./build/built.js --mode=development\r\n   生成环境：\r\n\r\n*/\r\n\r\nfunction add(x, y) {\r\n    return x + y;\r\n}\r\n\r\nconsole.log(add(1,2));\n\n//# sourceURL=webpack:///./src/index.js?");

/***/ })

/******/ });
```

## 运行生产环境指令

```xml
webpack ./src/index.js -o ./build/built.js --mode=production 
```

数据结果:

```xml
Hash: 36798d9d9dd4621913cb
Version: webpack 4.43.0
Time: 357ms
Built at: 2020-07-13 1:26:56
   Asset       Size  Chunks             Chunk Names
built.js  946 bytes       0  [emitted]  main
Entrypoint main = built.js
[0] ./src/index.js 300 bytes {0} [built]
```

生产环境打包的输出的文件`built.js`

```htm
!function(e){var t={};function n(r){if(t[r])return t[r].exports;var o=t[r]={i:r,l:!1,exports:{}};return e[r].call(o.exports,o,o.exports,n),o.l=!0,o.exports}n.m=e,n.c=t,n.d=function(e,t,r){n.o(e,t)||Object.defineProperty(e,t,{enumerable:!0,get:r})},n.r=function(e){"undefined"!=typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(e,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(e,"__esModule",{value:!0})},n.t=function(e,t){if(1&t&&(e=n(e)),8&t)return e;if(4&t&&"object"==typeof e&&e&&e.__esModule)return e;var r=Object.create(null);if(n.r(r),Object.defineProperty(r,"default",{enumerable:!0,value:e}),2&t&&"string"!=typeof e)for(var o in e)n.d(r,o,function(t){return e[t]}.bind(null,o));return r},n.n=function(e){var t=e&&e.__esModule?function(){return e.default}:function(){return e};return n.d(t,"a",t),t},n.o=function(e,t){return Object.prototype.hasOwnProperty.call(e,t)},n.p="",n(n.s=0)}([function(e,t){console.log(1+2)}]);
```

在浏览器中运行，在控制台查看输出：

```xml
3
```

### 结论

1. 生产环境生产的代码进行了优化压缩
2. 生成环境和开发环境将ES6模块化编译成浏览器能识别的模块化

## 验证Json文件的打包

创建json文件`src\data.json`:

```json
{
    "name": "jack",
    "age": 18
}
```

在`src/index.js`引入 json文件

```js
import data from './data.json';
...
console.log(data);
```

再次运行build指令：

```xml
webpack ./src/index.js -o ./build/built.js --mode=development
```

输出结果：

```xml
Hash: ef5d53549838e82e088b
Version: webpack 4.43.0
Time: 76ms
Built at: 2020-07-13 1:45:13
   Asset      Size  Chunks             Chunk Names
built.js  4.75 KiB    main  [emitted]  main
Entrypoint main = built.js
[./src/data.json] 40 bytes {main} [built]
[./src/index.js] 333 bytes {main} [built]
```

查看输出文件`built.js`

```js
...
/***/ "./src/data.json":
/*!***********************!*\
  !*** ./src/data.json ***!
  \***********************/
/*! exports provided: name, age, default */
/***/ (function(module) {

eval("module.exports = JSON.parse(\"{\\\"name\\\":\\\"jack\\\",\\\"age\\\":18}\");\n\n//# sourceURL=webpack:///./src/data.json?");
...
```

将`data.json`文件也引入

浏览器控制台输出：

```xml
3
{name: "jack", age: 18}
name: "jack"
age: 18
...
```

### 结论

webpack可以处理Json文件



## 验证处理css文件

创建css文件`src\index.css`:

```json
body,
html {
    margin: 0;
    padding: 0;
    height: 100%;
    background-color: pink;
}

```

在`src/index.js`引入 `index.css`文件

```js
import './index.css';
...
```

再次运行build指令：

```xml
webpack ./src/index.js -o ./build/built.js --mode=development
```

输出结果：

```xml
ERROR in ./src/index.css 2:5
Module parse failed: Unexpected token (2:5)
You may need an appropriate loader to handle this file type, currently no loaders are configured to process this file. See https://webpack.js.org/concepts#loaders
| body,
> html {
|     margin: 0;
|     padding: 0;
 @ ./src/index.js 9:0-21
```

报错了！！！，打包失败了

### 结论

Webpack不能处理css/img等其它资源，

那如何打包css/img等其它资源，请看下一节



# P5.打包样式资源

## 打包CSS文件

Webpack不能处理css资源，需要引入`Loader`，

参考官方文档：https://www.webpackjs.com/concepts/loaders/

### webpack的配置和引入Loader

在项目根目录下创建webpack的配置文件`webpack.config.js`：

```js
/*
文件名：webpack.config.js:webpack配置文件
作  用：指示webpackg干什么活，当运行webpack指令时，会加载里面的配置

所以的构建工具都是基于node.js 平台运行的，模块化默认采用commonJs

*/

const {
    resolve //用于拼接绝对路径
} = require('path');

module.exports = {
    //入口起点
    entry: './src/index.js',
    //输出
    output: {
        //输出文件名
        filename: 'built.js',
        //输出路径
        //__dirname:nodejs的全局变量，表示当前文件所在目录的绝对路径
        path: resolve(__dirname, 'build')
    },
    //Loader的配置
    module: {
        rules: [ //详细的loader配置
            // css-loader
            {
                //匹配那些文件，这里使用正则表达式进行匹配
                test: /\.css$/,
                //使用哪里具体的loader，执行顺序是从下往上
                use: [
                    //创建style标签，将js中的样式资源插入，添加到head中生效
                    'style-loader',
                    //将css文件变成commonJs模块加载到js中，里面的内容是样式字符串
                    'css-loader'
                ]
            },
        ]
    },
    // plugins的配置
    plugins: [

    ],
    //模式
    mode: "development"
    //mode:"production"

}
```

### 安装style-loader和css-loader

```xml
cnpm install style-loader css-loader -D
```

```json
  "devDependencies": {
    "css-loader": "^3.6.0",
    "style-loader": "^1.2.1",
    "webpack": "^4.43.0",
    "webpack-cli": "^3.3.12"
  }
```


### 运行webpack

在命令行输入

```xml
webpack
```

输出结果：

```xml
Hash: c210dbb4c83cb16ce67b
Version: webpack 4.43.0
Time: 459ms
Built at: 2020-07-13 3:08:03
   Asset    Size  Chunks             Chunk Names
built.js  17 KiB    main  [emitted]  main
Entrypoint main = built.js
[./node_modules/_css-loader@3.6.0@css-loader/dist/cjs.js!./src/index.css] 363 bytes {main} [built]
[./src/index.css] 557 bytes {main} [built]
[./src/index.js] 255 bytes {main} [built]
    + 2 hidden modules
```

`build\bulit.js`文件中导入的`index.css`

```js
...

/***/ "./node_modules/_css-loader@3.6.0@css-loader/dist/cjs.js!./src/index.css":
/*!*******************************************************************************!*\
  !*** ./node_modules/_css-loader@3.6.0@css-loader/dist/cjs.js!./src/index.css ***!
  \*******************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

eval("// Imports\nvar ___CSS_LOADER_API_IMPORT___ = __webpack_require__(/*! ../node_modules/_css-loader@3.6.0@css-loader/dist/runtime/api.js */ \"./node_modules/_css-loader@3.6.0@css-loader/dist/runtime/api.js\");\nexports = ___CSS_LOADER_API_IMPORT___(false);\n// Module\nexports.push([module.i, \"body,\\r\\nhtml {\\r\\n    margin: 0;\\r\\n    padding: 0;\\r\\n    height: 100%;\\r\\n    background-color: pink;\\r\\n}\\r\\n\", \"\"]);\n// Exports\nmodule.exports = exports;\n\n\n//# sourceURL=webpack:///./src/index.css?./node_modules/_css-loader@3.6.0@css-loader/dist/cjs.js");

/***/ }),
    
....
```

## 打包less资源文件

创建`src\index.less`文件：

```less
#title {
    color: brown;
}
```

并在`index.js`文件中导入

```html
import './index.less';
```

### less-loader

 less-loader 将less文件编译成css文件,

需要下载安装：less和less-loader

```xml
cnpm install less --save-dev
cnpm install less-loader --save-dev
```

```xml
  "devDependencies": {
    ...
    "less": "^3.11.3",
    "less-loader": "^6.2.0",
  }
```



### web配置文件添加less-loader

```js
    //Loader的配置
    module: {
        rules: [
            ....
            // 处理less文件
            {
                //匹配那些文件，这里使用正则表达式进行匹配
                test: /\.less$/,
                //使用哪里具体的loader，执行顺序是从下往上
                use: [
                    //创建style标签，将js中的样式资源插入，添加到head中生效
                    'style-loader',
                    //将css文件变成commonJs模块加载到js中，里面的内容是样式字符串
                    'css-loader',
                    //将less文件编译成css文件
                    //需要下载less和less-loader
                    'less-loader'
                ]
            },
        ]
    },
        ...
```

### 其它文件

+ index.html

```html
<body>
    <h1 id="title">标题</h1>
    <!-- 引入打包后的资源 -->
    <script src="./built.js"></script>
</body>
```

### 运行webpack

在命令行输入

```xml
webpack
```

输出结果：

```xml
Hash: 607e9846a1cfaea095e5
Version: webpack 4.43.0
Time: 467ms
Built at: 2020-07-13 3:49:59
   Asset      Size  Chunks             Chunk Names
built.js  19.6 KiB    main  [emitted]  main
Entrypoint main = built.js
[./node_modules/_css-loader@3.6.0@css-loader/dist/cjs.js!./node_modules/_less-loader@6.2.0@less-loader/dist/cjs.js!./src/index.less] 280 bytes {main} [built]
[./node_modules/_css-loader@3.6.0@css-loader/dist/cjs.js!./src/index.css] 363 bytes {main} [built]
[./src/index.css] 557 bytes {main} [built]
[./src/index.js] 275 bytes {main} [built]
[./src/index.less] 617 bytes {main} [built]
```



# P6. 打包html资源

```htm
<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Webpack</title>
</head>

<body>
    <h1 id="title">标题-打包html</h1>
    <!-- 注意-这里没有引入js文件，html-webpack-plugin插件会自动已入打包输出的所有资源 -->
</body>

</html>
```

```js
function add(x, y) {
   return x + y;
}

console.log(add(1, 2))
```

## 安装 html-webpack-plugin

```xml
cnpm install html-webpack-plugin --save-dev
```

## 添加webpack.config.js的插件配置

```json
/*
文件名：webpack.config.js:webpack配置文件
作  用：指示webpackg干什么活，当运行webpack指令时，会加载里面的配置

所以的构建工具都是基于node.js 平台运行的，模块化默认采用commonJs

loader 安装，使用
plugin 安装，已入，使用

*/

const {
    resolve
} = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin') //引入打包htm插件

module.exports = {
    //入口起点
    entry: './src/index.js',
    //输出
    output: {
        //输出文件名
        filename: 'built.js',
        //输出路径
        //__dirname:nodejs的全局变量，表示当前文件所在目录的绝对路径
        path: resolve(__dirname, 'build')
    },
    //Loader的配置
    module: {
        rules: []
    },
    // plugins的配置
    plugins: [
        //html-webpack-plugin:
        //默认 创建一个空的html,并且自动已入打包输出的所有资源
        new HtmlWebpackPlugin({
            'template': './src/index.html'
        })
    ],
    //模式
    mode: "development"
    //mode:"production"

}
```

运行` webpack`命令进行打包

+ index.html自动引用打包文件

```html
        //默认 创建一个空的html,并且自动已入打包输出的所有资源
        new HtmlWebpackPlugin({
            'template': './src/index.html'
        })
```



# P7. 打包图片资源

## 安装 loader

### url-loader

```xml
 cnpm install url-loader file-loader --save-dev
```

不能处理 html 中文件中引用的图片，需要额外引用 `html-loader`

### html-loader

```xml
 cnpm install html-loader --save-dev
```



## index.html

```html
<!DOCTYPE html>
<html  lang="en">

<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Webpack</title>
</head>

<body>
    <h1 id="title">标题-打包图片</h1>
    <div id="box1"></div>
    <div id="box2"></div>
    <img src="./image/logo-vue.png" />
    <img src="./image/vue.jpg" />

</body>

</html>
```

## index.js

```js
import './index.less';
```

## index.less

```css
#box1 {
    width: 100px;
    height: 100px;
    background-image: url('./image/logo-vue.png');
    background-repeat: no-repeat;
    background-size: 100% 100%;
}

#box2 {
    width: 200px;
    height: 300px;
    background-image: url('./image/vue.jpg');
    background-repeat: no-repeat;
    background-size: 100% 100%;
}
```

## webpack.config.js

```json
const {
    resolve
} = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin') //引入打包htm插件

module.exports = {
    //入口起点
    entry: './src/index.js',
    //输出
    output: {
        //输出文件名
        filename: 'built.js',
        //输出路径
        //__dirname:nodejs的全局变量，表示当前文件所在目录的绝对路径
        path: resolve(__dirname, 'build')
    },
    //Loader的配置
    module: {
        rules: [
            // 处理less文件
            {
                //匹配那些文件，这里使用正则表达式进行匹配
                test: /\.less$/,
                //使用哪里具体的loader，执行顺序是从下往上
                use: [
                    //创建style标签，将js中的样式资源插入，添加到head中生效
                    'style-loader',
                    //将css文件变成commonJs模块加载到js中，里面的内容是样式字符串
                    'css-loader',
                    //将less文件编译成css文件
                    //需要下载less和less-loader
                    'less-loader'
                ]
            },
            // 处理图片文件
            {
                test: /\.(jpg|png|gif)$/,
                //多个loader，使用use:数组，只有一个loader，使用loader:
                loader: 'url-loader', //需要下载url-loader, file-loader
                options: {
                    //当图片小于8kb，就会被base64处理，
                    //优点-减少请求次数，
                    //确定-图片体积变大，影响页面加载时间
                    limit: 8 * 1024
                }
            },
            {
                test: /\.html$/,
                //处理HTML中的img图片，负责引入img,从而被url-loader处理
                loader: 'html-loader'
            }
        ]
    },
    // plugins的配置
    plugins: [
        //html-webpack-plugin:
        //默认 创建一个空的html,并且自动已入打包输出的所有资源
        new HtmlWebpackPlugin({
            'template': './src/index.html'
        })
    ],
    //模式
    mode: "development"
    //mode:"production"

}
```

## 打包

运行命令

```xml
webpack
```

打包结果

- index.html

```html
...
<body>
    <h1 id="title">标题-打包图片</h1>
    <div id="box1"></div>
    <div id="box2"></div>
    <img src="data:image/png;base64,iVBORw........ToL+DiQAAAABJRU5ErkJggg==" />
    <img src="fbadfdd0dbc8211228d195a9b64a4c80.jpg" />

<script src="built.js"></script></body>
...
```

# P8. 打包其它资源

## index.html

```htm
<body>
    <h1 id="title">标题-打包其它文件-字体、</h1>
    <span class="iconfont icon-aixin">成功</span>
    <span class="iconfont icon-chenggong">爱心</span>
    <span class="iconfont icon-dianyingpiao">电影票</span>
    <span class="iconfont icon-fenxiang">分享</span>
    <script src="built.js"></script>
</body>
```

## index.js

```js
import './icons/iconfont.css';
```

## webpack.config.js

打包其它资源

```json
            //打包其它资源，
            {
                exclude: /\.(css|js|html|jpg|png|gif)$/,
                loader: 'file-loader'
            }
```

完整配置

```js
const {
    resolve
} = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin') //引入打包htm插件

module.exports = {
    //入口起点
    entry: './src/index.js',
    //输出
    output: {
        //输出文件名
        filename: 'built.js',
        //输出路径
        //__dirname:nodejs的全局变量，表示当前文件所在目录的绝对路径
        path: resolve(__dirname, 'build')
    },
    //Loader的配置
    module: {
        rules: [
            // 处理css文件
            {
                //匹配那些文件，这里使用正则表达式进行匹配
                test: /\.css$/,
                //使用哪里具体的loader，执行顺序是从下往上
                use: [
                    //创建style标签，将js中的样式资源插入，添加到head中生效
                    'style-loader',
                    //将css文件变成commonJs模块加载到js中，里面的内容是样式字符串
                    'css-loader'
                ]
            },
            // 处理less文件
            {
                //匹配那些文件，这里使用正则表达式进行匹配
                test: /\.less$/,
                //使用哪里具体的loader，执行顺序是从下往上
                use: [
                    //创建style标签，将js中的样式资源插入，添加到head中生效
                    'style-loader',
                    //将css文件变成commonJs模块加载到js中，里面的内容是样式字符串
                    'css-loader',
                    //将less文件编译成css文件
                    //需要下载less和less-loader
                    'less-loader'
                ]
            },
            // 处理图片文件
            {
                test: /\.(jpg|png|gif)$/,
                //多个loader，使用use:数组，只有一个loader，使用loader:
                loader: 'url-loader', //需要下载url-loader, file-loader
                options: {
                    //当图片小于8kb，就会被base64处理，
                    //优点-减少请求次数，
                    //确定-图片体积变大，影响页面加载时间
                    limit: 8 * 1024
                }
            },
            {
                test: /\.html$/,
                //处理HTML中的img图片，负责引入img,从而被url-loader处理
                loader: 'html-loader'
            },
            //打包其它资源，
            {
                exclude: /\.(css|less|js|html|jpg|png|gif)$/,
                loader: 'file-loader'
            }
        ]
    },
    // plugins的配置
    plugins: [
        //html-webpack-plugin:
        //默认 创建一个空的html,并且自动已入打包输出的所有资源
        new HtmlWebpackPlugin({
            'template': './src/index.html'
        })
    ],
    //模式
    mode: "development"
    //mode:"production"

}
```

# P9.devServer

  开发服务器,用来自动化（自动编译、自动打开、刷新刘浏览器）

  特点:只会在内存中存在编译，不会有任何输出

  启动devServer的指令:npx webpack-dev-server

## 安装 devServer

```xml
cnpm install webpack-dev-server --save-dev
```
## webpack.config.js

```json
    ....
    //模式
    mode: "development",
    //mode:"production"

    /*开发服务器,用来自动化（自动编译、自动打开、刷新刘浏览器）
    特点:只会在内存中存在编译，不会有任何输出
    启动devServer的指令:npx webpack-dev-server
    */
    devServer: {
        contentBase: resolve(__dirname, 'build'), //项目构建后路径
        compress: true, //启用gzip压缩
        port: 3000, //端口
        open: true //自动打开浏览器
    }
```
## 运行指令

```xml
npx webpack-dev-server
```

运行命令后 自动打开浏览器，修改HTML文件，自动编译和刷新刘浏览器，



# P10.开发环境配置

文件归类到相应的文件夹中，

```xml
/P10.开发环境配置
    ├── build                               
    ├── src  
        ├── index.html
        ├── js 
        	├── index.js  
        ├── css 
        	├── index.css 
            ├── iconfont.css 
        ├── image 
        	├── vue.png 
    ├── node_module 
    ├── package.json
    ├── webpack.config.js
```

##   webpack.config.js 的根据文件文字进行调整

```json
    //入口起点
    entry: './src/js/index.js',
    ...
            // 处理图片文件
            {
                loader: 'url-loader', 
                options: { 
                    ...
                    outputPath: 'image'
                }
            }
```

完整配置

```json
const {
    resolve
} = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin') //引入打包htm插件

module.exports = {
    //入口起点
    entry: './src/js/index.js',
    //输出
    output: {
        //输出文件名
        filename: 'js/built.js',
        //输出路径
        //__dirname:nodejs的全局变量，表示当前文件所在目录的绝对路径
        path: resolve(__dirname, 'build')
    },
    //Loader的配置
    module: {
        rules: [
            // 处理css文件
            {
                //匹配那些文件，这里使用正则表达式进行匹配
                test: /\.css$/,
                //使用哪里具体的loader，执行顺序是从下往上
                use: [
                    //创建style标签，将js中的样式资源插入，添加到head中生效
                    'style-loader',
                    //将css文件变成commonJs模块加载到js中，里面的内容是样式字符串
                    'css-loader'
                ]
            },
            // 处理less文件
            {
                //匹配那些文件，这里使用正则表达式进行匹配
                test: /\.less$/,
                //使用哪里具体的loader，执行顺序是从下往上
                use: [
                    //创建style标签，将js中的样式资源插入，添加到head中生效
                    'style-loader',
                    //将css文件变成commonJs模块加载到js中，里面的内容是样式字符串
                    'css-loader',
                    //将less文件编译成css文件
                    //需要下载less和less-loader
                    'less-loader'
                ]
            },
            // 处理图片文件
            {
                test: /\.(jpg|png|gif)$/,
                //多个loader，使用use:数组，只有一个loader，使用loader:
                loader: 'url-loader', //需要下载url-loader, file-loader
                options: {
                    //当图片小于8kb，就会被base64处理，
                    //优点-减少请求次数，
                    //确定-图片体积变大，影响页面加载时间
                    limit: 8 * 1024,
                    outputPath: 'image'
                }
            },
            {
                test: /\.html$/,
                //处理HTML中的img图片，负责引入img,从而被url-loader处理
                loader: 'html-loader'
            },
            //打包其它资源，
            {
                exclude: /\.(css|less|js|html|jpg|png|gif)$/,
                loader: 'file-loader'
            }
        ]
    },
    // plugins的配置
    plugins: [
        //html-webpack-plugin:
        //默认 创建一个空的html,并且自动已入打包输出的所有资源
        new HtmlWebpackPlugin({
            'template': './src/index.html'
        })
    ],
    //模式
    mode: "development",
    //mode:"production"

    /*开发服务器,用来自动化（自动编译、自动打开、刷新刘浏览器）
    特点:只会在内存中存在编译，不会有任何输出
    启动devServer的指令:npx webpack-dev-server
    */
    devServer: {
        contentBase: resolve(__dirname, 'build'), //项目构建后路径
        compress: true, //启用gzip压缩
        port: 3000, //端口
        open: true //自动打开浏览器
    }
}
```

# P11.构建环境的介绍

# P12.提取CSS成单独文件

## mini-css-extract-plugin

​    该插件提取css文件为单独的文件，

安装

```xml
cnpm install mini-css-extract-plugin --save-dev
```

## webpack.config.js

```json
const {
    resolve
} = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin') //引入打包htm插件
const MiniCssExtractPlugin = require('mini-css-extract-plugin') //引入提取css文件插件

module.exports = {
    //入口起点
    entry: './src/js/index.js',
    //输出
    output: {
        //输出文件名
        filename: 'js/built.js',
        //输出路径
        //__dirname:nodejs的全局变量，表示当前文件所在目录的绝对路径
        path: resolve(__dirname, 'build')
    },
    //Loader的配置
    module: {
        rules: [
            // 处理css文件
            {
                //匹配那些文件，这里使用正则表达式进行匹配
                test: /\.css$/,
                //使用哪里具体的loader，执行顺序是从下往上
                use: [
                    //创建style标签，将js中的样式资源插入，添加到head中生效
                    //'style-loader',
                    //这个loader取代style-loader，提取css文件为单独的文件
                    MiniCssExtractPlugin.loader,
                    //将css文件变成commonJs模块加载到js中，里面的内容是样式字符串
                    'css-loader'
                ]
            }

        ]
    },
    // plugins的配置
    plugins: [
        //html-webpack-plugin:
        //默认 创建一个空的html,并且自动已入打包输出的所有资源
        new HtmlWebpackPlugin({
            'template': './src/index.html'
        }),
        new MiniCssExtractPlugin({
            //对输出的css文件进行重名命
            filename: 'css/buit.css'
        })
    ],
    //模式
    mode: "development",
    //mode:"production"
}
```

## 打包

最终的打包结果

``` htm
<!DOCTYPE html>
<html lang="en">

<head>
...
    <link href="css/buit.css" rel="stylesheet"></head>

<body>
    <div id="box1">1</div>
    <div id="box2">2</div>
    <script src="js/built.js"></script></body>

</html>
```



# P13.CSS兼容性处理

css兼容性处理,安装 postcss-loader 和postcss-preset-env插件

## post-css-loader

```xml
cnpm install postcss-loader  --save-dev
```



## 插件post-preset-env

​         帮postcss找到`package.json`中的`browserslist`中的配置

 通过配置加载指定的css兼容样式,默认使用生成环境的配置，设置node.js的环境变量,`process.env.NODE_ENV = 'development';`

```xml
cnpm install postcss-preset-env --save-dev
```

## package.json

添加`browserslist`配置

```xml
{
  "name": "webpack-style-css",
   ...
  "browserslist": {
    "development": ["last 1 chrome version", "last 1 firefox version", "last 1 safari version"],
    "production": [">0.1%", "not dead", "not op_mini_all"]
  }
}
```

## webpack.config.js

```json
                    'css-loader',
                    {
                        loader: 'postcss-loader',
                        options: {
                            ident: 'postcss',
                            plugins: [
                                //postcss插件
                                require('postcss-preset-env')()
                            ]
                        }
                    }
```

完整配置

```json
const {
    resolve
} = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin') //引入打包htm插件
const MiniCssExtractPlugin = require('mini-css-extract-plugin') //引入提取css文件插件

//设置node.js的环境变量
process.env.NODE_ENV = 'development';

module.exports = {
    //入口起点
    entry: './src/js/index.js',
    //输出
    output: {
        //输出文件名
        filename: 'js/built.js',
        //输出路径
        //__dirname:nodejs的全局变量，表示当前文件所在目录的绝对路径
        path: resolve(__dirname, 'build')
    },
    //Loader的配置
    module: {
        rules: [
            // 处理css文件
            {
                //匹配那些文件，这里使用正则表达式进行匹配
                test: /\.css$/,
                //使用哪里具体的loader，执行顺序是从下往上
                use: [
                    //创建style标签，将js中的样式资源插入，添加到head中生效
                    //'style-loader',
                    //这个loader取代style-loader，提取css文件为单独的文件
                    MiniCssExtractPlugin.loader,
                    //将css文件变成commonJs模块加载到js中，里面的内容是样式字符串
                    'css-loader',
                    /*css兼容性处理
                      1.postcss -> 
                         postcss-loader 
                         postcss-preset-env插件
                      2.帮postcss找到package.json中的browserslist中的配置
                        ，通过配置加载指定的css兼容样式,默认使用生成环境的配置，设置node.js的环境变量,process.env.NODE_ENV = 'development';
                    */
                    {
                        loader: 'postcss-loader',
                        options: {
                            ident: 'postcss',
                            plugins: [
                                //postcss插件
                                require('postcss-preset-env')()
                            ]
                        }
                    }
                ]
            }

        ]
    },
    // plugins的配置
    plugins: [
        //html-webpack-plugin:
        //默认 创建一个空的html,并且自动已入打包输出的所有资源
        new HtmlWebpackPlugin({
            'template': './src/index.html'
        }),
        new MiniCssExtractPlugin({
            //对输出的css文件进行重名命
            filename: 'css/buit.css'
        })
    ],
    //模式
    mode: "development",
    //mode:"production"
}
```

## 开发环境

`process.env.NODE_ENV = 'development';`

css 被处理为

```css
#box1 {
    width: 100%;
    height: 100%;
    background-color: aqua;
    display: flex;
    -webkit-backface-visibility: hidden;
    backface-visibility: hidden;
}
```

## 生成环境

```xml
#box1 {
    width: 100%;
    height: 100%;
    background-color: aqua;
    display: -webkit-box;
    display: flex;
    -webkit-backface-visibility: hidden;
            backface-visibility: hidden;
}
```



# P14.压缩CSS

# 插件 optimize-css-assets-webpack-plugin

## 安装

```xml
cnpm install optimize-css-assets-webpack-plugin --save-dev
```

## webpack.config.js

```json
    plugins: [
        ...
        new optimizeCssAssetsWebpackPlugin()
    ],
```



# P15.JS语法检查eslint

##  eslint-loader

```xml
cnpm install eslint eslint-loader --save-dev
```

## 检查规则-airbnb

设置检测规则`package.json`中`eslintConfig`中设置

+ 需要安装eslint-config-airbnb、 eslint-plugin-import、 eslint

```xml
cnpm install eslint-config-airbnb eslint-plugin-import --save-dev
```

+ `package.json`配置

```jso
  "eslintConfig": {
    "extends": "airbnb-base"
  }
```

## webpack.config.js

```json
   //Loader的配置
    module: {
        rules: [
            ...
            /*eslint 语法检查
             */
            {
                test: /\.js$/,
                exclude: /node_modules/, //只检查自己的代码，第三方库不检查
                loader: 'eslint-loader',
                options: {
                    /**设置检测规则
                     * package.json中eslintConfig中设置
                     * airbnb-->需要安装eslint-config-airbnb  eslint-plugin-import eslint
                     * 
                     */
                    fix: true //自动修复
                }
            }
```

# P16.JS兼容性处理eslint

## babel-loader

js兼容性处理:babel-loader @babel/preset-env

```xml
cnpm install babel-loader  @babel/core @babel/preset-env --save-dev 
```

## @babel/preset-env 

只能转换基本的语法

+ index.js

```js
const add = (x, y) => x + y;

console.log(add(1, 2));
alert(add(1, 2))
```

## @babel/polyfill

@babel/poyfill 检查全部兼容性,

安装

```xml
cnpm install @babel/polyfill --save-dev 
```

+ index.js

需要引入`import '@babel/polyfill';`

```js
import '@babel/polyfill';

const add = (x, y) => x + y;
console.log(add(1, 2));

const promise = new Promise(resolve => {
  setTimeout(() => {
    console.log('定时器执行完成');
    resolve();
  }, 1000)
})

console.log(promise);
```

 + webpack.config.js

```json
            /*js兼容性处理:babel-loader @babel/core @babel/preset-env
             */
            {
                test: /\.js$/,
                exclude: /node_modules/, //只检查自己的代码，第三方库不检查
                loader: 'babel-loader',
                options: {
                    //预设,只是babel-loader做怎样的兼容性处理
                    presets: ['@babel/preset-env']
                }
            }
```



 + 出现的问题

js文件变大，原文件才4kb，编译后479kb

```xm
Version: webpack 4.43.0
Time: 3557ms
Built at: 2020-07-24 17:14:42
      Asset       Size  Chunks             Chunk Names
js/built.js    479 KiB    main  [emitted]  main

```

  需求只是为 解决部分问题，但将所有兼容性代码全部已入，体积太大了

## 按需兼容 core-js

按需兼容，

### 安装

```xml
cnpm install core-js --save-dev
```

### webpack.config.js

```json
...
 //Loader的配置
    module: {
        rules: [
            /*js兼容性处理:babel-loader @babel/core @babel/preset-env
             */
            {
                test: /\.js$/,
                exclude: /node_modules/, //只检查自己的代码，第三方库不检查
                loader: 'babel-loader',
                options: {
                    //预设,只是babel-loader做怎样的兼容性处理
                    presets: [
                        [
                            '@babel/preset-env',
                            {
                                useBuiltIns: 'usage', //按需加载
                                corejs: { //指定core-js版本
                                    version: 3
                                },
                                targets: { //指定兼容的浏览器版本
                                    chrome: '60',
                                    firefox: '60',
                                    ie: '9',
                                    safari: '10',
                                    edge: '17',
                                }
                            }
                        ]
                    ]
                }
            }
        ]
    }
```



###  index.js

不使用`babel/polyfill`，将其相关代码注释

```js
//import '@babel/polyfill';

const add = (x, y) => x + y;
console.log(add(1, 2));

const promise = new Promise(resolve => {
  setTimeout(() => {
    console.log('定时器执行完成');
    resolve();
  }, 1000)
})

console.log(promise);
```

编译结果

```xml
Version: webpack 4.43.0
Time: 2774ms
Built at: 2020-07-24 18:16:32
      Asset       Size  Chunks             Chunk Names
js/built.js    112 KiB    main  [emitted]  main
```



# P17.压缩hmtl和js

生产环境下

+ `webpackage`自动压缩js文件
+ html压缩使用`html-webpack-plugin`

##  html-webpack-plugin

html压缩使用`html-webpack-plugin`

安装配置，见到  **P06.打包html资源** 

## webpack.config.js

+ 修改成生产环境

```xml
mode: "production"
```

+ 添加配置

```xml
           'minify': {
                collapseWhitespace: true, //移除空格
                removeComments: true, //移除注释
            }
```

实测，` "html-webpack-plugin": "^4.3.0",`自动移除空格和移除注释，不用添加上述配置

+ 完整配置

```json
const {
    resolve
} = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin') //引入打包htm插件

module.exports = {
    //入口起点
    entry: './src/js/index.js',
    //输出
    output: {
        //输出文件名
        filename: 'js/built.js',
        //输出路径
        //__dirname:nodejs的全局变量，表示当前文件所在目录的绝对路径
        path: resolve(__dirname, 'build')
    },
    //Loader的配置
    module: {
        rules: [

        ]
    },
    // plugins的配置
    plugins: [
        //html-webpack-plugin:
        //默认 创建一个空的html,并且自动已入打包输出的所有资源
        new HtmlWebpackPlugin({
            'template': './src/index.html',
            'minify': {
                collapseWhitespace: true, //移除空格
                removeComments: true, //移除注释
            }

        })
    ],
    //模式
    mode: "production" //生产环境下会自动压缩js代码
    //mode:"production" 
}
```



# P18.生产环境配置

## package.json

```json
{
  "name": "webpack-style-css",
  "version": "1.0.0",
  "description": "webpack-html",
  "main": "index.js",
  "scripts": {
    "test": "echo \"Error: no test specified\" && exit 1"
  },
  "author": "",
  "license": "ISC",
  "devDependencies": {
    "css-loader": "^3.6.0",
    "eslint": "^7.5.0",
    "eslint-config-airbnb": "^18.2.0",
    "eslint-loader": "^4.0.2",
    "eslint-plugin-import": "^2.22.0",
    "html-loader": "^1.1.0",
    "html-webpack-plugin": "^4.3.0",
    "mini-css-extract-plugin": "^0.9.0",
    "optimize-css-assets-webpack-plugin": "^5.0.3",
    "postcss-loader": "^3.0.0",
    "postcss-preset-env": "^6.7.0",
    "style-loader": "^1.2.1",
    "url-loader": "^4.1.0",
    "file-loader": "^6.0.0",
    "webpack": "^4.43.0",
    "webpack-cli": "^3.3.12"

  },
  "browserslist": {
    "development": [
      "last 1 chrome version",
      "last 1 firefox version",
      "last 1 safari version"
    ],
    "production": [">0.1%", "not dead"]
  },
  "eslintConfig": {
    "extends": "airbnb-base"
  }
}
```

## webpack.config.js

```json
const {
    resolve
} = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin') //引入打包htm插件
const MiniCssExtractPlugin = require('mini-css-extract-plugin') //引入提取css文件插件
const optimizeCssAssetsWebpackPlugin = require('optimize-css-assets-webpack-plugin') //引入压缩css文件插件

//设置node.js的环境变量,决定使用 package.json 中的 browserslist 的哪个环境
process.env.NODE_ENV = 'production';

//复用loader
const commonCssloader = [
    //创建style标签，将js中的样式资源插入，添加到head中生效
    //'style-loader',
    //这个loader取代style-loader，提取css文件为单独的文件
    MiniCssExtractPlugin.loader,
    //将css文件变成commonJs模块加载到js中，里面的内容是样式字符串
    'css-loader',
    /*css兼容性处理
      1.postcss -> 
         postcss-loader 
         postcss-preset-env插件
      2.帮postcss找到package.json中的browserslist中的配置
        ，通过配置加载指定的css兼容样式,默认使用生成环境的配置，设置node.js的环境变量,process.env.NODE_ENV = 'development';
    */
    {
        loader: 'postcss-loader',
        options: {
            ident: 'postcss',
            plugins: [
                //postcss插件
                require('postcss-preset-env')()
            ]
        }
    }
];

module.exports = {
    //入口起点
    entry: './src/js/index.js',
    //输出
    output: {
        //输出文件名
        filename: 'js/built.js',
        //输出路径
        //__dirname:nodejs的全局变量，表示当前文件所在目录的绝对路径
        path: resolve(__dirname, 'build')
    },
    //Loader的配置
    module: {
        rules: [
            // 处理css文件
            {
                //匹配那些文件，这里使用正则表达式进行匹配
                test: /\.css$/,
                //使用哪里具体的loader，执行顺序是从下往上
                use: [...commonCssloader]
            },
            // 处理less文件
            {
                //匹配那些文件，这里使用正则表达式进行匹配
                test: /\.less$/,
                //使用哪里具体的loader，执行顺序是从下往上
                use: [
                    ...commonCssloader,
                    //将less文件编译成css文件
                    //需要下载less和less-loader
                    'less-loader'
                ]
            },
            /*eslint js语法检查:
               eslint-loader
             */
            {
                test: /\.js$/,
                exclude: /node_modules/, //只检查自己的代码，第三方库不检查
                loader: 'eslint-loader',
                enforce: 'pre', //多个loader处理同一个文件，优先执行
                options: {
                    /**设置检测规则
                     * package.json中eslintConfig中设置
                     * airbnb-->需要安装eslint-config-airbnb  eslint-plugin-import eslint
                     * 
                     */
                    fix: true //自动修复
                }
            },
            /*js兼容性处理:
               babel-loader @babel/core @babel/preset-env
             */
            {
                test: /\.js$/,
                exclude: /node_modules/, //只检查自己的代码，第三方库不检查
                loader: 'babel-loader',
                options: {
                    //预设,只是babel-loader做怎样的兼容性处理
                    presets: [
                        [
                            '@babel/preset-env',
                            {
                                useBuiltIns: 'usage', //按需加载
                                corejs: { //指定core-js版本
                                    version: 3
                                },
                                targets: { //指定兼容的浏览器版本
                                    chrome: '60',
                                    firefox: '60',
                                    ie: '9',
                                    safari: '10',
                                    edge: '17',
                                }
                            }
                        ]
                    ]
                }
            },
            // 处理图片文件
            {
                test: /\.(jpg|png|gif)$/,
                //多个loader，使用use:数组，只有一个loader，使用loader:
                loader: 'url-loader', //需要下载url-loader, file-loader
                options: {
                    //当图片小于8kb，就会被base64处理，
                    //优点-减少请求次数，
                    //确定-图片体积变大，影响页面加载时间
                    limit: 8 * 1024
                }
            },
            //处理html中img的图片
            {
                test: /\.html$/,
                //处理HTML中的img图片，负责引入img,从而被url-loader处理
                loader: 'html-loader'
            },
            //打包其它资源，
            {
                exclude: /\.(css|less|js|html|jpg|png|gif)$/,
                loader: 'file-loader'
            }
        ]
    },
    // plugins的配置
    plugins: [
        //html-webpack-plugin:
        //默认 创建一个空的html,并且自动已入打包输出的所有资源
        new HtmlWebpackPlugin({
            'template': './src/index.html'
        }),
        new MiniCssExtractPlugin({
            //对输出的css文件进行重名命
            filename: 'css/buit.css'
        }),
        new optimizeCssAssetsWebpackPlugin()
    ],
    //模式
    mode: "production"
}
```

