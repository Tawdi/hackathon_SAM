// const mysql = require('mysql2');

// const pool = mysql.createPool({
//     host: 'localhost',
//     user: 'root',
//     password: 'admin',
//     database: 'sam_db'
// });

// module.exports = pool.promise();
// c
// db.js
const mysql = require('mysql2/promise');

const pool = mysql.createPool({
  host: 'localhost',
  user: 'root', // Remplacez par votre utilisateur
  password: '', // Remplacez par votre mot de passe
  database: 'db_sam'
});

module.exports = pool;
