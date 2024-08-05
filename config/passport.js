
// config/passport.js
// const passport = require('passport');
// const LocalStrategy = require('passport-local').Strategy;
// const User = require('../models/user'); // Assurez-vous que le chemin est correct
// const bcrypt = require('bcrypt');
// const db = require('../db'); // Assurez-vous que le chemin est correct

// passport.use(new LocalStrategy(
//   async (email, password, done) => {
//     try {
//       const user = await User.findByEmail(email);
//       if (user && await bcrypt.compare(password, user.password)) {
//         return done(null, user);
//       } else {
//         return done(null, false, { message: 'Email ou mot de passe incorrect' });
//       }
//     } catch (err) {
//       return done(err);
//     }
//   }
// ));

// passport.serializeUser((user, done) => {
//   done(null, user.id);
// });

// passport.deserializeUser(async (id, done) => {
//   try {
//     const [rows] = await db.query('SELECT * FROM users WHERE id = ?', [id]);
//     done(null, rows[0]);
//   } catch (err) {
//     done(err);
//   }
// });

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

