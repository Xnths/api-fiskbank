const TransactionsTable = require("./TransactionsTable");
const StudentsTable = require('../StudentsTable');
const NegativeNumber = require('../../../errors/NegativeNumber');
const UnauthorizedCommand = require('../../../errors/UnauthorizedCommand');
const PositiveNumber = require('../../../errors/PositiveNumber');
const InsufficientFunds = require('../../../errors/InsufficientFunds')

class Transaction {
    constructor({ operationID, studentID, name, amount }) {
        this.operationID = operationID;
        this.studentID = studentID;
        this.name = name;
        this.amount = amount;
    }
    async deposit() {
        this._studentIsSubscribed();

        if (this.amount < 0) throw new NegativeNumber("amount");

        const student = await StudentsTable.findStudentById(this.studentID);
        const result = await TransactionsTable.insert({
            studentID: this.studentID,
            amount: this.amount
        })

        this.operationID = result.operationID;
        this.name = student.name;
    }
    async _studentIsSubscribed() {
        //if the studentID does not exists this function will trigger an error
        await StudentsTable.findStudentById(this.studentID);
    }
    async getOperation() {
        const operation = await TransactionsTable.getOperationById(this.operationID);
        this.name = operation.name;
        this.amount = operation.amount;
        this._studentIsSubscribed();
        if (this.studentID != operation.studentID) throw new UnauthorizedCommand(this.studentID);
        return operation;
    }
    async withdraw() {
        this._studentIsSubscribed();

        const account = await TransactionsTable.getAccount(this.studentID);

        if (account.balance < this.amount) throw new InsufficientFunds();

        if (this.amount > 0) throw new PositiveNumber(amount);

        const student = await StudentsTable.findStudentById(this.studentID);
        const result = await TransactionsTable.insert({
            studentID: this.studentID,
            amount: this.amount
        });

        this.name = student.name;
        this.operationID = result.operationID;
    }
}

module.exports = Transaction;