var redis = require('redis').createClient();

module.exports = function handler(req, res) {
	if (req.url = '/') {
		redis.get('data', process.domain.bind(function(err, data){
			throw new Error('redis callback');
		}));
	} else {
		res.statusCode = 404;
		res.end('Not found');
	}
}