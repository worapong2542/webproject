var express = require('express');
var router = express.Router();
var mysql = require('mysql');
var db = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: '',
  database: 'datauser'
});
db.connect(function (err) {
  if (err) console.log('DB Error');
  else console.log('Connect DB');
});
const bodyparser = require('body-parser');
/* GET users listing. */
router.get('/', function (req, res, next) {
  sql = "select * from data";
  db.query(sql, function (err, result, fields) {
    if (err) throw console.log('query error');
    //res.send(result);
    console.log(result)
  })
  res.send('respond with a resource');
});

// router.get('/register/:user/:pass/:name/:email/:phone', function (req, res) {
//   console.log(' in database');
//   var user = req.params.user;
//   var pass = req.params.pass;
//   var name = req.params.name;
//   var email = req.params.email;
//   var phone = req.params.phone;
//   var sql = "insert into data(user,pass,name,email,phone)" + " value('" + user + "','" + pass + "','" + name + "','" + email + "','" + phone + "')";
//   console.log(sql);
//   db.query(sql, function (err, result) {
//     if (err) console.log('query error');
//     console.log(result);
//   })
// });
router.post('/register/', function (req, res) {
  console.log(' in database');
  var user = req.body.user;
  var pass = req.body.pass;
  var name = req.body.name;
  var email = req.body.email;
  var phone = req.body.phone;
  var sql = "insert into data(user,pass,name,email,phone)" + " value('" + user + "','" + pass + "','" + name + "','" + email + "','" + phone + "')";
  console.log(sql);
  db.query(sql, function (err, result) {
    if (err) console.log('query error');
    console.log(result);
  })
});

router.get('/login/', function (req, res) {
  var user = req.body.user;
  var pass = req.body.pass;
  console.log(user + " " + pass);
  sql = "SELECT * FROM `data` WHERE  `user` = '" + user + "'" + " AND `pass` = '" + pass + "'";
  console.log(sql);
  db.query(sql, function (err, result) {
    if (result == "") {
      console.log("not found")
      res.render('index', { title: 'index' });
    } else {
      console.log("Right")
      res.render('index', { title: 'index' });
    }
  });
});
module.exports = router;
