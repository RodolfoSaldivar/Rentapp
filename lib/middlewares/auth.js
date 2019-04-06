
module.exports.isLoggedIn = (req, res, next) => {
	console.log('auth: ',req.isAuthenticated());
	console.log('session: ', req.session);
	next();
};