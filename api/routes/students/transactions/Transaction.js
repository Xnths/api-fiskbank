const TransactionsTable = require("./TransactionsTable");
const StudentsTable = require('../StudentsTable');
const NegativeNumber = require('../../../errors/NegativeNumber');

class Transaction {
    constructor({ id, amount }) {
        this.id = id;
        this.amount = amount;
    }
    deposit() {
        this._validadeInformation();
        TransactionsTable.deposit({
            id: this.id,
            amount: this.amount
        })
    }
    _validadeInformation() {
        //if the id does not exists this function will trigger an error
        StudentsTable.findStudentById(this.id);
        if (parseFloat(this.amount) < 0) throw new NegativeNumber("amount");
    }
}

module.exports = Transaction;