class PositiveNumber extends Error {
    constructor(param) {
        super(`${param} cannot be positive`);
        this.name = "PositiveNumber"
        this.idError = 8
    }
}

module.exports = PositiveNumber;