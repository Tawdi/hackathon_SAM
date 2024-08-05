
// // models/user.js
// const db = require('../db'); // Assurez-vous que vous avez configuré db.js

// const User = {
//   async findByEmail(email) {
//     const [rows] = await db.query('SELECT * FROM users WHERE email = ?', [email]);
//     return rows[0];
//   },

//   async createUser(userData) {
//     const { username, email, password, nom, prenom } = userData;
//     const hashedPassword = await bcrypt.hash(password, 10);
//     await db.query(
//       'INSERT INTO users (username, email, password, nom, prenom) VALUES (?, ?, ?, ?, ?)',
//       [username, email, hashedPassword, nom, prenom]
//     );
//   }
// };

// module.exports = User;

// const db = require('../config/db'); // Assurez-vous que ce chemin est correct

// const createUser = (userData) => {
//   return new Promise((resolve, reject) => {
//     const { email, password, nom, prenom, verificationToken } = userData;
//     const query = `INSERT INTO users (email, password, nom, prenom, verificationToken) VALUES (?, ?, ?, ?, ?)`;
//     db.query(query, [email, password, nom, prenom, verificationToken], (err, results) => {
//       if (err) return reject(err);
//       resolve(results);
//     });
//   });
// };

// const findByEmail = (email) => {
//   return new Promise((resolve, reject) => {
//     const query = `SELECT * FROM users WHERE email = ?`;
//     db.query(query, [email], (err, results) => {
//       if (err) return reject(err);
//       resolve(results[0]);
//     });
//   });
// };

// const findByVerificationToken = (token) => {
//   return new Promise((resolve, reject) => {
//     const query = `SELECT * FROM users WHERE verificationToken = ?`;
//     db.query(query, [token], (err, results) => {
//       if (err) return reject(err);
//       resolve(results[0]);
//     });
//   });
// };

// const verifyUser = (userId) => {
//   return new Promise((resolve, reject) => {
//     const query = `UPDATE users SET isVerified = true, verificationToken = NULL WHERE id = ?`;
//     db.query(query, [userId], (err, results) => {
//       if (err) return reject(err);
//       resolve(results);
//     });
//   });
// };

// module.exports = {
//   createUser,
//   findByEmail,
//   findByVerificationToken,
//   verifyUser
// };

const db = require('../sam_db'); // Assurez-vous de configurer votre connexion DB dans ce fichier

module.exports = {
  checkUserByEmail: (email, callback) => {
    const sql = 'SELECT * FROM users WHERE email = ?';
    db.query(sql, [email], callback);
  },
  insertUser: (username, email, hashedPassword, role, callback) => {
    const sql = 'INSERT INTO users (email, password, role)(email, password, nom, prenom, verificationToken) VALUES (?, ?, ?, ?)';
    db.query(sql, [ email, hashedPassword, role], callback);
  }
};

