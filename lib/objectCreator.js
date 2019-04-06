/*
	Method that prepares an object to be used by "makeQuery"

	Return = {
		name: 'username',
		type: 'VarChar',
		value: 'usuario123'
	}
*/

module.exports = (name, type, value) => ({ name, type, value });