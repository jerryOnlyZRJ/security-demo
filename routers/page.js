const router = require('koa-router')()

router.get('/xss/nonpersistent', async ( ctx )=>{
  ctx.body = `<h1>this is ${ctx.query.q || 'default'}</h1>`;
});

// 内存保存用户名称数据
let userName = ''; 

router.get('/xss/persistent', async ( ctx )=>{
  ctx.body = 'helloworld page!'
});

router.get('/xss/dom', async ( ctx )=>{
  ctx.body = 'helloworld page!'
});



module.exports = router;