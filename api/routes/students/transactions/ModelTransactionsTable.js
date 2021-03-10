const query = require('../../../database/query');

const create = () => {
    const sql = "CREATE TABLE IF NOT EXISTS Transactions (operationID INT NOT NULL AUTO_INCREMENT, date DATETIME DEFAULT CURRENT_TIMESTAMP, amount FLOAT NOT NULL, studentID INT NOT NULL, CONSTRAINT fk_StudentId FOREIGN KEY (studentID) REFERENCES Students(studentID), PRIMARY KEY (operationID))"
    return query(sql);
}

module.exports = create;