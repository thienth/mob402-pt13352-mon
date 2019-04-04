var express = require('express');
var router = express.Router();
var Category = require('../models/category');
var Product = require('../models/product');

var multer = require('multer');
var shortid = require('shortid');
// config noi luu tru va ten anh upload len
var storage = multer.diskStorage({
  // noi luu tru
  destination: function(req, file, cb){
    cb(null, './public/uploads');
  },
  // cau hinh ten file - giu nguyen ten file goc
  filename: function(req, file, cb){
    cb(null, shortid.generate() + "--" + file.originalname);
  }
});

var upload = multer({storage: storage});

/* GET home page. */
router.get('/', function(req, res, next) {
  Product.find({})
          .populate('cate_id')
          .exec((err, data) => {
            console.log(data);
            res.render('product/index', { products: data });
          });
});

router.get('/products/add', (req, res, next) => {
  Category.find({}, (err, data) => {
    res.render('product/add-form', {cates: data});
  })
});

router.get('/products/edit/:pId', (req, res, next) => {
  Category.find({}, (err, data) => {

    Product.findOne({_id: req.params.pId}, (err, productData) => {
      if(err){
        res.send('id san pham khong ton tai');
      }

      for(var i = 0; i < data.length; i++){
        if(data[i]._id == productData.cate_id.toString()){
          data[i].selected = true;
        }
      }

      res.render('product/edit-form', {cates: data, product: productData});
    });
    
  })
});

router.post('/products/save-add', upload.single('image'), (req, res, next) => {
  var model = new Product();
  model.name = req.body.name;
  model.price = req.body.price;
  model.cate_id = req.body.cate_id;
  model.detail = req.body.detail;
  model.image = req.file.path.replace('public', '');

  model.save((err) => {
    if(err){
      res.send('Luu khong thanh cong');
    }

    res.redirect('/');
  })
});

router.post('/products/save-edit', upload.single('image'), function(req, res, next){
  Product.findOne({_id: req.body.id}, function(err, model){
    if(err){
      res.redirect('back');
    }

    model.name = req.body.name;
    model.cate_id = req.body.cate_id;
    model.detail = req.body.detail;
    if(req.file != null){
      model.image = req.file.path.replace('public', '');
    }

    model.save(function(err){
      if(err){
        res.send('Luu khong thanh cong');
      }

      res.redirect('/');
    })
  })
});

router.get('/products/remove/:pId', (req, res, next) => {
  Product.deleteOne({_id: req.params.pId}, (err) => {
    if(err){
      res.send('Xoa khong thanh cong');
    }
    res.redirect('/');
  });
});

router.get('/cates', function(req, res, next) {
  Category.find({}, function(err, data){
    
    res.render('category/index', { cates: data });
  });
});

router.get('/cates/add', function(req, res, next){
  res.render('category/add-form');
});

router.get('/cates/edit/:cId', function(req, res, next){
  Category.findOne({_id: req.params.cId}, function(err, data){

    if(err){
      res.send('ID khong ton tai');
    }
    // res.json(data);
    res.render('category/edit-form', {cate: data});
  })
});

router.post('/cates/save-edit', upload.single('image'), function(req, res, next){
  Category.findOne({_id: req.body.id}, function(err, model){
    if(err){
      res.redirect('back');
    }

    model.name = req.body.name;
    model.description = req.body.description;
    if(req.file != null){
      model.image = req.file.path.replace('public', '');
    }

    model.save(function(err){
      if(err){
        res.send('Luu khong thanh cong');
      }

      res.redirect('/cates');
    })
  })
});

router.post('/cates/save-add', upload.single('image') ,function(req, res, next){
  // 2. Tao model
  var model = new Category();

  // 3. gan gia tri cho model
  model.name = req.body.name;
  model.image = req.file.path.replace('public', '');
  model.description = req.body.description;

  // 4. Luu
  model.save(function(err){
    if(err){
      res.send('Luu khong thanh cong');
    }

    res.redirect('/cates');
  })
})

router.get('/cates/remove/:cId', function(req, res, next){
  Category.deleteOne({_id: req.params.cId}, function (err) {
    if (err) return handleError(err);
    // deleted at most one tank document
    res.redirect('/cates');
  });
});

module.exports = router;
