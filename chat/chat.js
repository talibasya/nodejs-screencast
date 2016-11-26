
var clients = [];

var chat = {
	subscribe: function(req, res) {
		console.log('subscribe');
		clients.push(res);

		res.on('close', function() {
			clients.splice(clients.indexOf(res). 1);
		});
	},

	publish: function(message) {
		console.log('publish');
		clients.forEach(function(res) {
			res.end(message);
		});

		clients = [];
	}
}


module.exports = chat;