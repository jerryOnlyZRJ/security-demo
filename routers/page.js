const router = require('koa-router')()


// 内存保存用户名称数据
let userName = ''; 

router.get('/xss/persistent', async ( ctx )=>{
  ctx.body = 'helloworld page!'
});

router.get('/xss/dom', async ( ctx )=>{
  ctx.body = 'helloworld page!'
});



module.exports = router;