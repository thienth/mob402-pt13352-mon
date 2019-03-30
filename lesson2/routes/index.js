var express = require('express');
var router = express.Router();
var Category = require('../models/category');

var multer = require('multer');
// config noi luu tru va ten anh upload len
var storage = multer.diskStorage({
  // noi luu tru
  destination: function(req, file, cb){
    cb(null, './public/uploads');
  },
  // cau hinh ten file - giu nguyen ten file goc
  filename: function(req, file, cb){
    cb(null, file.originalname);
  }
});

var upload = multer({storage: storage});

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

router.get('/cates', function(req, res, next) {
  Category.find({}, function(err, data){
    
    res.render('category/index', { cates: data });
  });
});

router.get('/cates/add', function(req, res, next){
  res.render('category/add-form');
});

router.post('/cates/save-add', upload.single('image') ,function(req, res, next){
  res.json(req.file);

  // 2. Tao model
  // var model = new Category();

  // // 3. gan gia tri cho model
  // model.name = req.body.name;
  // model.image = req.body.image;
  // model.description = req.body.description;

  // // 4. Luu
  // model.save(function(err){
  //   if(err){
  //     res.send('Luu khong thanh cong');
  //   }

  //   res.redirect('/cates');
  // })
})

router.get('/cates/remove/:cId', function(req, res, next){
  Category.deleteOne({_id: req.params.cId}, function (err) {
    if (err) return handleError(err);
    // deleted at most one tank document
    res.redirect('/cates');
  });
});

module.exports = router;
