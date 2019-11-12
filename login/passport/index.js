const local = require('./localstrategy');
const kakao = require('./kakaostrategy');
const { User } = require('../models');

// 여기서 strategy는 누구를 로그인 시킬 것인가를 정하는 것이다!

module.exports = (passport) => {

    passport.serializeUser((user, done) => {
        done(null, user.id);
    });
    passport.deserializeUser((id, done) => {
        User.findOne({ where: { id } })
            .then(user => done(null, user))
            .catch(err => done(err));
    });

    local(passport);
    //kakao(passport);
};