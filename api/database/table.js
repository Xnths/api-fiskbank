const studentsTable = require('../routes/students/ModelStudentsTable');
const transactionsTable = require('../routes/students/transactions/ModelTransactionsTable')

class table {
    init() {
        studentsTable()
            .then(console.log("Students Table successfuly created."))
            .catch(error => {
                console.log(error)
            })
        transactionsTable()
            .then(console.log("Transactions Table successfuly created!"))
            .catch(error => {
                console.log(error);
            })
    }

}

module.exports = new table();