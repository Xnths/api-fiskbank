const query = require('../../../database/query');

module.exports = {
    deposit(data) {
        const sql = "INSERT INTO Transactions SET ?";
        query(sql, data)
    },
    log(id) {
        const sql = "SELECT * FROM Transactions WHERE id=?"
        query(sql, id);
    }
}