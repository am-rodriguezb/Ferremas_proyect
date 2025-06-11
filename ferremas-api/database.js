const mysql = require('mysql2/promise');
require('dotenv').config();

const pool = mysql.createPool({
    host: process.env.TIDB_HOST,
    port: process.env.TIDB_PORT,
    user: process.env.TIDB_USER,
    password: process.env.TIDB_PASSWORD,
    database: process.env.TIDB_DATABASE,
    ssl: {
    },
    waitForConnections: true,
    connectionLimit: 10,
    acquireTimeout: 60000,
    timeout: 60000
});

module.exports = pool;
