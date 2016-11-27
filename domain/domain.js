var domain = require('domain');
var fs = require('fs');
var http = require('http');

var d = domain.create();

d.on('error', function(err) {
	console.error('Domain catches %s', err);
});

// USING 1

d.run(function() { // cathes error;
	ERROR();
})

// USING 2

d.run(function() { // catches err after 1 sec
	// d.enter(); -> process.domain

	setTimeout(function() {
		console.error(process.domain);
		ERROR2();
	}, 1000);

	// d.exit();
})

// USING 3


d.run(function() {
	server = new http.Server();
	// d.add(server); -> make memory overflow
	// d.remove(server);
});

server.on('boom', function() {
	setTimeout(function() {
		fs.readFile(__filename, function() {
			ERROR();
		})
	}, 1000);
})

server.emit('boom');