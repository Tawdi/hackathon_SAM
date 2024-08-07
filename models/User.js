
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

// const db = require('../config/database'); // Assurez-vous de configurer votre connexion DB dans ce fichier

// module.exports = {
//   checkUserByEmail: (email, callback) => {
//     const sql = 'SELECT * FROM users WHERE email = ?';
//     db.query(sql, [email], callback);
//   },
//   insertUser: (nom,prenom, email,telephone, adresse,hashedPassword, callback) => {
//     const sql = 'INSERT INTO users (nom, prenom, password, email, telephone, adresse)VALUES (?,?,?, ?, ?, ?)';
//     db.query(sql, [ nom,prenom,email,telephone, adresse, hashedPassword], callback);
//   }
// };

const pool = require("../config/database");
const bcrypt = require("bcrypt");
const crypto = require("crypto");

class User {
  static async findByEmail(email) {
    const [rows] = await pool.query("SELECT * FROM users WHERE email = ?", [
      email,
    ]);
    return rows[0];
  }

  static async createUser(
    username,
    email,
    password,
    nom,
    prenom,
    telephone,
    adresse,
    organisation,
    profession,
    verificationToken
  ) {
    const hashedPassword = await bcrypt.hash(password, 10);
    await pool.query(
      "INSERT INTO users (username, email, password, nom, prenom,telephone, adresse,organisation ,profession, role, verificationToken, isVerified) VALUES (?, ?, ?, ?,?,?, ?, ?,?,?, ?, ?)",
      [
        username,
        email,
        hashedPassword,
        nom,
        prenom,
        telephone,
        adresse,
        organisation,
        profession,
        "user",
        verificationToken,
        false,
      ]
    );
  }

  static async verifyUser(token) {
    const [rows] = await pool.query(
      "SELECT * FROM users WHERE verificationToken = ?",
      [token]
    );
    if (!rows.length) return null;
    const user = rows[0];
    await pool.query(
      "UPDATE users SET isVerified = ?, verificationToken = ? WHERE id = ?",
      [true, null, user.id]
    );
    return user;
  }

  static async findById(userId) {
    const [rows] = await pool.query("SELECT * FROM users WHERE id = ?", [
      userId,
    ]);
    return rows[0];
  }

  static async updatePassword(userId, newPassword) {
    const hashedPassword = await bcrypt.hash(newPassword, 10);
    await pool.query("UPDATE users SET password = ? WHERE id = ?", [
      hashedPassword,
      userId,
    ]);
  }

  static async deleteUser(userId) {
    await pool.query("DELETE FROM users WHERE id = ?", [userId]);
  }

  static async updateUser(
    userId,
    { username, email, nom, prenom, telephone, adresse, organisation, profession }
  ) {
    const [result] = await pool.query(
      "UPDATE users SET username = ?, email = ?, nom = ?, prenom = ?, telephone = ?, adresse = ?, organisation = ?, profession = ? WHERE id = ?",
      [username, email, nom, prenom, telephone, adresse, organisation, profession, userId]
    );
    return result.affectedRows > 0;
  }

  static async listAllUsers() {
    const [rows] = await pool.query("SELECT * FROM users");
    return rows;
  }

  static async findUsersByRole(role) {
    const [rows] = await pool.query("SELECT * FROM users WHERE role = ?", [role]);
    return rows;
  } 

  static async countUsers() {
    const [rows] = await pool.query("SELECT COUNT(*) as count FROM users");
    return rows[0].count;
  }
}

module.exports = User;
