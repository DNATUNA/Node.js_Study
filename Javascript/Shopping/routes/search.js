const express = require('express');
const router = express.Router();
const model = require('../models');

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

    console.log(arr);
    const query = "SELECT * FROM items WHERE id IN (SELECT DISTINCT item_id FROM ItemHashtag WHERE hashtag_id IN (SELECT id FROM hashtags WHERE (SELECT CASE WHEN GROUP_CONCAT(title) = :arrStr THEN 1 ELSE 0 END FROM (SELECT title FROM hashtags WHERE title IN (:arr) GROUP BY title) AS CheckHash) = 1 AND title IN (:arr)) ORDER BY item_id)";
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
            model.sequelize.query(query, {
                replacements: {
                    arr: arr,
                    arrStr: arrStr,
                },
                type: model.sequelize.QueryTypes.SELECT
            })
            .then((data) => {
                res.send({
                    title: 'WeAreHere 중고 & 플리마켓 SNS',
                    posts: data,
                    user: req.user,
                });
            })
            .catch((error) => {
                console.error(error);
                next(error);
            })
        } 
        
    } catch (error) {
        console.error(error);
      next(error);
    }
});

module.exports = router;
