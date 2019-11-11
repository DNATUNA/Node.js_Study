var express = require('express');
var router = express.Router();

/* GET users listing. */
router.get('/', function(req, res, next) {
    res.render('join', {
        title: '회원가입 - 플리마켓',
        user: null,
        joinError: req.flash('joinError'),
    });
});
router.post('/load', function(req, res, next) {
    res.send('respond with a resource');
});

module.exports = router;
