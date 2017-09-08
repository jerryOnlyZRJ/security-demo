const router = require('koa-router')();
const api = require('./api');
const page = require('./page');

router.use('/api', api.routes(), api.allowedMethods());

/**
 * 根据商品名称获取内容
 * @param {string} sort 
 */
function getSortGoods(sort) {
  switch (sort) {
    case 'bag':
    return '<img src="/imgs/sort-bag.png"></img>'
      break;
    case 'book':
      return '<img src="/imgs/sort-book.png"></img>'
      break;
    default:
      return '<p style="line-height: 60px; font-size: 30px;">没有该类型商品</p>'
      break;
  }
}

router.get('/sort.html', async ( ctx )=>{
  const sort = ctx.query.sort;
  let returnHtml = 
  // 直接使用了参数中的 sort
  ctx.body = `
    <p style="font-size: 40px; padding: 10px;">当前分类： ${sort}</p>
    ${getSortGoods(sort)}
  `;
});

module.exports = router;
