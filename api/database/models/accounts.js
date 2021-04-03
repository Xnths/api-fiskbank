const query = require('../query');

const create = () => {
    const sql = `CREATE TABLE IF NOT EXISTS
        Accounts (id SMALLINT NOT NULL PRIMARY KEY,
            student_id SMALLINT NOT NULL,
            balance DOUBLE DEFAULT 0,
            CONSTRAINT FK_Student FOREIGN KEY (student_id) REFERENCES Students(id))`
    return query(sql);
}

module.exports = create;