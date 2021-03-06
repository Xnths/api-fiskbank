const query = require('../../../database/query');

const create = () => {
    const sql = "CREATE TABLE IF NOT EXISTS FiskDollars (id INT NOT NULL REFERENCES Students(id), dateTransaction DATETIME DEFAULT CURRENT_TIMESTAMP, balance FLOAT)"
    return query(sql);
}

module.exports = create;