var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  let imgUrl = "https://m.afrimo.net/web/product/tiny/201808/0c2cafd3a350042731e9e598565323c7.jpg";
  res.render('main', {
    imgUrl: imgUrl,
  });
});

module.exports = router;
