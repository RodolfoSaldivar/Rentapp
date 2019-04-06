const table = 'Users';

//=========================================================================

module.exports.add = `
	INSERT INTO
	${table} (username, password)
	VALUES (@username, @password)

	SELECT *
	FROM ${table}
	WHERE id = SCOPE_IDENTITY()
`;

//=========================================================================

module.exports.getAll = `
	SELECT *
	FROM ${table}
`;

//=========================================================================

module.exports.getById = `
	SELECT *
	FROM ${table}
	WHERE id = @id
`;

//=========================================================================

module.exports.getByUsername = `
	SELECT *
	FROM ${table}
	WHERE username = @username
`;