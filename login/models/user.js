module.exports = (sequelize, DataTypes) => {
    return sequelize.define('user', {
        name:{
            type: DataTypes.STRING(20),
            allowNULL: false,
            unique: false,
        },
        id: {
            type: DataTypes.STRING(20),
            allowNULL: false,
            unique: true,
            primaryKey: true,
        }, 
        passwd: {
            type: DataTypes.STRING(20),
            allowNULL: false,
            unique: false,
        },
        age: {
            type: DataTypes.INTEGER.UNSIGNED,
            allowNULL: false,
            unique: false,
        },
        phone_num: {
            type: DataTypes.INTEGER.UNSIGNED,
            allowNULL: false,
            unique: false,
        },
        created_at: {
            type: DataTypes.DATE,
            allowNULLL: false,
            defaultValue: sequelize.literal('now()'),
        },
        store_name:{
            type: DataTypes.STRING(20),
            allowNULL: false,
            unique: false,
        }
    }, {
        timestamp: false,
        underscored: true,
    });
};

// user 테이블 정리
// 이름, 아이디, 비밀번호, 나이, 휴대폰 번호, 계정생성일, 마켓 이름