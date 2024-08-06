
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

// const LocalStrategy = require('passport-local').Strategy;
// const bcrypt = require('bcrypt');
// const db = require('./database'); // Your database connection

// module.exports = function(passport) {
//     passport.use(new LocalStrategy({
//         usernameField: 'email',
//         passwordField: 'password'
//     }, async (email, password, done) => {
//         try {
//             const [user] = await db.query('SELECT * FROM users WHERE email = ?', [email]);
//             if (!user) {
//                 return done(null, false, { message: 'Incorrect email.' });
//             }
//             const match = await bcrypt.compare(password, user.password);
//             if (!match) {
//                 return done(null, false, { message: 'Incorrect password.' });
//             }
//             return done(null, user);
//         } catch (err) {
//             return done(err);
//         }
//     }));

//     passport.serializeUser((user, done) => {
//         done(null, user.id);
//     });

//     passport.deserializeUser(async (id, done) => {
//         try {
//             const [user] = await db.query('SELECT * FROM users WHERE id = ?', [id]);
//             done(null, user);
//         } catch (err) {
//             done(err);
//         }
//     });
// };

// const passport = require('passport');
// const LocalStrategy = require('passport-local').Strategy;
// const bcrypt = require('bcrypt');
// const mysql = require('mysql2');

// // Create a pool of connections
// const pool = mysql.createPool({
//   host: 'localhost',
//   user: 'root',
//   password: 'admin',
//   database: 'sam_db',
//   waitForConnections: true,
//   connectionLimit: 10,
//   queueLimit: 0
// });

// // Promisify pool query methods for ease of use with async/await
// const promisePool = pool.promise();

// passport.use(new LocalStrategy(
//   {
//     usernameField: 'email',
//     passwordField: 'password'
//   },
//   async (email, password, done) => {
//     try {
//       const [rows] = await promisePool.query('SELECT * FROM users WHERE email = ?', [email]);
//       if (rows.length === 0) {
//         return done(null, false, { message: 'Incorrect email.' });
//       }

//       const user = rows[0];
//       const match = await bcrypt.compare(password, user.password);

//       if (!match) {
//         return done(null, false, { message: 'Incorrect password.' });
//       }

//       return done(null, user);
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
//     const [rows] = await promisePool.query('SELECT * FROM users WHERE id = ?', [id]);
//     if (rows.length === 0) {
//       return done(new Error('User not found'));
//     }

//     const user = rows[0];
//     done(null, user);
//   } catch (err) {
//     done(err);
//   }
// });

// module.exports = passport;



// ::::::

const LocalStrategy = require("passport-local").Strategy;
const bcrypt = require("bcrypt");
const pool = require("./database");

