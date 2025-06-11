const mysql = require('mysql2/promise');

const pool = mysql.createPool({
    host: 'gateway01.us-east-1.prod.aws.tidbcloud.com',
    user: '3HC3AiMnLLLhT23.root',
    password: 'QLlKpZNOyrk3HERI',
    database: 'ferremas_db',
});

module.exports = pool;
