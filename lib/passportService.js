const bcrypt = require('bcrypt');
const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const makeQuery = require('./makeQuery');
const { usersQueries } = require('./queries');
const objectCreator = require('./objectCreator');

//=========================================================================

passport.serializeUser((user, done) => {
	done(null, user.id);
});

//=========================================================================

passport.deserializeUser(async (userId, done) => {
	try {
		const inputValues = [
			objectCreator('id', 'Int', userId)
		];
		const user = await makeQuery(
			usersQueries.getById,
			inputValues
		);
		done(null, user[0]);
	}
	catch (err) {
		console.log('deserializeUser: ', err.message);
	}
});

//=========================================================================

passport.use(new LocalStrategy(
   async (username, password, done) => {
      try {
         const inputValues = [
            objectCreator('username', 'VarChar', username)
         ];
         let user = await makeQuery(
            usersQueries.getByUsername,
            inputValues
         );
         user = user[0];

         if (!user)
            return done(null, false, { message: 'User does not exist' });

         const correctPassword = await bcrypt.compare(
            password,
            user.password
         );

         if (!correctPassword)
            return done(null, false, { message: 'Incorrect password' });

         done(null, user);
      }
      catch (err) {
         console.log('LocalStrategy: ', err.message);
      }
   }
));