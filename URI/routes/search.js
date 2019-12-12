const express = require('express');
const router = express.Router();
const sequelize = require('sequelize');
const Op = sequelize.Op;

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

const makeArrStr = (arr) => {
    let arrStr = '';
    for(let data of arr){
        if(arrStr == ''){
            arrStr = arrStr + data;
        } else {
            arrStr = arrStr + ',' + data;
        }
    }

    return arrStr;
}

router.post('/', async(req, res, next) => {
    const jsonPasre = JSON.parse(req.body.search);
    let arr = await makeArr(jsonPasre);
    let arrStr = await makeArrStr(arr);

    console.log(arrStr);
    try {
        if(arr.length == 0) {
            const posts = await Item.findAll();
            res.send({
                title: 'WeAreHere 중고 & 플리마켓 SNS',
                posts: posts,
                user: req.user,
            });
        } else {
            const posts = await Item.findAll(
                { 
                    include: {
                        model: Hashtag,
                        where: {
                            title: {
                                [Op.and]: arr,
                            },
                        },
                    },
                }
            );
            res.send({
                title: 'WeAreHere 중고 & 플리마켓 SNS',
                posts: posts,
                user: req.user,
            });
        } 
        
    } catch (error) {
        console.error(error);
      next(error);
    }
});

module.exports = router;
