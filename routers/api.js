const router = require('koa-router')();
const userModel = require('../model/user');
const commentModel = require('../model/comment');
const bankModel = require('../model/bank');


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
  const user = userModel.checkUserByCookie(ctx);
  if (user) {
    // 增加评论
    commentModel.addComments({
      text: postData.text,
      username: user.username,
      avatar: user.avatar
    });
    ctx.body = {
      success: true,
      retcode: 0
    };
  } else {
    ctx.body = {
      success: false,
      retcode: -1,
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

/**
 * 获取用户账户
 */
router.get('/getUserMoney', async ( ctx )=>{
  // 判断是否是登陆了
  const user = userModel.checkUserByCookie(ctx);
  if (user) {
    ctx.body = {
      success: true,
      user: user,
      money: bankModel.getUserMoney(user.username)
    };
  } else {
    ctx.body = {
      success: false,
      retcode: -1,
      message: '没有登陆'
    };
  }
  
});

// /**
//  * 获取评论列表
//  */
// router.post('/transerMoney', async ( ctx )=>{
//   const user = userModel.checkUserByCookie(ctx);
//   const postData = ctx.request.body;
//   // console.log(postData);
//   // 转账操作
//   const result = bankModel.transferMoney({
//     from: user.username,
//     to: postData.username,
//     money: postData.money
//   });
//   // 返回结果
//   ctx.body = result;
// });




// /**
//  * 获取评论列表
//  * 增加 referer
//  */
// router.post('/transerMoney', async ( ctx )=>{
//   const user = userModel.checkUserByCookie(ctx);
//   const postData = ctx.request.body;
  
//   // 获取 referer 判断
//   const referer = ctx.request.header.referer;
//   // 符合的才执行
//   if (referer.indexOf('http://localhost:3001/') != -1) {
//     // 转账操作
//     const result = bankModel.transferMoney({
//       from: user.username,
//       to: postData.username,
//       money: postData.money
//     });
//     ctx.body = result;
//   } else {
//     // 返回结果
//     ctx.body = {
//       success: false,
//       mesage: 'referer 不正确'
//     };
//   }
// });


/**
 * 获取评论列表
 * 增加 token 检验
 */
router.post('/transerMoney', async ( ctx )=>{
  const user = userModel.checkUserByCookie(ctx);
  const postData = ctx.request.body;

  // 检验token
  const isTrueToken = postData.token === userModel.getUserToken(user.username, ctx);
  if (isTrueToken) {
     // 转账操作
     const result = bankModel.transferMoney({
      from: user.username,
      to: postData.username,
      money: postData.money
    });
    ctx.body = result;
  } else {
    // 返回结果
    ctx.body = {
      success: false,
      mesage: 'token 不正确'
    };
  } 
});



module.exports = router;