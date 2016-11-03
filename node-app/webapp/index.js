
var config  = require('config');
var http = require('http');
var standard_port=8080;

var mysql = require('mysql');
var pool = mysql.createPool( {
      host  :  config.mysqlhost,
      user  :  config.mysqluser,
      password :  config.mysqlpassword,
      database :  config.mysqldb
});

pool.getConnection( function(err, connection) {
  connection.query('select count(*) as total from pet',  function(err, rows){
    if (err) throw err;
    else {
      console.log('Number of pets: ' + rows[0].total)
    }
  });
});


var server = http.createServer(function (request, response) {
    response.writeHead(200, {'Content-Type': 'text/html'});
    response.write("<!DOCTYPE \"html\">");
    response.write("<html>");
    response.write("<head>");
    response.write("<title>Test Page</title>");
    response.write("</head>");
    response.write("<body>");
    response.write("<table style=\"width:50%\">");
    response.write("<tr>");
    response.write("<td>Current Environment:</td>");
    response.write("<td>" + config.curr_env + "</td>" );
    response.write("</tr>");
    response.write("<tr>");
    response.write("<td>Current Database:</td>");
    response.write("<td>" + config.database + "</td>" );
    response.write("</tr>");
    response.write("<tr>");
    response.write("<td>Current User:</td>");
    response.write("<td>" + config.user + "</td>" );
    response.write("</tr>");
    response.write("</table>");
    response.write("</body>");
    response.write("</html>");
    response.end();
});

server.listen(standard_port);

console.log('Server started');
console.log(config.curr_env);
console.log(config.mysqlhost);
