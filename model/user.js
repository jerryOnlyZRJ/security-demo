const router = require('koa-router')();
// 用户列表
const Users = [{
  username: 'badboy',
  avatar: '/imgs/hacker.jpg',
  password: '123456'
},{
  username: 'cover',
  avatar: '/imgs/user.jpg',
  password: '123456'
},{
  username: 'kevin',
  avatar: 'user.jpg',
  password: '123456'
}];

// 当前用户登陆态
let userSession = {};

const UserModel = {
  isSystemUser: (username, password) => {
    for (let index = 0; index < Users.length; index++) {
      const item = Users[index];
      if (item.username === username && item.password === password) {
        return true;
      }
    }
    return false;
  },
  setUserCookie: (userName, ctx) => {
    // 简单的计算获得用户的登陆态 cookie
    const userkey = 'userkey_' + Math.random() * 1000;
    ctx.cookies.set(
      'userkey', 
      userkey,
      {
        domain: 'localhost',  // 写cookie所在的域名
        maxAge: 10 * 60 * 1000, // cookie有效时长
        httpOnly: false,  // 是否只用于http请求中获取
        overwrite: false  // 是否允许重写
      }
    );
    // 存用户登陆态 cookie
    userSession[userName] = userkey;
  },
  // 根据 cookie 验证用户
  checkUserByCookie: (ctx) => {
    const userkey = ctx.cookies.get('userkey');
    
    let userName;
    for (let key in userSession) {
      if (userSession[key] === userkey) {
        userName = key;
      }
    }
    // 返回用户登陆情况
    return userName;
  },
  /**
   * 获取用户详情
   */
  getUserDetail: (userName)=> {
    function isBigEnough(element) {
      return element >= 10;
    }
    return Users.filter((item) => {
      return item.username === userName
    })[0];

  }
}

module.exports = UserModel;
