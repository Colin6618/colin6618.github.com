// console.log('hello world');

var http = require('http');
http.createServer(function(req, res){
	res.writeHead(200, {'Content-Type': 'text/html'});
	res.write('<h1>nodejs</h1>');
	res.end('<p>Hello world again.</p>')
}).listen(3000);
console.log("httpserver is listening at port 3000!!");

