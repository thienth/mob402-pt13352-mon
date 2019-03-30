var express = require('express');
var router = express.Router();
var Category = require('../models/category');

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

router.post('/cates/save-add', function(req, res, next){
  // 1. Lay data tu form gui len
  let name = req.body.name;
  let image = req.body.image;
  let description = req.body.description;

  // 2. Tao model
  var model = new Category();

  // 3. gan gia tri cho model
  model.name = name;
  model.image = image;
  model.description = description;

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
