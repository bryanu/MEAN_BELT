var users    = require('../controllers/users.js'),
		apt = require('../controllers/apt.js');

module.exports = function(app){
	app.post('/register', users.register);
	app.post('/login',    users.login);
	app.post('/appointment',  apt.create);
	app.get('/appointment',  apt.index);
	app.delete('/appointment/:id', apt.delete);
}
