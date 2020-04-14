const express = require('express');
const router = express.Router();

const { Item, User, Hashtag } = require('../models');
/* GET home page. */

// 디테일 메인 페이지
router.get('/:id', async(req, res, next) => {
    let id = req.params.id;
    try{
        const item = await Item.findOne({
            include: {
                model: User,
                attributes: ['user_id', 'name', 'phone_num'],
            },
            where: {
                id
            },
        });
        let hashs = [];
        hashs = await item.getHashtags();
        res.render('detail_view', {
            title: '상품 정보 - WeAreHere 중고 & 플리마켓 SNS',
            posts: item,
            hashs: hashs,
            user: req.user,
        });
    } catch {
        console.error(error);
        next(error);
    }
});

module.exports = router;
