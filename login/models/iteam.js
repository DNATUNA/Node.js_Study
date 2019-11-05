module.exports = (sequelize, DataTypes) => {
    return sequelize.define('iteam', {
        iteam_name: {
            type: DataTypes.STRING(30),
            allowNULL: false,
            unique: false,
        },
        item_price: {
            type: DataTypes.INTEGER(6).UNSIGNED,
            allowNULL: false,
            unique: false,
        },
        item_count: {
            type: DataTypes.INTEGER(6).UNSIGNED,
            allowNULL: false,
            unique: false,
        },
        item_description: {
            type: DataTypes.TEXT,
            allowNULL: true,
            unique: false,
        },
        created_at: {
            type: DataTypes.DATE,
            allowNULL: false,
            defautlValue: sequelize.literal('now()'),
        },
    },{
        timestamp: false,
        underscored: true,
    });
};

// store 테이블 정리
// 마켓 이름, 물건명, 가격, 물품 개 수, 물품 설명, 등록일자