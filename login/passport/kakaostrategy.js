const KakaoStrategy = require('passport-kakao').Strategy;

const { User } = require('../models');

module.exports = (passport) => {
    passport.use(new KakaoStrategy({
        clientID: process.env.KAKAO_ID,
        callbackURL: '/auth/kakao/callback',
    }, async (accessToken, refreshToken, profile, done) => {
        try{
            const exUser = await User.findOne({
                where: {
                    id: profile.id,
                    provider: 'kakao',
                },
            });
            if (exUser) {
                await exUser.update({
                    token: accessToken,
                }, { where: {
                    id: profile.id,
                    porvier: 'kakao',
                }});
                done(null, exUser);
            } else {
                const newUser = await User.create({
                    name: profile.displayName,
                    id: profile.id,
                    email: profile._json && profile._json.kaccount_email,                    
                    provider: 'kakao',
                    token: accessToken,
                });
                done(null, newUser);
            }
        } catch(error) {
            console.error(error);
            done(error);
        }
    }));
};