const express = require('express');
const cookieSession = require('cookie-session');
const passport = require('passport');
const bodyParser = require('body-parser');
const sql = require('mssql')
const { cookieKey } = require('./config/keys');
require('./lib/passportService');

const app = express();

app.use(bodyParser.json());
app.use(
	cookieSession({
		maxAge: 30 * 24 * 60 * 60 * 1000, // 30 days, the parameter must be in milliseconds
		keys: [cookieKey]
	})
);
app.use(passport.initialize());
app.use(passport.session());

require('./routes/usersRoutes')(app);
require('./routes/authRoutes')(app);

app.get('/', (req, res) => {
	res.send('Pagina Principal');
});

sql.on('error', err => {
	console.log('Error SQL general: ', err.message);
})

const PORT = process.env.PORT || 5000;
app.listen(PORT);