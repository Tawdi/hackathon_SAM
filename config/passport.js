const LocalStrategy = require('passport-local').Strategy;
const bcrypt = require('bcrypt');
const db = require('./sam_db'); // Your database connection

module.exports = function(passport) {
    passport.use(new LocalStrategy({
        usernameField: 'email',
        passwordField: 'password'
    }, async (email, password, done) => {
        try {
            const [user] = await db.query('SELECT * FROM users WHERE email = ?', [email]);
            if (!user) {
                return done(null, false, { message: 'Incorrect email.' });
            }
            const match = await bcrypt.compare(password, user.password);
            if (!match) {
                return done(null, false, { message: 'Incorrect password.' });
            }
            return done(null, user);
        } catch (err) {
            return done(err);
        }
    }));

    passport.serializeUser((user, done) => {
        done(null, user.id);
    });

    passport.deserializeUser(async (id, done) => {
        try {
            const [user] = await db.query('SELECT * FROM users WHERE id = ?', [id]);
            done(null, user);
        } catch (err) {
            done(err);
        }
    });
};
