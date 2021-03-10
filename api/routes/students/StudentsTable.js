const query = require('../../database/query');
const IdNotFound = require('../../errors/IdNotFound');
const NotEligibleParam = require('../../errors/NotEligibleParam');

module.exports = {
    async insert(student) {
        const sql = "INSERT INTO Students SET ?";
        return query(sql, student);
    },
    async findAllStudents() {
        const sql = "SELECT * FROM Students";
        return query(sql);
    },
    async findStudentById(studentID) {
        const sql = "SELECT * FROM Students WHERE studentID=?";
        const find = await query(sql, studentID);
        if (!find.length > 0) throw new IdNotFound(studentID);
        return find;
    },
    async updateInformation(studentID, info) {
        //make sure the student exists
        this.findStudentById(studentID);

        const notEligibleParams = ['studentID'];
        notEligibleParams.forEach(param => {
            if (info[param]) throw new NotEligibleParam(param);
        })

        const sql = "UPDATE Students SET ? WHERE studentID=?";
        return query(sql, [info, studentID]);
    }
}