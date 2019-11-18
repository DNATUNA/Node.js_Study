var express = require('express');
var router = express.Router();

router.get('/', function(req, res, next) {
  res.render('upload_product');
});

module.exports = router;

