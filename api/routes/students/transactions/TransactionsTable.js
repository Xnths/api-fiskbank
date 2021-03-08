const query = require('../../../database/query');

module.exports = {
    deposit(data) {
        const sql = "INSERT INTO Transactions SET ?";
        return query(sql, data)
    },
    log(id) {
        const sql = "SELECT t1.name, t2.amount FROM Students t1, Transactions t2 WHERE t1.id=? AND t2.id=?"
        return query(sql, [id, id]);
    },
    checkBalance(id) {
        const sql = "SELECT t1.name, SUM(t2.amount) AS balance FROM Students t1, Transactions t2 WHERE t1.id=? AND t2.id=?"
        return query(sql, [id, id])
    }
}