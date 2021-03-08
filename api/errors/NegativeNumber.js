class NegativeNumber extends Error {
    constructor(param) {
        param.toLowerCase();
        param = param.charAt(0).toUpperCase() + param.slice(1);
        super(`${param} cannot be negative.`)
        this.name = "NegativeNumber";
        this.idError = 5;
    }
}

module.exports = NegativeNumber;