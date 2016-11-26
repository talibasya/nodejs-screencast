var http = require('http');
var fs = require('fs');
var chat = require('./chat');

http.createServer(function(req, res) {
	switch (req.url) {
		case '/':
			sendFile('index.html', res);
			break;

		case '/subscribe' :
			chat.subscribe(req, res);
			break;

		case '/publish':
			var body = "";

			req
				.on('readable', function() {
					var readBlock = req.read();
					if (readBlock)
						body += readBlock;

					if (body.length > 1e4) {
						res.statusCode = 413;
						res.end("Your message is too big for my little chat")
					}
				})
				.on('end', function() {

					try {
						body = JSON.parse(body);
					} catch (e) {
						res.statusCode = 400;
						res.end('Bad request');
						return;
					}

					chat.publish(body.message);
					res.end("ok");
				})
			break;

		default:
			res.statusCode = 404;
			res.end('Not found');
	}

}).listen(3000);


function sendFile(filename, res) {
	var fileStream = fs.createReadStream(filename);

	fileStream
		.on('error', function(err) {
		res.statusCode = 500;
		res.end('Server Error');
	})
		.pipe(res);

	// res.on('close', function() { // connection was break (for normal 'close' emits event 'finish')
		// file.destroy();
	// })
}