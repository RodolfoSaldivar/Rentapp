const auth = require('./auth');
const usersValidator = require('./usersValidator');
const { validationResult } = require('express-validator/check');

module.exports = {
	auth,
	usersValidator,
	sendErrors: (req, res, next) => {
		const errors = validationResult(req);
		if (errors.isEmpty()) {
			return next();
		}
		res.status(422).send({ errors: errors.array() });
	}
};