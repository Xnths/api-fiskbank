const TransactionsTable = require("./TransactionsTable");
const StudentsTable = require('../StudentsTable');
const NegativeNumber = require('../../../errors/NegativeNumber');

class Transaction {
    constructor({ operationID, studentID, name, amount }) {
        this.operationID = operationID;
        this.studentID = studentID;
        this.name = name;
        this.amount = amount;
    }
    async deposit() {
        this._valstudentIDadeInformation();
        const name = await StudentsTable.findStudentById(this.studentID);
        const result = await TransactionsTable.deposit({
            studentID: this.studentID,
            amount: this.amount
        })
        this.operationID = result.operationID;
        this.name = name;
    }
    async _valstudentIDadeInformation() {
        //if the studentID does not exists this function will trigger an error
        await StudentsTable.findStudentById(this.studentID);
        if (parseFloat(this.amount) < 0) throw new NegativeNumber("amount");
    }
}

module.exports = Transaction;