module.exports = function (passport) {
  passport.serializeUser((user, done) => {
    // if (!user.id) {
    //   return done(new Error('User ID is missing'));
    // }
    done(null, user.id);
    // console.log(user.id); // Consider removing or replacing with a logger
  });

  passport.deserializeUser(async (id, done) => {
    try {
      const [rows] = await pool.query("SELECT * FROM users WHERE id = ?", [id]);
      done(null, rows[0]);
    } catch (err) {
      done(err);
    }
  });

  // passport.use('local-signup', new LocalStrategy({
  //   usernameField: 'username',
  //   passwordField: 'password',
  //   passReqToCallback: true
  // }, async (req, username, password, done) => {
  //   try {
  //     const [rows] = await pool.query("SELECT * FROM users WHERE username = ?", [username]);
  //     if (rows.length) {
  //       return done(null, false, { message: 'That username is already taken.' });
  //     } else {
  //       const hash = await bcrypt.hash(password, 10);
  //       const newUser = { username, password: hash };
  //       const [result] = await pool.query("INSERT INTO users (username, password) VALUES (?, ?)", [newUser.username, newUser.password]);
  //       newUser.id = result.insertId;
  //       return done(null, newUser);
  //     }
  //   } catch (err) {
  //     return done(err);
  //   }
  // }));
  passport.use(
    "local-signup",
    new LocalStrategy(
      {
        usernameField: "username",
        passwordField: "password",
        passReqToCallback: true,
      },
      async (req, username, password, done) => {
        try {
          const { email, nom,telephone,adresse, prenom,organisation ,profession } = req.body;
          const [rows] = await pool.query(
            "SELECT * FROM users WHERE username = ? OR email = ?",
            [username, email]
          );
          if (rows.length) {
            return done(null, false, {
              message: "That username or email is already taken.",
            });
          } else {
            const hash = await bcrypt.hash(password, 10);
            const newUser = { username, email, password: hash, nom,telephone,adresse, prenom };
            const [result] = await pool.query(
              "INSERT INTO users (username, email, password, nom, prenom ,telephone,adresse,organisation ,profession) VALUES (?, ?, ?, ?, ?, ?, ?,?,?)",
              [
                newUser.username,
                newUser.email,
                newUser.password,
                newUser.nom,
                newUser.prenom,
                newUser.telephone,
                newUser.adresse,
                newUser.organisation,
                newUser.profession,
              ]
            );
            newUser.id = result.insertId;
            return done(null, newUser);
          }
        } catch (err) {
          return done(err);
        }
      }
    )
  );

  // passport.use(
  //   "local-login",
  //   new LocalStrategy(
  //     {
  //       usernameField: "username",
  //       passwordField: "password",
  //       passReqToCallback: true,
  //     },
  //     async (req, username, password, done) => {
  //       try {
  //         const [rows] = await pool.query(
  //           "SELECT * FROM users WHERE username = ?",
  //           [username]
  //         );
  //         if (!rows.length) {
  //           return done(null, false, { message: "No user found." });
  //         }

  //         const user = rows[0];
  //         const isMatch = await bcrypt.compare(password, user.password);
  //         if (!isMatch) {
  //           return done(null, false, { message: "Oops! Wrong password." });
  //         }

  //         return done(null, user);
  //       } catch (err) {
  //         return done(err);
  //       }
  //     }
  //   )
  // );
  // passport.use(
  //   "local-login",
  //   new LocalStrategy(
  //     {
  //       usernameField: "email",
  //       passwordField: "password",
  //       passReqToCallback: true,
  //     },
  //     async (req, email, password, done) => {
  //       try {
  //         const [rows] = await pool.query(
  //           "SELECT * FROM users WHERE email = ?",
  //           [email]
  //         );
  //         if (!rows.length) {
  //           return done(null, false, {
  //             message: "No user found with that email.",
  //           });
  //         }

  //         const user = rows[0];
  //         const isMatch = await bcrypt.compare(password, user.password);
  //         if (!isMatch) {
  //           return done(null, false, { message: "Incorrect password." });
  //         }

  //         return done(null, user);
  //       } catch (err) {
  //         return done(err);
  //       }
  //     }
  //   )
  // );
  // passport.use(
  //   "local-login",
  //   new LocalStrategy(
  //     {
  //       usernameField: "email",
  //       passwordField: "password",
  //       passReqToCallback: true,
  //     },
  //     async (req, email, password, done) => {
  //       try {
  //         if (!email || !password) {
  //           return done(null, false, { message: "Missing credentials" });
  //         }

  //         const [rows] = await pool.query(
  //           "SELECT * FROM users WHERE email = ?",
  //           [email]
  //         );
  //         if (!rows.length) {
  //           return done(null, false, {
  //             message: "No user found with that email.",
  //           });
  //         }

  //         const user = rows[0];
  //         const isMatch = await bcrypt.compare(password, user.password);
  //         if (!isMatch) {
  //           return done(null, false, { message: "Incorrect password." });
  //         }

  //         return done(null, user);
  //       } catch (err) {
  //         return done(err);
  //       }
  //     }
  //   )
  // );
  passport.use(
    "local-login",
    new LocalStrategy(
      {
        usernameField: "email",
        passwordField: "password",
        passReqToCallback: true,
      },
      async (req, email, password, done) => {
        try {
          if (!email || !password) {
            return done(null, false, { message: "Missing credentials" });
          }

          const [rows] = await pool.query(
            "SELECT * FROM users WHERE email = ?",
            [email]
          );
          if (!rows.length) {
            return done(null, false, {
              message: "No user found with that email.",
            });
          }

          const user = rows[0];

          if (!user.isVerified) {
            return done(null, false, {
              message: "Account not verified. Please check your email.",
            });
          }

          const isMatch = await bcrypt.compare(password, user.password);
          if (!isMatch) {
            return done(null, false, { message: "Incorrect password." });
          }

          return done(null, user);
        } catch (err) {
          return done(err);
        }
      }
    )
  );
};
