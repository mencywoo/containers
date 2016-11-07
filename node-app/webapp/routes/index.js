var express = require('express');
var config = require('config');
var router = express.Router();
var mysql = require('mysql');


var pool = mysql.createPool( {
      host  :  config.mysqlhost,
      user  :  config.mysqluser,
      password :  config.mysqlpassword,
      database :  config.mysqldb
});


// var connection = pool.getConnection( function(err, connection) {
//   connection.query('select count(*) as total from pet',  function(err, rows){
//     if (err) throw err;
//     console.log('Number of pets: ' + rows[0].total)
//   });
// });
//
var connection = mysql.createConnection({
  host : config.mysqlhost,
  user : config.mysqluser,
  password: config.mysqlpassword,
  database : config.mysqldb
});

//var connection = pool.getConnection();



/* GET home page. */
router.get('/', function(req, res, next) {
  connection.query('select * from pet limit 10',  function(err, rows){
    if (err) throw err;
    console.log('Number of pets: ' + rows[0])
    res.render('index', { title: 'Environment',
                          curr_env: config.curr_env,
                          curr_mysqlhost: config.mysqlhost,
                          curr_mysqldb:config.mysqldb,
                          curr_mysqluser: config.mysqluser,
                          curr_image: 'images/'+config.curr_image,
                          rows: rows
                        });
  });
});


module.exports = router;
