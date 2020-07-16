const express = require('express');
const multer = require('multer');
const router = express.Router();

/* 파일 저장 위치 지정 */ 
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'uploads/');
    },
    filename: (req, file, cb) => {
        cb(null, file.originalname);
    }
});
const upload = multer({storage: storage});
  

const { isLoggedIn, isNotLoggedIn } = require('./middlewares');
const { Item, Hashtag } = require('../models');

router.get('/', isLoggedIn, (req, res) => {
    console.log(req.user);
    res.render('upload', {
        title: 'Upload - WeAreHere 중고 & 플리마켓 SNS',
        twits: [],
        user: req.user,
    });
});

/* 최대 10개 파일을 한번에 보낼 수 있음 */
router.post('/', upload.array('userfile',10), async (req, res, next) => {
    const { item_name, item_price, item_description, title } = req.body;
    const imgs = new Array(req.files.length);
    let img_save='';
    function a() {
        for(var i = 0 ; i < req.files.length; i++){
            imgs[i] = req.files[i].originalname;
            img_save = img_save + `${imgs[i]},`
            console.log(imgs[i], img_save);
        }
    }
    await a({});
    try{
        console.log(req.user.id);
        const item = await Item.create({
            item_name,
            item_price,
            item_img: img_save, 
            item_description,
            userId: req.user.id,
        });
        const hasgpack = title.match(/#[^\s]*/g);
        if(hasgpack) {
            const result = await Promise.all(hasgpack.map(tag => Hashtag.findOrCreate({
                where: { title: tag.slice(1).toLowerCase() },
            })));
            await item.addHashtags(result.map(r => r[0]));
        }
        res.redirect('/');
    } catch (error) {
        console.error(error);
        next(error);
    };  
});

module.exports = router;
