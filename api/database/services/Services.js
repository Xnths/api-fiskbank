const query = require('../query');

class Services {
    constructor(modelName) {
        this._modelName = modelName;
    }
    async insert(data) {
        const sql = `INSERT INTO ${this._modelName} SET ?`;
        return query(sql, data);
    }
    async findAll() {
        const sql = `SELECT * FROM ${this._modelName} WHERE deletedAt IS NULL`;
        return query(sql);
    }
    async findOneById({ id }) {
        const sql = `SELECT * FROM ${this._modelName} WHERE id=?`;
        return query(sql, id);
    }
    async update(data, id) {
        const sql = `UPDATE ${this._modelName} SET ?, updatedAt = CURRENT_TIMESTAMP WHERE id=?`;
        return query(sql, [data, id]);
    }
    //soft-deleting
    async delete({ id }) {
        const sql = `UPDATE ${this._modelName} SET deletedAt = CURRENT_TIMESTAMP WHERE id=?`;
        return query(sql, id);
    }
}

module.exports = Services;