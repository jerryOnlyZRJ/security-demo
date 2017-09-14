## 操作
1. 命令行运行 `node index`
2. 打开链接  http://localhost:3000/login.html
3. 控制台看的 cookie（没有username）
4. 用户名 kevin 密码 123456 登录，右上角表示登录态
5. 控制台看 cookie，发现有 username 和 userkey 了，userkey 是服务器生成的随机数，用来验证登录态的。
6. 删掉随便一个，发现登录态丢失了（右上角登录态没了）
7. 重新登录，在一个新开的浏览器设置同样的cookie, 发现只有 username 还不行，同时设置了 username 和 userkey 就可以在另一个浏览器登录了
8. 点击注销，退出登录，cookie 清空

效果图

![](http://coding.imweb.io/img/p9/login.png)
