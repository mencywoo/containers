
var config  = require('config');
var http = require('http');
var standard_port=8080;

var server = http.createServer(function (request, response) {
    response.writeHead(200, {'Content-Type': 'text/html'});
    response.write("<!DOCTYPE \"html\">");
    response.write("<html>");
    response.write("<head>");
    response.write("<title>Test Page</title>");
    response.write("</head>");
    response.write("<body>");
    response.write("Current Environment:  " + config.curr_env );
    response.write("</body>");
    response.write("</html>");
    response.end();
});

server.listen(standard_port);

console.log('Server started');
console.log(config.curr_env);
console.log(config.port);
