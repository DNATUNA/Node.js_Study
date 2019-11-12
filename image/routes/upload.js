const express = require('express');
const multer = require('multer');
const upload = multer({dest: 'uploads/'}); // 파일 저장 위치를 dest 옵션으로 지정해주기
const router = express.Router();


/* GET users listing. */
// 127.0.0.1:3000/upload로 들어오면 실행됨 (여기서 upload는 라우터 js파일)
router.get('/', function (req, res, next) {
     // render의 인자로는 띄워줄 views 폴더 안의 pug파일을 지정해준다.
    res.render('uploadform');
});

router.post('/submit', upload.single('userfile'), function (req, res, next) {
    console.log(req.file);
    //res.send('업로드된 파일이름 : ' + req.file.filename);
    res.render('imgshow');
});

module.exports = router;
