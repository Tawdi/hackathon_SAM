// const mysql = require('mysql2');

// const pool = mysql.createPool({
//     host: 'localhost',
//     user: 'root',
//     password: 'admin',
//     database: 'sam_db'
// });

// module.exports = pool.promise();
const mysql = require('mysql2');

const connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'admin',
    database: 'sam_db'
});

connection.connect(err => {
  if (err) {
    console.error('Database connection error:', err.stack);
    return;
  }
  console.log('Connected to database.');
});

module.exports = connection;