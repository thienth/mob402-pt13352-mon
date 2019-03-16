var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

router.get('/thienth', function(req, res, next) {
  res.send('thienth dep trai');
});

router.get('/fptpoly', function(req, res, next) {
  res.send('FPT Polytechnic');
});

router.get('/pt13352', function(req, res, next) {
  res.send('FPT Polytechnic PT13352-MOB');
});

module.exports = router;
