const sql = require('mssql');
const { azureConf } = require('../config/keys');

/*
	For some information see:
	https://www.npmjs.com/package/mssql#prepared-statement
*/

module.exports = async (query, inputValues) => {
	const pool = await sql.connect(azureConf);
	const ps = new sql.PreparedStatement(pool);
	let values = {};

	// ps.input('username', sql.VarChar)
	// ps.input('importe', sql.Float)
	inputValues.map(({ name, type, value }) => {
		ps.input(name, sql[type]);
		values[name] = value;
	});
	// values = { username: 'usuario123', importe: 69.2 }

	await ps.prepare(query);
	const dtbResult = await ps.execute(values);

	sql.close();

	return dtbResult.recordset;
};

/*
	Example of parameters:

	query = `
		INSERT INTO
		NombreTabla (username, importe)
		VALUES (@username, @importe)
	`
	
	inputValues = [
		{
			name: 'username',
			type: 'VarChar',
			value: 'usuario123'
		},
		{
			name: 'importe',
			type: 'Float',
			value: 69.2
		}
	]
*/