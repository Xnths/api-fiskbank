const TransactionsTable = require("./TransactionsTable");
const StudentsTable = require('../StudentsTable');
const {
    NegativeNumber,
    UnauthorizedCommand,
    PositiveNumber,
    InsufficientFunds
} = require('../../../errors');

class Transaction {
    constructor({ operationID, studentID, name, amount }) {
        this.operationID = operationID;
        this.studentID = studentID;
        this.name = name;
        this.amount = amount;
    }
    async deposit() {
        this._IsStudentSubscribed();

        if (this.amount < 0) throw new NegativeNumber("Deposits cannot be negative.");

        const student = await StudentsTable.findStudentById(this.studentID);
        const result = await TransactionsTable.insert({
            studentID: this.studentID,
            amount: this.amount
        })

        this.operationID = result.operationID;
        this.name = student.name;
    }
    async _IsStudentSubscribed() {
        //if the studentID does not exists this function will trigger an error
        await StudentsTable.findStudentById(this.studentID);
    }
    async getOperation() {
        const operation = await TransactionsTable.getOperationById(this.operationID);
        this.name = operation.name;
        this.amount = operation.amount;
        this._IsStudentSubscribed();
        if (this.studentID != operation.studentID) throw new UnauthorizedCommand("You are not allowed to perform this action.");
        return operation;
    }
    async withdraw() {
        this._IsStudentSubscribed();

        const account = await TransactionsTable.getAccount(this.studentID);

        if (account.balance < this.amount) throw new InsufficientFunds("There is not enough funds to perform this action.");

        if (this.amount > 0) throw new PositiveNumber("Withdraw cannot be positive");

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