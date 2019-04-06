const bcrypt = require('bcrypt');
const makeQuery = require('../lib/makeQuery');
const { usersQueries } = require('../lib/queries');
const objectCreator = require('../lib/objectCreator');
const { auth, usersValidator, sendErrors } = require('../lib/middlewares');

module.exports = (app) => {

//=========================================================================

	app.get(
		'/api/users',
		auth.isLoggedIn,
		async (req, res) => {
			try {
				const result = await makeQuery(
					usersQueries.getAll,
					[]
				);
				res.send(result);
			} catch (err) {
				console.log('Error en catch: ', err.message);
			}
		}
	);

//=========================================================================

	app.post(
		'/api/users',
		usersValidator.add,
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
					usersQueries.add,
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

	app.get(
		'/api/users/:id',
		async (req, res) => {
			try {
				const inputValues = [
					objectCreator('id', 'Int', req.params.id)
				];
				const result = await makeQuery(
					usersQueries.getById,
					inputValues
				);
				res.send(result[0]);
			} catch (err) {
				console.log('Error en catch: ', err.message);
			}
		}
	);

//=========================================================================

};