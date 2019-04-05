const bcrypt = require('bcrypt');
const makeQuery = require('../lib/makeQuery');
const { azureConf } = require('../config/keys');
const { usuariosQueries } = require('../lib/queries');
const objectCreator = require('../lib/objectCreator');
const { usuariosValidator, sendErrors } = require('../lib/middlewares');

module.exports = (app) => {

//=========================================================================
//----> GET - Traer Todos

	app.get(
		'/api/usuarios',
		async (req, res) => {
			try {
				const result = await makeQuery(
					usuariosQueries.traerTodos,
					[]
				);
				res.send(result);
			} catch (err) {
				console.log('Error en catch: ', err.message);
			}
		}
	);

//=========================================================================
//----> POST - Agregar

	app.post(
		'/api/usuarios',
		usuariosValidator.agregar,
		sendErrors,
		async (req, res) => {
			const { username, password } = req.body;
			try {
				const hash = await bcrypt.hash(password, 10);
				const inputValues = [
					objectCreator('username', 'VarChar', username),
					objectCreator('password', 'VarChar', hash)
				];
				const result = await makeQuery(
					usuariosQueries.agregar,
					inputValues
				);
				res.send(result[0]);
			}
			catch (err) {
				console.log(err.message);
			}
		}
	);

//=========================================================================

};