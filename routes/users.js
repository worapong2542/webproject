var express = require('express');
var router = express.Router();
var mysql = require('mysql');
const bodyparser = require('body-parser');
var username = "";

var db = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: '',
  database: 'data_covid'
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
      username = user;
      res.send("1")
    }
  });
});
router.get('/logincheck/:user/:pass', function (req, res) {
  console.log("logincheck");
  var user = req.params.user;
  var pass = req.params.pass;
  sql = "SELECT * FROM `data` WHERE  `user` = '" + user + "'" + " AND `pass` = '" + pass + "'";
  console.log(sql);
  db.query(sql, function (err, result) {
    if (result == "") {
      console.log("not found user or password" + result)
    } else {
      console.log("user and password match")
      res.send("1");
    }
  });
});

router.get('/location/:id', function (req, res) {
  console.log("location")
  var id = req.params.id;
  console.log(id)
  var sql = "SELECT * FROM `location` WHERE  `id` = '" + id + "'";
  db.query(sql, function (err, result) {
    console.log(result);
    res.send(result)
  })
});

router.get('/username', function (req, res, next) {
  res.send(username);
});

router.get('/logout/:del_user', function (req, res, next) {
  var del_user = req.params.del_user;
  if (del_user == "0") {
    username = ""
  } else username = ""
});

router.get('/fav/:city_id/:category', function (req, res) {
  console.log("fav")
  var city_id = req.params.city_id;
  var category = req.params.category;
  var sql = "insert into fav(user,id,category)" + " value('" + username + "','" + city_id + "','" + category + "')";
  console.log(sql)
  db.query(sql, function (err, result) {
    if (err) {
      console.log("have fav")
    } else {
      res.send("saving")
    }
  })
});

router.get('/getfav', function (req, res, next) {
  console.log("getfav")
  var sql = "SELECT * FROM `fav` WHERE  `user` = '" + username + "'";
  console.log(sql)
  db.query(sql, function (err, result) {
    if (err) {
      console.log("qurry error")
    }
    else {
      res.send(result);
    }
  })
});

router.get('/delfav/:del_id', function (req, res, next) {
  console.log("del_fav")
  var del_id = req.params.del_id;
  var sql = "DELETE FROM `fav` WHERE `fav`.`user` = '" + username + "' AND `fav`.`id` = '" + del_id + "'";
  console.log(sql)
  db.query(sql, function (err, result) {
    if (err) {
      console.log("qurry error")
    }
    else {
      res.send(result);
    }
  })
});


module.exports = router;
