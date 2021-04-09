const Services = require('./Services');
const query = require('../../database/query');

class PeopleService extends Services {
    constructor() {
        super("People");
    }
    async update(data, { id }) {
        const sql = `UPDATE ${this._modelName} SET ?, updatedAt = CURRENT_TIMESTAMP WHERE id=?`;
        return query(sql, [data, id]);
    }
    //soft-delete
    async delete({ id }) {
        const sql = `UPDATE ${this._modelName} SET deletedAt = CURRENT_TIMESTAMP WHERE id=?`;
        return query(sql, id);
    }
}

module.exports = PeopleService;