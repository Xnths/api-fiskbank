const studentsTable = require('../routes/students/ModelStudentsTable');

class table {
    init() {
        studentsTable()
            .then(console.log("Students Table successfuly created."))
            .catch(error => {
                console.log(error)
            })
    }

}

module.exports = new table();