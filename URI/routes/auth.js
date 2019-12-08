const express = require('express');
const bcrypt = require('bcrypt');
const passport = require('passport');
const axios = require('axios');


const { isLoggedIn, isNotLoggedIn } = require('./middlewares');
const { User } = require('../models');

const router = express.Router();

// login 화면
router.get('/', isNotLoggedIn, (req, res) => {
    console.log(req.user);
    res.render('login', {
        title: '로그인 - WeAreHere 중고 & 플리마켓 SNS',
        twits: [],
        user: req.user,
        loginError: req.flash('loginError'),
    });
});

// 회원가입 화면
router.get('/join', isNotLoggedIn, (req, res) => {
    console.log(req.user);
    res.render('sign_up', {
        title: '회원가입 - WeAreHere 중고 & 플리마켓 SNS',
        user: null,
        joinError: req.flash('joinError'),
    });
});

// 회원가입 데이터 전송
router.post('/join', isNotLoggedIn, async (req, res, next) => {
    const { name, user_id, passwd, email, age, phone_num, store_name} = req.body;
    try {
        const exUser = await User.findOne({ where: { user_id } });
        if (exUser) {
            req.flash('joinError', '이미 가입된 아이디입니다.');
            return res.redirect('/join');
        }
        const hash = await bcrypt.hash(passwd, 12);
        await User.create({
            name,
            user_id,
            passwd: hash,
            email,
            age,
            phone_num,
            store_name,
        });
        return res.redirect('/');
        
    } catch (error) {
        console.error(error);
        next(error);
    }
});

router.post('/login', isNotLoggedIn, (req, res, next) => {
    console.log(req.body.user_id, req.body.passwd);
    passport.authenticate('local', (authError, user, info) => {
        if (authError) {
            console.error(authError);
            return next(authError);
        }
        if (!user){
            req.flash('loginError', info.message);
            return res.redirect('/auth');
        }
        return req.login(user, (loginError) => { //req.user
            if (loginError) {
                console.error(loginError);
                return next(loginError);
            }
            return res.redirect('/auth');
        });
    })(req, res, next);
});

router.get('/logout', isLoggedIn, (req, res) => {
    if (req.user.dataValues.provider == 'kakao'){
        axios.post('https://kapi.kakao.com/v1/user/logout', {}, { headers: { 'Authorization': `Bearer ${req.user.dataValues.token}` }})
            .then((response) => {
                req.session.destroy(() => {
                    if(err){
                        console.error(err);
                        return next(err);
                    }
                    req.logout();
                    res.sendStatus(200);
                    res.redirect('/');
                });     
            })
            .catch((error) => {
                console.error(error);
                return next(error);
            });
    } else{
        req.session.destroy(() => {
            if(err){
                console.error(err);
                return next(err);
            }
            req.logout();
            res.sendStatus(200);
            res.redirect('/');
        });  
    }    
});

//kakao login
router.get('/kakao/', passport.authenticate('kakao'));

router.get('/kakao/callback', passport.authenticate('kakao', {
    failureRedirect: '/',
}), (req, res) => {
    res.redirect('/');
});

module.exports = router;