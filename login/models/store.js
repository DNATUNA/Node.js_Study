module.exports = (sequelize, DataTypes) => {
    return sequelize.define('store', {
        store_name: {

        },
        iteam_name: {

        },
        item_price: {

        },
        item_count: {

        },
        item_description: {

        },
        created_at:{

        },
    },{
        timestamp: false,
        underscored: true,
    });
};

// store 테이블 정리
// 마켓 이름, 물건명, 가격, 물품 개 수, 물품 설명, 등록일자