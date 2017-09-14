## 操作

### referer 验证

1. 注释掉 `router/api.js` 里面的 `transfer_money` api, 使用下面有 referer 防御的 api，***重启 3000 端口服务器***
2. 打开 http://localhost:3001/bank-fish.html ，看 3 秒后发的请求，发现提示 `referer 不正确`
3. 看代码 `router/api.js` 里的 `transfer_money`，其实就是多了个请求的 referer 验证

### token 防御

1. 注释掉 `router/api.js` 里面的 `transfer_money` api, 使用下面有 token 防御的 api，***重启 3000 端口服务器***
2. 登录后打开 http://localhost:3000/bank2.0.html ，尝试发送一个转账请求，会发现请求会带上 token，这里的 token 其实就是简单地拿 cookie 里面的 userkey 加上 `_token` 后缀，当前实际上的加密算法会复杂很多。
3. 看服务器代码 `router/api.js`，会用同样的算法算出 token 进行对比，验证 token，只有 token 通过验证才执行转账逻辑。
4. 打开 http://localhost:3001/bank-fish.html ，看 3 秒后发的请求，请求没带 token，会返回 `token 不正确`
