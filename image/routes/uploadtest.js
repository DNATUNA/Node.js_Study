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


/* get, post 코드 */
// 127.0.0.1:3000/upload로 들어오면 실행됨 (여기서 upload는 라우터 js파일)
router.get('/', function (req, res, next) {
     // render의 인자로는 띄워줄 views 폴더 안의 pug파일을 지정해준다.
    res.render('uploadform');
});

// 최대 10개 파일을 한번에 보낼 수 있음
router.post('/submit', upload.array('userfile',10), function (req, res, next) {
    //console.log(req.file);
    //res.render('imgshow');
    res.send(req.body)
});

module.exports = router;
