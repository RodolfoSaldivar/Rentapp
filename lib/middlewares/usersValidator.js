const { check } = require('express-validator/check');

module.exports.add = [
	check('username')
		.not().isEmpty().withMessage('Username is missing.'),
	check('password')
		.not().isEmpty().withMessage('Password is missing.')
];