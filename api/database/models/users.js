const query = require('../query');

const create = () => {
    const sql = `CREATE TABLE IF NOT EXISTS
        Users(email VARCHAR(100) NOT NULL PRIMARY KEY,
            person_id SMALLINT,
            hashPassword VARCHAR(256),
            FOREIGN KEY (person_id) REFERENCES People(id))`
    return query(sql);
}

module.exports = create;