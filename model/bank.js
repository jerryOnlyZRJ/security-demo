const router = require('koa-router')();


// 用户列表
let banks = {
  'cover': 10000,
  'badboy': 100,
  'kevin': 4000
};

const BankModel = {
  transferMoney: (opts) => {
    let success = false;
    let message = '';
    opts = opts || {};
    if (!banks[opts.to]) {
      message += '没有该转账银行账户';
    } else {
      banks[opts.from] -= opts.money;
      banks[opts.to] += +opts.money;
      success = true;
    }
    return {
      success: success,
      message: message
    }
  },
  getUserMoney: (userName) => {
    return banks[userName] || 0;
  }
}

module.exports = BankModel;
