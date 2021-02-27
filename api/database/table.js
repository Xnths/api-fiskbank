const query = require('./query');

class table {
    init() {
        this._createStudentsTable()
            .then(console.log("Students Table successfuly created."))
            .catch(error => {
                console.log(error)
            })
    }

    _createStudentsTable() {
        const sql = "CREATE TABLE IF NOT EXISTS Students (id int NOT NULL AUTO_INCREMENT, name VARCHAR(75) NOT NULL, book VARCHAR(4) NOT NULL, PRIMARY KEY (id))";

        return query(sql)
    }
}

module.exports = new table();