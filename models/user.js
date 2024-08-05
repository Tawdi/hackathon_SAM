// models/user.js
const db = require('../db'); // Assurez-vous que vous avez configuré db.js

const User = {
  async findByEmail(email) {
    const [rows] = await db.query('SELECT * FROM users WHERE email = ?', [email]);
    return rows[0];
  },

  async createUser(userData) {
    const { username, email, password, nom, prenom } = userData;
    const hashedPassword = await bcrypt.hash(password, 10);
    await db.query(
      'INSERT INTO users (username, email, password, nom, prenom) VALUES (?, ?, ?, ?, ?)',
      [username, email, hashedPassword, nom, prenom]
    );
  }
};

module.exports = User;
