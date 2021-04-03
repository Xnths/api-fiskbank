const model = require('./models')

class table {
    async init() {
        await model.people()
            .then(console.log("People's table has been sucessfuly created."))
            .catch(console.log);
        await model.user()
            .then(console.log("Users' table has been successfuly created."))
            .catch(console.log);
        await model.students()
            .then(console.log("Students' table has been successfuly created."))
            .catch(console.log);
        await model.accounts()
            .then(console.log("Accounts' table has been sucessfuly created."))
            .catch(console.log);
        await model.staff()
            .then(console.log("Staff's table has been successfuly created."))
            .catch(console.log);
        await model.transactions()
            .then(console.log("Transactions' Table successfuly created!"))
            .catch(console.log);
    }

}

module.exports = new table();