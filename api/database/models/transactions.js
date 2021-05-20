const query = require('../query');

const create = () => {
    const sql = `CREATE TABLE IF NOT EXISTS
        Transactions (id SMALLINT NOT NULL AUTO_INCREMENT PRIMARY KEY,
            account_id SMALLINT NOT NULL,
            type ENUM('withdraw', 'deposit', 'transference') NOT NULL,
            value FLOAT NOT NULL,
            executedAt DATETIME DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
            CONSTRAINT FK_Account FOREIGN KEY (account_id) REFERENCES Accounts(id))`
    return query(sql);
}

module.exports = create;