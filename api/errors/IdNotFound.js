class IdNotFound extends Error {
    constructor(id) {
        super(`There is no Student with id ${id}`);
        this.name = "IdNotFound";
        this.idError = 0;
    }
}

module.exports = IdNotFound;