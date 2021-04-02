const query = require('../../database/query');
const { IdNotFound } = require('../../errors');

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
        if (!find.length > 0) throw new IdNotFound(`There is no Student with id ${studentID}.`);
        return find;
    },
    async updateInformation(studentID, info) {
        //make sure the student exists
        this.findStudentById(studentID);

        const sql = "UPDATE Students SET ? WHERE studentID=?";
        return query(sql, [info, studentID]);
    }
}