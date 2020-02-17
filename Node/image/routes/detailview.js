var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('detail_test');

  // res.render('detail_view');
});

module.exports = router;
