const query = require('../../../database/query');

const create = () => {
    const sql = "CREATE TABLE IF NOT EXISTS Transactions (id INT NOT NULL REFERENCES Students(id), date DATETIME DEFAULT CURRENT_TIMESTAMP, amount FLOAT NOT NULL)"
    return query(sql);
}

module.exports = create;