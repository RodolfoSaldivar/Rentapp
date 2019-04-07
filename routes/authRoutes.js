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

	// app.post('/api/login',
	// 	passport.authenticate('local', { failureRedirect: '/error' }),
	// 	(req, res) => {
	// 		console.log(req.isAuthenticated());
	// 		res.send(req.user);
	// 	}
	// );

//=========================================================================

	app.get('/api/logout', (req, res) => {
		req.logout();
		res.send({ message: 'Logged Out' });
	});

//=========================================================================

};