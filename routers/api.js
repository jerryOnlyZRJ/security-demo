const router = require('koa-router')();


router.post('/login.do', async ( ctx )=>{
  let postData = ctx.request.body;
  console.log(postData);
  ctx.redirect('/comment.html');
});


router.post('/addComment', async ( ctx )=>{
  let postData = ctx.request.body;
  const commentText = postData.text;  
  // 设置应用的
  ctx.app.comments = ctx.app.comments || [];
  ctx.app.comments.push(commentText);
  ctx.body = {
    success: true,
    retcode: 0
  };
});

router.get('/getCommentList', async ( ctx )=>{
  ctx.body = {
    success: true,
    list: ctx.app.comments
  };
});

module.exports = router;