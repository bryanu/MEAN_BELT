var mongoose = require('mongoose'),
		bucket   = mongoose.model('bucketList'),
		user     = mongoose.model('users');

module.exports = (function() { return {

	addItem: function(req, res) {
		item = new bucket(req.body);
		item.save(function(err, item) {
			if (!err) {
				res.json(item);
			}
		})
	},

	getItems: function(req, res) {
		bucket.find({
			name: req.params.name
		}, function(err, data) {
			if (!err) {
				res.json(data);
			}
		})
	},

	getItemsDone: function(req, res) {
		bucket.find({ $and: [{ name: req.params.name}, {done: true }]
		}, function(err, data) {
			if (!err) {
				res.json(data);
			}
		})
	},

	itemsNotDone: function(req, res) {
		bucket.find({	$and: [{ name: req.params.name	}, { done: false }]
		}, function(err, data) {
			if (!err) {
				res.json(data);
			}
		})
	},

	getNames: function(req, res) {
		user.find({ name: {	$ne: req.params.name }}, function(err, data) {
			if (!err) {
				res.json(data);
			}
		})
	},

	done: function(req, res) {
		bucket.findOne({
			_id: req.params.id
		}, function(err, bucket) {
			if (!err) {
				bucket.done = true;
				bucket.save(function(err, data) {
					if (!err) {
						console.log("It Worked!!!");
					}
				})
			}
		})
	},

	loginName: function(req, res) {
		name = new user(req.body);
		name.save(function(err, item) {
				res.json(item);
		})
	}

}
})();
