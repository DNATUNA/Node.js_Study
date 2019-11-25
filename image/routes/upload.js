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
  // upload 페이지에서 받아온 정보들
  const title = req.body.title;
  const price = req.body.price;
  const content = req.body.content;
  const tag = req.body.tag;
  var imgOriginalname = new Array(req.files.length);
  for(var i = 0 ; i < req.files.length ; i++){
    imgOriginalname[i] = req.files[i].originalname;
    console.log(imgOriginalname[i]);
  }
  
  console.log(title + " " + price + " " + content + " " + tag);
  
  //console.log(title + " " + price + " " + content + " " + tag);
  //var imgPath = req.file.path;
  //console.log(imgPath);
  res.redirect('/');  // redirect는 절대 주소이다.
  
});

module.exports = router;

