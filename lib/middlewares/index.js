const usuariosValidator = require('./usuariosValidator');
const { validationResult } = require('express-validator/check');

module.exports = {
	usuariosValidator,
	sendErrors: (req, res, next) => {
		const errors = validationResult(req);
		if (errors.isEmpty()) {
			return next();
		}
		res.status(422).send({ errors: errors.array() });
	}
};