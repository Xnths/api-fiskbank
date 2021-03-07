class EmptyLog extends Error {
    constructor(logName) {
        logName.toLowerCase();
        super(`There have been no ${logName}`);
        this.name = "EmptyLog";
        this.idError = 4;
    }
}

module.exports = EmptyLog;