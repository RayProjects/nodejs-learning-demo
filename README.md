### 示例代码介绍

安装nodejs环境后，进入目录执行npm install安装依赖
执行 npm run server
访问 http://localhost:9999/demo/get_div_text 看到请求到的代理数据,这里用基础nodejs代码创建一个简单的代理服务器，当做后台返回数据

执行 npm run dev
访问 http://localhost:8888 看到请求到的index.html页面,通过express请求到构造的假数据，这是我们开发的时候用假数据调的场景

修改mock/demo/get_div_text.js，将check方法修改为返回false，再关掉npm run dev重新执行，就能发现此时是从9999代理服务器请求的数据，这是我们跟后台联调的场景


### 前后端分离

> Web应用的一种架构模式，使得前后端并行开发，简化开发流程。

利用nodejs的express框架来开启一个本地的服务器，通过规定好的API接口，由前端开发维护nodejs前端服务器
用mock来提供符合API接口要求的假数据，模拟发送API到接受响应的整一个过程，因此前端也不需要依赖于后端进行独立开发
发布时再利用nodejs的一个http-proxy-middleware插件将客户端发往nodejs的请求转发给真正的服务器，让nodejs作为一个中间层即可
nodejs本身有着独特的异步、非阻塞I/O的特点，这也就意味着他特别适合I/O密集型操作，在处理并发量比较大的请求上能力比较强

### Node.js简介

> 简单的说 Node.js 就是运行在服务端的 JavaScript。
> Node.js 是一个基于Chrome JavaScript 运行时建立的一个平台。

Node.js优势：

1、JavaScript语法易上手；
2、有丰富的插件；
3、前端构建工具都是基于node环境。


### npm简介

npm是随同NodeJS一起安装的包管理工具，能解决NodeJS代码部署上的很多问题，常见的使用场景有以下几种：

允许用户从NPM服务器下载别人编写的第三方包到本地使用。
允许用户从NPM服务器下载并安装别人编写的命令行程序到本地使用。
允许用户将自己编写的包或命令行程序上传到npm服务器供别人使用。


### package.json

每个项目的根目录下面，一般都有一个package.json文件，定义了这个项目所需要的各种模块，以及项目的配置信息（比如名称、版本、许可证等元数据）。

npm install命令根据这个配置文件，自动下载所需的模块，也就是配置项目所需的运行和开发环境。

scripts字段：指定了运行脚本命令的npm命令行缩写，比如start指定了运行npm run start时，所要执行的命令。

dependencies字段，devDependencies字段：dependencies字段指定了项目运行所依赖的模块，devDependencies指定项目开发所需要的模块。

config 字段：用于添加命令行的环境变量。


### Express

Express 是一个基于 Node.js 平台的极简、灵活的 web 应用开发框架，它提供一系列强大的特性，帮助你创建各种 Web 和移动设备应用。
我们使用它作为前端开发服务器，目的是使用它丰富的中间件。

### Express中间件

中间件是在收到请求后和发送响应之前这个阶段执行的一些函数。

用法：app.use([path,] function [, function...])

目的：可以在请求期间做代理转发。

前后端分离交互流程

客户端（浏览器） ->  发出请求  ->  node服务端  ->  中间件处理

中间件处理  ->  是否需要代理  ->  需要代理  ->  转发到代理服务器  ->  需要代理  ->  返回数据给中间件  ->  中间件返回处理后的数据给客户端
                                不需要代理  ->  读取本地JSON  ->  中间件返回处理后的数据给客户端


                