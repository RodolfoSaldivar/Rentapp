const passport = require('passport');

module.exports = (app) => {

//=========================================================================

	app.post('/api/login', (req, res, next) => {
		passport.authenticate('local', (err, user, info) => {
			if (err)
				return next(err);
			if (!user)
				return res.status(400).send({ message: info.message });

			req.logIn(user, (err) => {
				if (err) return next(err);
				return res.send(user);
			});

		})(req, res, next);
	});

//=========================================================================

	app.get('/api/logout', (req, res) => {
		req.logout();
		res.send({ message: 'Logged Out' });
	});

//=========================================================================

};