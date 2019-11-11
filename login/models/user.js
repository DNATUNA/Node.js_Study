module.exports = (sequelize, DataTypes) => {
    return sequelize.define('user', {
        name:{
            type: DataTypes.STRING(5),
            allowNULL: false,
            unique: false,
        },
        id: {
            type: DataTypes.STRING(30),
            allowNULL: false,
            unique: true,
            primaryKey: true,
        }, 
        passwd: {
            type: DataTypes.STRING(100),
            allowNULL: true,
            unique: false,
        },
        age: {
            type: DataTypes.INTEGER(2).UNSIGNED,
            allowNULL: false,
            unique: false,
        },
        phone_num: {
            type: DataTypes.INTEGER(12).UNSIGNED,
            allowNULL: false,
            unique: true,
        },
        created_at: {
            type: DataTypes.DATE,
            allowNULL: false,
            defaultValue: sequelize.literal('now()'),
        },
        store_name:{
            type: DataTypes.STRING(20),
            allowNULL: false,
            unique: true,
        },
        provider: {
            type: DataTypes.STRING(10),
            allowNULL: false,
            defaultValue: "local",
        },
        snsId: {
            type: DataTypes.STRING(30),
            allowNULL: true,
        },
    }, {
        timestamp: false,
        paranoid: true,
        underscored: true,
    });
};

// user 테이블 정리
// 이름(5), 아이디(30), 비밀번호(20), 나이(2), 휴대폰 번호(12), 계정생성일(DATE->default(now)), 마켓 이름(20)