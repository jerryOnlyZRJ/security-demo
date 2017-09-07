const router = require('koa-router')();
// 用户列表
let Comments = [{
  username: 'cover',
  text: '文章不错，很有深度！',
  avatar: '/imgs/user.jpg'
},{
  username: 'kevin',
  text: '学到了好东西，顶一个',
  avatar: '/imgs/user.jpg',
}];

const ComentModel = {
  addComments: (comment) => {
    Comments.push(comment);
  },
  getCommentList: () => {
    return Comments;
  }
}

module.exports = ComentModel;
