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
        // 여기 main을 detail_view로 바꾸면 왜 css랑 javascript가 안먹히는지 모르겠음~~~ 김건똥은 계속 메이플만함~~ 난 자야겠다ㅏㅏ
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
