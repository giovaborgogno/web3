var express = require('express');
var router = express.Router();
const hashPayment = require('../lib/hashPayment')

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Payment Channel' });
});

router.post('/', hashPayment, (req, res) => {
  const {recipient, amount, nonce, defaultAccount, hash, contractAddress} = req.body
  const contentRes = {
    recipient,
    amount,
    nonce,
    defaultAccount,
    hash,
    contractAddress,
  }
  console.log(contentRes)
  res.render('index2', {contentRes, title: 'Informacion del pago'})
});

module.exports = router;
