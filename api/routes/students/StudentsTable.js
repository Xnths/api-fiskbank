const query = require('../../database/query');
const IdNotFound = require('../../errors/IdNotFound');

module.exports = {
    insert(student) {
        const sql = "INSERT INTO Students SET ?";
        return query(sql, student);
    },
    findAllStudents() {
        const sql = "SELECT * FROM Students";
        return query(sql);
    },
    async findStudentById(id) {
        const sql = "SELECT * FROM Students WHERE id=?";
        const find = await query(sql, id);
        if (!find.length > 0) throw new IdNotFound(id);
        return find;
    }
}