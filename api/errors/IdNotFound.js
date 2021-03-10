class IdNotFound extends Error {
    constructor(entity, id) {
        super(`There is no ${entity} with id ${id}`);
        this.name = "IdNotFound";
        this.idError = 0;
    }
}

module.exports = IdNotFound;