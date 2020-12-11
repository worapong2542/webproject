var express = require('express');
var router = express.Router();
var mysql = require('mysql');
const bodyparser = require('body-parser');

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

router.post('/register', function (req, res) {
  console.log('register');
  var user = req.body.user;
  var pass = req.body.pass;
  var name = req.body.name;
  var email = req.body.email;
  var phone = req.body.phone;
  var sql = "insert into data(user,pass,name,email,phone)" + " value('" + user + "','" + pass + "','" + name + "','" + email + "','" + phone + "')";
  var checkuser = "SELECT * FROM `data` WHERE  `user` = '" + user + "'";
  db.query(checkuser, function (err, result) {
    if (result == "") {
      db.query(sql, function (err, result) {
        if (err) console.log("query register error" + result);
        else {
          res.send("1");
        }
      });
    } else {
      console.log("error username");
      res.render('register', { title: 'register' });
    }
  })
});

router.post('/login', function (req, res) {
  console.log("login");
  var user = req.body.user;
  var pass = req.body.pass;
  console.log(user + " " + pass);
  sql = "SELECT * FROM `data` WHERE  `user` = '" + user + "'" + " AND `pass` = '" + pass + "'";
  console.log(sql);
  db.query(sql, function (err, result) {
    if (result == "") {
      console.log("not found user or password" + result)
      res.render('index', { title: 'index' });
    } else {
      console.log("user and password match")
      console.log(result)
      res.send("1")
    }
  });
});

module.exports = router;
