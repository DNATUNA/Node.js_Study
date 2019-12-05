const express = require('express');
const router = express.Router();

const { isLoggedIn, isNotLoggedIn } = require('./middlewares');
const { Item, User } = require('../models');
/* GET home page. */

// 회원가입 페이지
router.get('/join', isNotLoggedIn, (req, res) => {
  res.render('join', {
    title: '회원가입 - 플리마켓',
    user: null,
    joinError: req.flash('joinError'),
  });
});

// 프로필 페이지
router.get('/profile', isLoggedIn, (req, res) => {
  res.render('profile', {
    title: '내 정보 - 플리마켓',
    user: req.user,
  });
});

// 메인 페이지
router.get('/', function(req, res, next) {
  console.log(req.user);
  Item.findAll({
    include: {
      model: User,
      attributes: ['user_id', 'name'],
    },
  })
  .then((posts) => {
    res.render('main', {
      title: 'WeAreHere 중고 & 플리마켓 SNS',
      posts: posts,
      user: req.user,
    });
    console.log(posts);
  })
  .catch((error) => {
    console.error(error);
    next(error);
  });
  
});

module.exports = router;
