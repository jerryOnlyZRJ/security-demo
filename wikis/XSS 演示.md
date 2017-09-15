## XSS 相关演示

## 个人页面
需要说明的是，个人页面不需要登陆态也可以进入

页面地址： http://localhost:3000/user.html?username=cover

![](http://coding.imweb.io/img/p9/user.png)

## 反射型 XSS
反射型 XSS 演示的页面是商品分类页，根据参数 sort 展示不同分类的商品

页面地址： http://localhost:3000/goods.html?sort=bag

### 服务端相关逻辑
在服务端中，会读取请求参数 sort 并且**直接使用**生成结果页返回给前端

代码文件：`routers/index.js`
```js
// 设置路由 /goods.html
router.get('/goods.html', async ( ctx )=>{
  const sort = ctx.query.sort;
  // 直接使用了参数中的 sort
  ctx.body = `
    <p style="font-size: 40px; padding: 10px;">当前分类： ${sort}</p>
    ${getSortGoods(sort)}
  `;
});
```


## 存储型 XSS
存储型 XSS 演示的页面是评论列表页，在这个页面可以看到所有用户的评论

页面地址： http://localhost:3000/comment-list.html

![](http://coding.imweb.io/img/p9/commentlist.png)

## DOM-BASED XSS
 DOM-BASED 型 XSS 演示的页面是十分简单，在输入框中输入文本，点击按钮生成链接

 页面地址： http://localhost:3000/dombase.html

![](http://coding.imweb.io/img/p9/dombase.png)

## 设置 httpOnly 属性
因此这里我只需要在设置 cookie 的时候设置 httpOnly 就可以了，如下所示：
```js
// 设置 Cookie 且 httpOnly
ctx.cookies.set('userkey', userkey, { httpOnly: true });
```
 
## XSS 输入检查
这里为了区分开来，设置展示的页面为：

涉及的转义函数 htmlEscape
```js
// 转义 html 特殊字符
function htmlEscape(str) {
  return String(str)
    .replace(/&/g, '&amp;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#39;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;');
}
```

页面地址： http://localhost:3000/comment-list-input.html

添加评论的接口也更改为 `add_comment2`，如下所示:
```js
/**
 * 增加评论
 * 增加了输入检查
 */
router.post('/add_comment2', async ( ctx )=>{
  // 前面可忽略的代码

  // 增加评论以及输入检查
  commentModel.addComments({
    text: htmlEscape(postData.text),
    username: user.username,
    date: postData.date,
    avatar: user.avatar
  });

  // 后面可忽略的代码
});
```

## XSS 输出检查
这里为了区分开来，相关页面为：

页面地址： http://localhost:3000/xss-output.html
