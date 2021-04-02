class EmptyLog extends Error {
    constructor(message) {
        super(message);
        this.name = "EmptyLog";
    }
}
class IdNotFound extends Error {
    constructor(message) {
        super(message);
        this.name = "IdNotFound";
    }
}
class InsufficientFunds extends Error {
    constructor(message) {
        super(message);
        this.name = "InsufficientFunds";
    }
}
class InvalidParams extends Error {
    constructor(message) {
        super(message);
        this.name = "InvalidParams";
    }
}
class NegativeNumber extends Error {
    constructor(message) {
        super(message);
        this.name = "NegativeNumber";
    }
}
class NotEligibleParam extends Error {
    constructor(message) {
        super(message);
        this.name = "NotEligibleParam";
    }
}
class NotSupported extends Error {
    constructor(message) {
        super(message);
        this.name = "NotSupported";
    }
}
class PositiveNumber extends Error {
    constructor(message) {
        super(message);
        this.name = "PositiveNumber";
    }
}
class UnauthorizedCommand extends Error {
    constructor(message) {
        super(message);
        this.name = "UnauthorizedCommand";
    }
}

module.exports = {
    EmptyLog,
    IdNotFound,
    InsufficientFunds,
    InvalidParams,
    NegativeNumber,
    NotEligibleParam,
    NotSupported,
    PositiveNumber,
    UnauthorizedCommand
}