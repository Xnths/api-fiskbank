const query = require('../query');

const create = () => {
    const sql = `CREATE TABLE IF NOT EXISTS
        Staff (id SMALLINT AUTO_INCREMENT PRIMARY KEY,
            person_id SMALLINT,
            position VARCHAR(50) NOT NULL,
            FOREIGN KEY (person_id) REFERENCES People(id))`
    return query(sql);
}

module.exports = create;