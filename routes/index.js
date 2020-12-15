var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function (req, res, next) {
  res.render('index', { title: 'index' });
});

router.get('/register', function (req, res, next) {
  res.render('register', { title: 'register' });
});

router.get('/favorite', function (req, res, next) {
  res.render('favorite', { title: 'favorite' });
});

router.get('/result', function (req, res, next) {
  res.render('result', { title: 'result' });
});

router.get('/index_login', function (req, res, next) {
  res.render('index_login', { title: 'index_login' });
});

router.get('/result_login', function (req, res, next) {
  res.render('result_login', { title: 'result_login' });
});

router.get('/fav', function (req, res, next) {
  res.render('fav', { title: 'fav' });
});


module.exports = router;

