var express = require('express');
var router = express.Router();
var mysql = require('mysql');
var db = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: '',
  database: 'datauser'
});
// db.connect(function (err) {
//   if (err) console.log('DB Error');
//   else console('Connect DB');
// })
const bodyparser = require('body-parser');
/* GET users listing. */
router.get('/', function (req, res, next) {
  res.send('respond with a resource');
});
router.get('/register/:user/:pass/:name/:email/:phone', function (req, res) {
  console.log(' in database');
  var sid = req.body.sid;
  var user = req.params.user;
  var pass = req.params.pass;
  var name = req.params.name;
  var email = req.params.email;
  var phone = req.params.phone;
  var sql = "insert into user(std_user,std_pass,std_name,std_email,std_phone)";
  sql += " value('" + sid + "','" + user + "','" + pass + "','" + name + "'," + email + "','" + phone + ")";
  con.query(sql, function (err, result) {
    if (err) throw console.log('query error');
    res.send(result);
  })
});

router.get('/login/:user/:pass', function (req, res) {
  var user = req.params.user;
  var pass = req.params.pass;
  sql = "select * from user_login where user ='" + user + "'and password = '" + pwd + "'";
  con.query(sql, function (err, result) {
    if (err) throw err;
    var resJosn;
    if (result.length > 0) {
      resJosn = { "result": 1 };
    } else {
      resJosn = { "result": 0 };
    }
  });
});
module.exports = router;
