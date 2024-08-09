
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
      CREATE TABLE IF NOT EXISTS actualites (
    id INT AUTO_INCREMENT PRIMARY KEY,
    titre VARCHAR(255) NOT NULL,
    date_publication DATETIME NOT NULL,
    contenu TEXT NOT NULL,
    image_url VARCHAR(255),
    auteur VARCHAR(100),
    statut ENUM('publiée', 'brouillon') DEFAULT 'publiée'
);

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
        image_url VARCHAR(255),
        evenement_id INT,
        FOREIGN KEY (evenement_id) REFERENCES Evenements(id)
      )
    `);

    await promisePool.query(`
      CREATE TABLE IF NOT EXISTS Sponsors (
        id INT AUTO_INCREMENT PRIMARY KEY,
        nom VARCHAR(100),
        description TEXT,
        image_url VARCHAR(255),
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
    const [events] = await promisePool.query(
      "SELECT COUNT(*) AS count FROM evenements"
    );
    const eventCount = events[0].count;
    if (eventCount === 0) {
      await promisePool.query(`
        INSERT INTO Evenements (titre, apercu, description, image_url, date_debut, date_fin, time, lieu, plan, observations, participation, info_add) VALUES 
        ('Conférence sur l''Innovation en Mécanisation', 'Une conférence dédiée aux dernières innovations en mécanisation agricole.', 'Rejoignez-nous pour une conférence approfondie sur les nouvelles technologies qui révolutionnent la mécanisation agricole. Des experts du secteur partageront leurs connaissances et leurs perspectives.', 'img/6.jpg', '2024-09-15', '2024-09-15', '09:00:00', 'Centre des Congrès, Paris', '{"session1": "Technologies émergentes", "session2": "Défis et solutions"}', 'Présence d''experts internationaux.', 'Inscription en ligne obligatoire.', 'Des ateliers pratiques seront organisés après les sessions principales.'),
        ('Atelier de Formation sur les Équipements Agricoles', 'Formation sur l''utilisation des équipements agricoles modernes.', 'Ce workshop est conçu pour former les agriculteurs à l''utilisation efficace des derniers équipements agricoles. Des démonstrations pratiques seront fournies.', 'img/5-enhanced.png', '2024-10-01', '2024-10-01', '14:00:00', 'Salle de Formation, Lyon', '{"atelier1": "Utilisation des semoirs", "atelier2": "Maintenance des tracteurs"}', 'Matériel fourni sur place.', 'Places limitées, inscription requise.', 'Prévoir des vêtements adaptés pour les démonstrations en extérieur.'),
        ('Salon de la Mécanisation Durable', 'Exposition des meilleurs équipements et technologies pour une agriculture durable.', 'Venez découvrir les dernières innovations en mécanisation durable lors de notre salon. Des exposants de renom présenteront leurs produits et solutions.', 'img/Épandeurs_d''engrais.jpg', '2024-11-10', '2024-11-12', '10:00:00', 'Parc des Expositions, Bordeaux', '{"stand1": "Équipements écologiques", "stand2": "Technologies de précision"}', 'Événement accessible au grand public.', 'Entrée gratuite, mais l''inscription en ligne est recommandée.', 'Des conférences et panels seront également organisés tout au long de l''événement.'),
        ('Journée de Sensibilisation à la Mécanisation Durable', 'Événement pour sensibiliser sur les pratiques de mécanisation durable.', 'Une journée dédiée à la sensibilisation et à l''éducation sur les pratiques de mécanisation durable. Des experts et des agriculteurs partageront leurs expériences et meilleures pratiques.', 'img/Irrigation.jpg', '2024-12-05', '2024-12-05', '09:00:00', 'Université de Montpellier', '{"session1": "Introduction à la mécanisation durable", "session2": "Cas d''étude"}', 'Participez aux discussions et échangez avec des professionnels du secteur.', 'Inscription gratuite mais obligatoire.', 'Un déjeuner est inclus dans l''événement.'),
        ('Séminaire sur les Technologies Avancées en Agriculture', 'Séminaire sur les nouvelles technologies dans le domaine de l''agriculture.', 'Ce séminaire explore les technologies avancées dans l''agriculture, avec un focus sur la mécanisation et la durabilité.', 'img/fact-bg-enhanced.png', '2024-08-20', '2024-08-20', '13:00:00', 'Hôtel de Ville, Toulouse', '{"session1": "Technologies de demain", "session2": "Innovations en pratique"}', 'Conférenciers de renom présents.', 'Réservation de place recommandée.', 'Des démonstrations de produits seront également proposées.');
      `);
    }

    const [users] = await promisePool.query("SELECT COUNT(*) AS count FROM users");
    const usersCount = users[0].count;

    if (usersCount === 0) {
      // Insert admin user
      const adminPassword = process.env.ADMIN_PASSWORD || "admin_sam"; // Use env variable or secure method
      const hashedPassword = await bcrypt.hash(adminPassword, 10);
      const adminEmail = process.env.ADMIN_EMAIL ||"admin@samalmoutmir.com";
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
