const query = require('../query');

const create = () => {
    const sql = `CREATE TABLE IF NOT EXISTS
        Students (id SMALLINT NOT NULL AUTO_INCREMENT PRIMARY KEY,
            person_id SMALLINT,
            book VARCHAR(4) NOT NULL,
            FOREIGN KEY (person_id) REFERENCES People(id))`;

    return query(sql);
}

module.exports = create;