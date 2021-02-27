const mysql = require('mysql');
const config = require('config');

module.exports = mysql.createConnection({
    host: config.get('mysql.host'),
    port: config.get('mysql.port'),
    user: config.get('mysql.user'),
    password: config.get('mysql.password'),
    database: config.get('mysql.database')
})