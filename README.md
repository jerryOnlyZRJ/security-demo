## P9-demo
P9 章节演示的网站

大家可以把这个项目 `clone` 到你们本地，照着视频一步一步了解 Web 安全吧。

需要记得是 `clone` 后，要 `npm install` 一下安装下依赖包。


## 目录结构
```
├── README.md 说明文档
├── index.js 网站主入口文件
├── static  页面静态资源
├── model 页面数据相关（这里数据都是存在内存中的）
├── routers 路由相关
├── node_modules  依赖包
├── package.json
├── .editorconfig
└── .gitignore
```

## 启动服务
在项目目录直接命令行启动,默认监听的端口是 3000端口
```shell
node index.js
```

## CSRF 钓鱼服务器启动
在项目目录直接命令行启动,默认监听的端口是 3001端口
```shell
node evil.js
```

## 默认用户账号密码
用户数据记录在 `/model/user.js` 中
- 普通用户1 账号：cover 密码： 123456
- 普通用户1 账号：kevin 密码： 123456
- 黑客 账号：badboy 密码： 123456

## 演示文档

[wiki链接](http://git.imweb.io/imweb-teacher/p9-demo/wikis/home)
或者查看项目 `wiki` 目录
