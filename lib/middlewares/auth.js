
module.exports.isLoggedIn = (req, res, next) => {
	// console.log('session user: ', req.user);
	if (!req.isAuthenticated())
		return res.status(401).send({ message: 'Must authenticate first' });
	next();
};