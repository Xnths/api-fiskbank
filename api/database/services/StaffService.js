const Services = require('./Services');
const query = require('../../database/query');

class StaffService extends Services {
    constructor() {
        super('Staff');
    }
    async findAll() {
        const sql = `SELECT t2.id, t1.name, t1.email, t1.registredAt, t1.updatedAt, t1.deletedAt, t2.position
            FROM People t1
            INNER JOIN ${this._modelName} t2
            ON t1.id=t2.person_id`
        return query(sql);
    }
    async findOneById({ id }) {
        const sql = `SELECT t2.id, t1.name, t1.email, t1.registredAt, t1.updatedAt, t1.deletedAt, t2.position
            FROM People t1
            INNER JOIN ${this._modelName} t2
            ON t1.id=t2.person_id
            WHERE t2.id=?`;
        return query(sql, id);
    }
    async findDuplicantePerson({ id }) {
        const sql = `SELECT * FROM ${this._modelName} WHERE person_id=?`
        return query(sql, id)
    }
}

module.exports = StaffService;