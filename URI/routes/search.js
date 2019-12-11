const express = require('express');
const router = express.Router();

const { Item, User, Hashtag } = require('../models');

const checkUpload = (data) => {
    if(data.upload == 'disable') return 0;
    else return 1;
};

const makeArr = (jsonPasre) => {
    let dataUpload = 0;
    let arr = [];
    for(let data of jsonPasre){
        dataUpload = checkUpload(data);
        if(dataUpload) arr.push(data.tag);
    }
    return arr;
};

router.post('/', async(req, res, next) => {    
    const jsonPasre = JSON.parse(req.body.search);
    let arr = await makeArr(jsonPasre);

    try{
        const posts = await Item.findAll(
            { 
                include: {
                    model: Hashtag,
                    where: {
                        title: arr,
                    },
                },
            }
        );
        res.render('main', {
            title: 'WeAreHere 중고 & 플리마켓 SNS',
            posts: posts,
            user: req.user,
        });
    } catch (error) {
        console.error(error);
      next(error);
    }
});

module.exports = router;
