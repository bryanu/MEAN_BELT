var bucketlist = require('../controllers/bucketlists.js');

module.exports = function(app) {
	app.post('/login', function(req, res) {
		bucketlist.loginName(req, res);
	})
	app.post('/item', function(req, res) {
		bucketlist.addItem(req, res);
	})
	app.get('/items/:name', function(req, res) {
		bucketlist.getItems(req, res);
	})
	app.get('/itemsdone/:name', function(req, res) {;
		bucketlist.getItemsDone(req, res);
	})
	app.get('/itemsnotdone/:name', function(req, res) {
		bucketlist.itemsNotDone(req, res);
	})
	app.get('/names/:name', function(req, res) {
		bucketlist.getNames(req, res);
	})
	app.get('/done/:id', function(req, res) {
		bucketlist.done(req, res);
	})
}
