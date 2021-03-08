const query = require('../../../database/query');

module.exports = {
    deposit(data) {
        const sql = "INSERT INTO Transactions SET ?";
        return query(sql, data)
    },
    log(id) {
        const sql = "SELECT * FROM Transactions WHERE id=?"
        return query(sql, id);
    },
    checkBalance(id) {
        const sql = "SELECT SUM(amount) AS balance FROM Transactions WHERE id=?"
        return query(sql, id)
    }
}