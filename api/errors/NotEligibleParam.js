class NotEligibleParam extends Error {
    constructor(param) {
        super(`${param} is not eligible.`);
        this.name = 'NotEligibleParam';
        this.idError = 3;
    }
}

module.exports = NotEligibleParam;