const router = require('koa-router')();
const userModel = require('../model/user');
const commentModel = require('../model/comment');

/**
 * 登陆
 */
router.post('/login', async ( ctx )=>{
  let postData = ctx.request.body;
  if (userModel.isSystemUser(postData.username, postData.password)) {
    userModel.setUserCookie(postData.username, ctx);

    // 登陆成功
    ctx.body = {
      success: true,
      retcode: 0
    };
  } else {
    // 登陆成功
    ctx.body = {
      success: false,
      message: '没有该用户'
    };
  }
});

/**
 * 增加评论
 */
router.post('/addComment', async ( ctx )=>{
  let postData = ctx.request.body;
  // 判断是否是登陆了
  const username = userModel.checkUserByCookie(ctx);
  if (username) {
    const user = userModel.getUserDetail(username);
    // 增加评论
    commentModel.addComments({
      text: postData.text,
      username: username,
      avatar: user.avatar
    });
    ctx.body = {
      success: true,
      retcode: 0
    };
  } else {
    ctx.body = {
      success: false,
      message: '没有登陆'
    };
  }
});

/**
 * 获取评论列表
 */
router.get('/getCommentList', async ( ctx )=>{
  ctx.body = {
    success: true,
    list: commentModel.getCommentList()
  };
});

module.exports = router;