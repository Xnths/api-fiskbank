const { createConnection } = require('mysql');
const query = require('../../database/query');

const create = () => {
    const sql = "CREATE TABLE IF NOT EXISTS Students (id int NOT NULL AUTO_INCREMENT, name VARCHAR(75) NOT NULL, book VARCHAR(4) NOT NULL, PRIMARY KEY (id))";

    return query(sql);
}

module.exports = create;