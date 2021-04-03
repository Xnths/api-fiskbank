const query = require('../query');

const create = () => {
    const sql = `CREATE TABLE IF NOT EXISTS
        People (id SMALLINT NOT NULL AUTO_INCREMENT PRIMARY KEY,
            name VARCHAR(50) NOT NULL,
            type ENUM('staff', 'student') NOT NULL,
            registredAt DATETIME DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP NOT NULL,
            updatedAt DATE NULL,
            deletedAt DATE NULL)`
    return query(sql);
}

module.exports = create;