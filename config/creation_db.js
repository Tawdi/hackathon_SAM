
//config/creation-db.js
const bcrypt = require("bcrypt");
const mysql = require('mysql2');
require('dotenv').config();

// Create a pool of connections
const pool = mysql.createPool({

  // host: 'localhost',
  // user: 'root',
  // password: 'admin',
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD, 

  // database: 'sys',
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0
});

// Promisify pool query methods for ease of use with async/await
const promisePool = pool.promise();

async function createDatabase() {
  try {
    // Create database and use it
    await promisePool.query(`CREATE DATABASE IF NOT EXISTS sam_db`);
    await promisePool.query(`USE sam_db`);

    // Create tables
    await promisePool.query(`
      CREATE TABLE IF NOT EXISTS users (
        id INT UNSIGNED NOT NULL AUTO_INCREMENT,
        username varchar(100) not null,
        email VARCHAR(50) NOT NULL,
        telephone varchar(20) not null,
        adresse text not null,
        password TEXT NOT NULL,
        nom VARCHAR(50) NOT NULL,
        prenom VARCHAR(50) NOT NULL,
        profession VARCHAR(200) NOT NULL,
        organisation VARCHAR(200) NOT NULL,
        role VARCHAR(255) DEFAULT 'user',
        verificationToken VARCHAR(255) ,
        isVerified BOOLEAN DEFAULT FALSE,
        PRIMARY KEY (id),
        UNIQUE INDEX email_UNIQUE (email ASC)
      )
    `);
    
    await promisePool.query(`
      CREATE TABLE IF NOT EXISTS Evenements (
        id INT AUTO_INCREMENT PRIMARY KEY,
        titre VARCHAR(255),
        apercu TEXT,
        description TEXT,
        image_url TEXT NOT NULL,
        date_debut DATE,
        date_fin DATE,
        time TIME,
        lieu VARCHAR(255),
        plan JSON,
        observations TEXT,
        participation TEXT,
        info_add TEXT
      )
    `);

    await promisePool.query(`
      CREATE TABLE IF NOT EXISTS Programmes (
        id INT AUTO_INCREMENT PRIMARY KEY,
        jour DATE,
        description TEXT,
        evenement_id INT,
        FOREIGN KEY (evenement_id) REFERENCES Evenements(id)
      )
    `);

    await promisePool.query(`
      CREATE TABLE IF NOT EXISTS Speakers (
        id INT AUTO_INCREMENT PRIMARY KEY,
        nom VARCHAR(100),
        prenom VARCHAR(100),
        description TEXT,
        evenement_id INT,
        FOREIGN KEY (evenement_id) REFERENCES Evenements(id)
      )
    `);

    await promisePool.query(`
      CREATE TABLE IF NOT EXISTS Sponsors (
        id INT AUTO_INCREMENT PRIMARY KEY,
        nom VARCHAR(100),
        description TEXT,
        evenement_id INT,
        FOREIGN KEY (evenement_id) REFERENCES Evenements(id)
      )
    `);

    await promisePool.query(`
      CREATE TABLE IF NOT EXISTS Candidatures (
        id INT AUTO_INCREMENT PRIMARY KEY,
        user_id INT UNSIGNED,
        evenement_id INT,
        motive TEXT,
        statut ENUM('en attente', 'accepte', 'refuse'),
        FOREIGN KEY (user_id) REFERENCES users(id),
        FOREIGN KEY (evenement_id) REFERENCES Evenements(id)
      )
    `);

    const [users] = await promisePool.query("SELECT COUNT(*) AS count FROM users");
    const usersCount = users[0].count;

    if (usersCount === 0) {
      // Insert admin user
      const adminPassword = process.env.ADMIN_PASSWORD || "admin_sam"; // Use env variable or secure method
      const hashedPassword = await bcrypt.hash(adminPassword, 10);
      const adminEmail = "admin@samalmoutmir.com";
      const adminNom = "admin";
      const adminPrenom = "admin";
      const adminAdresse = "safi";
      const adminProfession = "manager";
      const adminOrganisation= "SAM";
      const adminTelephone = "06000000000";


      await promisePool.query(`
        INSERT INTO users (username,email, password, nom, prenom,telephone,adresse,organisation ,profession, role, isVerified) 
        VALUES (?,?, ?, ?, ?, ?, ?, ?, ?, 'admin', TRUE)
      `, [adminPrenom,adminEmail, hashedPassword, adminNom, adminPrenom,adminTelephone,adminAdresse,adminOrganisation,adminProfession]);

      console.log("Admin user created.",);
    } else {
      console.log("Admin user already exists or other users present.");
    } 
  } catch (err) {
    console.error("Error creating database, tables, or admin user:", err);
  } finally {
    // End the pool
    await pool.end();
  }
}

module.exports = createDatabase;
