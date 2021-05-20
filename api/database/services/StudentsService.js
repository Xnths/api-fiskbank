const query = require('../query');
const Services = require('./Services');

class StudentsService extends Services {
    constructor() {
        super('Students');
    }
    async findAll() {
        const sql = `SELECT t2.id, t1.name, t2.book, t1.email, t1.registredAt, t1.updatedAt, t1.deletedAt
            FROM People t1
            INNER JOIN Students t2
            ON t1.id=t2.person_id`
        return query(sql);
    }
    async findOneById({ id }) {
        const sql = `SELECT t2.id, t1.name, t2.book, t1.email, t1.registredAt, t1.updatedAt, t1.deletedAt
            FROM People t1
            INNER JOIN Students t2
            ON t1.id=t2.person_id
            WHERE t2.id=?`
        return query(sql, id);
    }
}

module.exports = StudentsService;