
var config  = require('config');
var url = require('url');
var http = require('http');
var express = require('express');
var mysql = require('mysql');


var standard_port=8080;

// var pool = mysql.createPool( {
//       host  :  config.mysqlhost,
//       user  :  config.mysqluser,
//       password :  config.mysqlpassword,
//       database :  config.mysqldb
// });
//
// pool.getConnection( function(err, connection) {
//   connection.query('select count(*) as total from pet',  function(err, rows){
//     if (err) throw err;
//     else {
//       console.log('Number of pets: ' + rows[0].total)
//     }
//   });
// });
//

var server = express();


server.use( express.static(__dirname + '/static'),   function (request, response, next) {

  var req = url.parse(request.url, true);
  var action = req.pathname;
    if (action == '/test.jpg') {
      response.writeHead(200, {'Content-Type': 'image/gif'});
      response.end('test.jpg', 'binary');
    } else {

  response.writeHead(200, {'Content-Type': 'text/html'});
  response.write("<!DOCTYPE \"html\">");
  response.write("<html>");
  response.write("<head>");
  response.write("<title>Connection page</title>");
  response.write("</head>");
  response.write("<body>");
  response.write("<table style=\"width:50%\">");
  response.write("<tr>");
  response.write("<td>Current Environment:</td>");
  response.write("<td>" + config.curr_env + "</td>" );
  response.write("</tr>");
  response.write("<tr>");
  response.write("<td>Current Host:</td>");
  response.write("<td>" + config.mysqlhost + "</td>" );
  response.write("</tr>");
  response.write("<tr>");
  response.write("<td>Current DB:</td>");
  response.write("<td>" + config.mysqldb + "</td>" );
  response.write("</tr>");
  response.write("</table>");
  response.write("</body>");
  response.write("</html>");
  response.end();
  next();

  }
});


server.listen(standard_port, function() {

    console.log('Server started');
    console.log(config.curr_env);
    console.log(config.mysqlhost);
});
