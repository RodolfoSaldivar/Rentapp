const { check } = require('express-validator/check');

module.exports.add = [
	check('username')
		.not().isEmpty().withMessage('Falta username'),
	check('password')
		.not().isEmpty().withMessage('Falta password')
];