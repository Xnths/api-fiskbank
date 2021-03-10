class UnauthorizedCommand extends Error {
    constructor(id) {
        super(`The request is not authorized for id ${id}. Make sure the numbers of the operation belongs to your account.`)
        this.name = "UnauthorizedCommand";
        this.idError = 6;
    }
}

module.exports = UnauthorizedCommand;