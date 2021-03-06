const studentsTable = require('../routes/students/ModelStudentsTable');
const fiskDollarsTable = require('../routes/students/fiskdollars/ModelFiskDollarsTable')

class table {
    init() {
        studentsTable()
            .then(console.log("Students Table successfuly created."))
            .catch(error => {
                console.log(error)
            })
        fiskDollarsTable()
            .then(console.log("Fisk Dollar Tablee successfuly created!"))
            .catch(error => {
                console.log(error);
            })
    }

}

module.exports = new table();