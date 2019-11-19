var express = require('express');
const multer = require('multer');
var router = express.Router();
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



router.get('/', function(req, res, next) {
  res.render('upload_product');
});

// 최대 10개 파일을 한번에 보낼 수 있음
router.post('/', upload.array('userfile',10), function (req, res, next) {
  //console.log(req.file);
  res.render('main');
});

module.exports = router;

