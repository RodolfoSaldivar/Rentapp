/*
	Metodo que prepara un objeto para ser utilizado por "makeQuery"

	Retorno = {
		name: 'username',
		type: 'VarChar',
		value: 'usuario123'
	}
*/

module.exports = (name, type, value) => ({ name, type, value });