/**
* 评论模块
*/

const router = require('koa-router')();

// 评论列表
let Comments = [{
  username: 'cover',
  text: '文章不错，很有深度！',
  avatar: '/imgs/user.jpg',
  date: 1505028064072
},{
  username: 'kevin',
  text: '学到了好东西，顶一个',
  avatar: '/imgs/user.jpg',
  date: 1505021064072
}];

const ComentModel = {
  addComments: (comment) => {
    Comments.push(comment);
  },
  getCommentList: () => {
    return Comments;
  },
  getUserCommentList: (username) => {
    return Comments.filter((item, index) => {
      return item.username === username
    });
  }
}

module.exports = ComentModel;
