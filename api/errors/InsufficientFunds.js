class InsufficentFunds extends Error {
    constructor() {
        super("There not enough balance to execute this operation.")
        this.name = "InsufficentFunds"
        this.idError = 7;
    }
}

module.exports = InsufficentFunds;