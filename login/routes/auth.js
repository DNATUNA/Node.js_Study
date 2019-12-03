const express = require('express');
const bcrypt = require('bcrypt');
const passport = require('passport');
const axios = require('axios');


const { isLoggedIn, isNotLoggedIn } = require('./middlewares');
const { User } = require('../models');

const router = express.Router();

router.post('/join', isNotLoggedIn, async (req, res, next) => {
    const { name, id, passwd, email, age, phone_num, store_name} = req.body;
    try {
        const exUser = await User.findOne({ where: { id } });
        if (exUser) {
            req.flash('joinError', '이미 가입된 아이디입니다.');
            return res.redirect('/join');
        }
        const hash = await bcrypt.hash(passwd, 12);
        await User.create({
            name,
            id,
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
    passport.authenticate('local', (authError, user, info) => {
        if (authError) {
            console.error(authError);
            return next(authError);
        }
        if (!user){
            req.flash('loginError', info.message);
            return res.redirect('/');
        }
        return req.login(user, (loginError) => { //req.user
            if (loginError) {
                console.error(loginError);
                return next(loginError);
            }
            return res.redirect('/');
        });
    })(req, res, next);
});

router.get('/logout', isLoggedIn, (req, res) => {
    if (req.user.dataValues.provider == 'kakao'){
        axios.post('https://kapi.kakao.com/v1/user/logout', {}, { headers: { 'Authorization': `Bearer ${req.user.dataValues.token}` }})
            .then((response) => {
                req.logout();
                req.session.destroy();
                res.redirect('/');   
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
        });
        res.redirect('/');   
    }    
})

// kakao login
router.get('/kakao', passport.authenticate('kakao'));

router.get('/kakao/callback', passport.authenticate('kakao', {
    failureRedirect: '/',
}), (req, res) => {
    res.redirect('/');
});

module.exports = router;