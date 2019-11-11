const LocalStrategy = require('passport-local').Strategy;
const bcrypt = require('bcrypt');

const { User } = require('../models');

module.exports = (passport) => {
    passport.use(new LocalStrategy({
        usernameField: 'nick',    //req.body.id
        usernameField: 'passwd',    //req.body.passwd
    }, async (id, passwd, done) => { // done(에러, 성공, 실패)
        try{
            const exUser = await User.find({ where: { id }});
            if (exUser) {
                //비밀번호 검사
                const result = await bcrypt.compare(passwd, exUser.passwd);
                if (result) {
                    done(null, exUser);
                } else {
                    done(null, false, { message: '비밀번호가 일치하지 않습니다.' });
                }
            } else {
                done(null, false, { message: '가입되지 않은 회원입니다.' });
                //done(에러는 아니고, 실패했다, 실패한 내용~)
            }
        } catch (error) {
            console.error(error);
            done(error);
        }
    }));
};