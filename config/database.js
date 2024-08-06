
const mysql = require('mysql2');

const pool = mysql.createPool({
    host: 'localhost',
    user: 'root',
    password: 'admin',
    database: 'sam_db'
});

module.exports = pool.promise();
// const mysql = require('mysql2');

// const connection = mysql.createConnection({
//     host: 'localhost',
//     user: 'root',
//     password: 'admin',
//     database: 'sam_db'
// });

// connection.connect(err => {
//   if (err) {
//     console.error('Database connection error:', err.stack);
//     return;
//   }
//   console.log('Connected to database.');
// });

// module.exports = connection;
// const mysql = require('mysql2');

// // Create a connection pool
// const pool = mysql.createPool({
//   host: 'localhost',
//   user: 'root',
//   password: 'admin',
//   database: 'sam_db',
//   waitForConnections: true,
//   connectionLimit: 10, // Adjust as needed
//   queueLimit: 0
// });

// // Promisify pool query methods for ease of use with async/await
// const promisePool = pool.promise();

// module.exports = promisePool;

