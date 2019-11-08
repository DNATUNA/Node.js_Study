var express = require('express');
var router = express.Router();

/* GET home page. */

// 회원가입 페이지
router.get('/join', (req, res) => {
  res.render('join', {
    title: '회원가입 - 플리마켓',
    user: null,
    joinError: req.flash('joinError'),
  });
});

// 프로필 페이지
router.get('/profile', (req, res) => {
  res.render('profile', {
    title: '내 정보 - 플리마켓',
    user: null,
  });
});

// 메인 페이지
router.get('/', function(req, res, next) {
  res.render('index', {
    title: '플리마켓',
    twits: [],
    user: null,
    loginError: req.flash('loginError'),
    });
});

module.exports = router;
