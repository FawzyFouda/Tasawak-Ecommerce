// const mysql = require('mysql2');
// require('dotenv').config();
// const pool = mysql.createPool({
//     host: process.env.DB_HOST,
//     user: process.env.DB_USER,
//     password: process.env.DB_PASS,
//     database: process.env.DB_NAME,
//     waitForConnections: true,
//     connectionLimit: 10,
//     queueLimit: 0
// });
// module.exports = pool.promise();


const caPath = process.env.NODE_ENV === 'production'
    ? '/etc/secrets/ca.pem'
    : path.join(__dirname, 'ca.pem');

const mysql = require('mysql2');
const fs = require('fs');
const path = require('path');

require('dotenv').config();

const pool = mysql.createPool({
    host: process.env.DB_HOST,
    port: process.env.DB_PORT || 3306,
    user: process.env.DB_USER,
    password: process.env.DB_PASS,
    database: process.env.DB_NAME,

    ssl: {
    ca: fs.readFileSync(caPath)
},

    waitForConnections: true,
    connectionLimit: 10,
    queueLimit: 0
});

module.exports = pool.promise();