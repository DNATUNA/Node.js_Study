const express = require('express');
const router = express.Router();

const { Item, User } = require('../models');
/* GET home page. */

// 디테일 메인 페이지
router.get('/:id', (req, res, next) => {

    let id = req.params.id;

    Item.findOne({
        include: {
            model: User,
            attributes: ['user_id', 'name'],
        },
        where: {
            id
        },
    })
    .then((posts) => {
        res.render('main', {
            title: '상품 정보 - WeAreHere 중고 & 플리마켓 SNS',
            posts: posts,
            user: req.user,
        });
    })
    .catch((error) => {
        console.error(error);
        next(error);
    });
  
});

module.exports = router;
