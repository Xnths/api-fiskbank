const query = require('../../../database/query');
const { IdNotFound } = require('../../../errors');

module.exports = {
    insert(data) {
        const sql = "INSERT INTO Transactions SET ?";
        return query(sql, data)
    },
    log(studentID) {
        const sql = "SELECT t1.name, t2.amount FROM Students t1, Transactions t2 WHERE t1.studentID=? AND t2.studentID=?"
        return query(sql, [studentID, studentID]);
    },
    getAccount(studentID) {
        const sql = "SELECT t1.name, SUM(t2.amount) AS balance FROM Students t1, Transactions t2 WHERE t1.studentID=? AND t2.studentID=?"
        return query(sql, [studentID, studentID])
    },
    async getOperationById(operationID) {
        const sql = "SELECT t1.*, t2.* FROM Students t1, Transactions t2 WHERE t1.studentID=t2.studentID AND t2.operationID=?";
        const find = await query(sql, operationID);
        if (!find) throw new IdNotFound("operation", operationID);
        return find;
    }
}