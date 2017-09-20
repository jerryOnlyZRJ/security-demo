/**
 * 路由
 */

const router = require('koa-router')();
const userModel = require('../model/user');
const commentModel = require('../model/comment');
const bankModel = require('../model/bank');

/**
 * 登录
 */
router.post('/login', async ( ctx )=>{
  const postData = ctx.request.body;
  if (userModel.isSystemUser(postData.username, postData.password)) {
    // 设置登陆态cookie
    userModel.setUserCookie(postData.username, ctx);
    // 登陆成功
    ctx.body = {
      success: true,
      retcode: 0
    };
  } else {
    // 登陆失败
    ctx.body = {
      success: false,
      message: '没有该用户'
    };
  }
});

/**
 * 登出
 */
router.post('/logout', async ( ctx )=>{
  const postData = ctx.request.body;
  const user = userModel.checkUserByCookie(ctx);
  if (user) {
    userModel.clearUserCookie(ctx);
    ctx.body = {
      success: true,
      retcode: 0
    };
  } else {
    // 登陆失败
    ctx.body = {
      success: false,
      message: '没有登录'
    };
  }
});

/**
 * 增加评论
 */
router.post('/add_comment', async ( ctx )=>{
  let postData = ctx.request.body;
  // 判断是否是登陆了
  const user = userModel.checkUserByCookie(ctx);
  if (user) {
    // 增加评论
    commentModel.addComments({
      text: postData.text,
      username: user.username,
      date: postData.date,
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

// 转义 html 特殊字符
function htmlEscape(str) {
  return String(str)
    .replace(/&/g, '&amp;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#39;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;');
}
/**
 * 增加评论
 * 增加了输入检查
 */
router.post('/add_comment2', async ( ctx )=>{
  let postData = ctx.request.body;
  // 判断是否是登陆了
  const user = userModel.checkUserByCookie(ctx);
  if (user) {
    // 增加评论
    commentModel.addComments({
      text: htmlEscape(postData.text),
      username: user.username,
      date: postData.date,
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
 * 获取用户信息
 */
router.get('/get_userinfo', async ( ctx )=> {
  const user = userModel.checkUserByCookie(ctx);
  if (user) {
    ctx.body = {
      is_login: true,
      username: user.username
    }
  } else {
    ctx.body = {
      is_login: false
    }
  }
})

/**
 * 获取用户的评论信息
 */
router.get('/get_user_commentList', async ( ctx )=>{
  // 判断是否是登陆了
  const username = ctx.query.username;
  const user = userModel.getUserDetail(username);
  console.log(username, user);
  if (username && user) {
    ctx.body = {
      success: true,
      user: user,
      list: commentModel.getUserCommentList(username)
    };
  } else {
    ctx.body = {
      success: false,
      retcode: -1,
      message: '没有用户'
    };
  }
});

/**
 * 获取大众的评论列表
 */
router.get('/get_comment_list', async ( ctx )=>{
  ctx.body = {
    success: true,
    list: commentModel.getCommentList()
  };
});

/**
 * 获取用户账户
 */
router.get('/get_user_money', async ( ctx )=>{
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

/**
 * 转账请求
 */
router.post('/transfer_money', async ( ctx )=>{
  const user = userModel.checkUserByCookie(ctx);
  const postData = ctx.request.body;
  // 转账操作
  const result = bankModel.transferMoney({
    from: user.username,
    to: postData.username,
    money: postData.money
  });
  // 返回结果
  ctx.body = result;
});


// /**
//  * csrf 防御代码
//  * 增加 referer
//  * 目前注释掉，演示 referer 防御的时候去掉注释
//  */
// router.post('/transfer_money', async ( ctx )=>{
//   const user = userModel.checkUserByCookie(ctx);
//   const postData = ctx.request.body;

//   // 获取 referer 判断
//   const referer = ctx.request.header.referer;
//   // 符合的才执行
//   if (/https?:\/\/localhost:3031/.test(referer)) {
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
 * csrf 防御代码
 * 增加 token 检验
 * 目前注释掉，演示 token 防御的时候去掉注释
 */
// router.post('/transfer_money', async ( ctx )=>{
//   const user = userModel.checkUserByCookie(ctx);
//   const postData = ctx.request.body;

//   // 检验token
//   const postToken = postData.token;  // 用户提交的 token
//   const serverToken = userModel.getUserToken(user.username, ctx); // 服务器算的token
//   const isTrueToken = postToken === serverToken;
//   if (isTrueToken) {
//      // 转账操作
//      const result = bankModel.transferMoney({
//       from: user.username,
//       to: postData.username,
//       money: postData.money
//     });
//     ctx.body = result;
//   } else {
//     // 返回结果
//     ctx.body = {
//       success: false,
//       mesage: 'token 不正确'
//     };
//   }
// });



module.exports = router;
