class InvalidParam extends Error {
    constructor(param) {
        super(`${param} is not valid.`)
        this.name = "InvalidParam"
        this.idError = 1;
    }
}

module.exports = InvalidParam;