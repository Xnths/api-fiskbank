class NotSupported extends Error {
    constructor(contentType) {
        super(`${contentType} is not supported`);
        this.name = "NotSupported";
        this.idError = 2;
    }
}