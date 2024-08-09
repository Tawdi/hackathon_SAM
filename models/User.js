
// user

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
