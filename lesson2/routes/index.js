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

router.get('/cates/remove/:cId', function(req, res, next){
  Category.deleteOne({_id: req.params.cId}, function (err) {
    if (err) return handleError(err);
    // deleted at most one tank document
    res.redirect('/cates');
  });
});

module.exports = router;
