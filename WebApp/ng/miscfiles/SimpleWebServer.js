var http = require('http');

var server = http.createServer(function (request, response) {
    response.writeHead(200, {"Content-Type": "text/plain"});
    response.end("<b>This is my first web server using Node!</b>\n");
});
server.listen(8000);
console.log("Server running at http://127.0.0.1:8000/");