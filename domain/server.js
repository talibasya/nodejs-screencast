var http = require('http');
var fs = require('fs');

function handler(req, res) {
	if (req.url == '/') {
		fs.readFile('index.html', function(err, content) {
			if (err) {
				conosle.log(err);
				res.statusCode = 500;
				res.end("Server error");
				return;
			}
			res.end(content)
		})

	} else {
		res.statusCode = 404;
		res.end("Not Found");
	}
}

var server = new http.createServer(handler);
module.exports = server;