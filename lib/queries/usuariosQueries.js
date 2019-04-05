const table = 'Usuario';

module.exports.agregar = `
	INSERT INTO
	${table} (username, password)
	VALUES (@username, @password)

	SELECT *
	FROM ${table}
	WHERE id = SCOPE_IDENTITY()
`;

module.exports.traerTodos = `
	SELECT *
	FROM ${table}
`;