/*var MongoClient = require('mongodb').MongoClient
 , format = require('util').format;

MongoClient.connect('mongodb://127.0.0.1:27017/chat', function(err, db) {
	if (err) throw err;

	var collection = db.collection('test_insert');
	
	collection.remove({}, function(err, results) {
		console.log(arguments);
	});

	collection.insert({a:2}, function(err, docs) {
		collection.count(function(err, count) {
			console.log(format('count = %s', count));
		});

		collection.find().toArray(function(err, results) {
			console.dir(results);

			db.close();
		})
	})
})*/


/*
var mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/test');

var schema = mongoose.Schema({
	name: String
});
schema.methods.meow = function() {
	console.log(this.get('name'));
};

var Cat = mongoose.model('Cat', schema); // cats

var kitty = new Cat({ 
	name: 'Zildjian' 
});

console.log(kitty);

kitty.save(function(err, kitty, affected) {
	console.log(arguments);

	kitty.meow();
});
*/

var User = require('./models/user').User;

var user = new User({
	username: 'Tester',
	password: 'secret'
});

user.save(function(err, user, affected) {
	if (err) throw err;

	User.findOne({username: 'Tester'}, function(err, tester) {
		console.log(tester)
	})

	// console.log(arguments);
});
