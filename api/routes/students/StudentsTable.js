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
    async findStudentById(id) {
        const sql = "SELECT * FROM Students WHERE id=?";
        const find = await query(sql, id);
        if (!find.length > 0) throw new IdNotFound(id);
        return find;
    },
    async updateInformation(id, info) {
        //make sure the student exists
        this.findStudentById(id);

        const notEligibleParams = ['id'];
        notEligibleParams.forEach(param => {
            if (info[param]) throw new NotEligibleParam(param);
        })

        const sql = "UPDATE Students SET ? WHERE id=?";
        return query(sql, [info, id]);
    }
}