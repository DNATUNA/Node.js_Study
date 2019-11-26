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
        email: {
            type: DataTypes.STRING(30),
            allowNULL: false,
            unique:true,
        },
        age: {
            type: DataTypes.INTEGER(2).UNSIGNED,
            allowNULL: true,
            unique: false,
        },
        phone_num: {
            type: DataTypes.INTEGER(12).UNSIGNED,
            allowNULL: true,
            unique: true,
        },
        created_at: {
            type: DataTypes.DATE,
            allowNULL: false,
            defaultValue: sequelize.literal('now()'),
        },
        provider: {
            type: DataTypes.STRING(10),
            allowNUUL: false,
            default: 'local',
            unique: false,
        },
        store_name:{
            type: DataTypes.STRING(20),
            allowNULL: true,
            unique: true,
        },
        token: {
            type: DataTypes.STRING(100),
            allowNULL: true,
            unique:false,
        }
    }, {
        timestamp: false,
        paranoid: true,
        underscored: true,
    });
};

// user 테이블 정리
// 이름(5), 아이디(30), 비밀번호(20), 나이(2), 휴대폰 번호(12), 계정생성일(DATE->default(now)), 마켓 이름(20)