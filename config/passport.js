

// config/passport.js

const LocalStrategy = require("passport-local").Strategy;
const bcrypt = require("bcrypt");
const pool = require("./database");

module.exports = function (passport) {
  passport.serializeUser((user, done) => {
    // 
    //
    done(null, user.id);
      });

  passport.deserializeUser(async (id, done) => {
  //   try {
  //     const [rows] = await pool.query("SELECT * FROM users WHERE id = ?", [id]);
  //     done(null, rows[0]);
  //   } catch (err) {
  //     done(err);
  //   }
  // });
  try {
    const [rows] = await pool.query("SELECT * FROM users WHERE id = ?", [id]);
    const user = rows[0];
    if (!user) {
      return done(null, false);
    }
    console.log('Deserialized User:', user);
    done(null, user);
  } catch (err) {
    done(err);
  }
});
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
              message: "Ce nom d'utilisateur ou cette adresse e-mail est déjà pris.",
            });
          } else {
            const hash = await bcrypt.hash(password, 10);
            const newUser = { username, email, password: hash, nom,telephone,adresse, prenom ,organisation ,profession};
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
            return done(null, false, { message: "Informations d'identification manquantes" });
          }

          const [rows] = await pool.query(
            "SELECT * FROM users WHERE email = ?",
            [email]
          );
          if (!rows.length) {
            return done(null, false, {
              message: "Aucun utilisateur trouvé avec cet email.",
            });
          }

          const user = rows[0];

          if (!user.isVerified) {
            return done(null, false, {
              message: "Compte non vérifié. Veuillez vérifier votre email.",
            });
          }

          const isMatch = await bcrypt.compare(password, user.password);
          if (!isMatch) {
            return done(null, false, { message: "Mot de passe incorrect." });
          }

          return done(null, user);
        } catch (err) {
          return done(err);
        }
      }
    )
  );
};
