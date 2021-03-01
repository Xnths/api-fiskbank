const NotSupported = require('./errors/NotSupported')

class Serializer {
    _json(data) {
        return JSON.stringify(data);
    }
    serialize(data) {
        if (this.contentType === "application/json") return this._json(data);

        throw new NotSupported(this.contentType);
    }
}
class SerializerStudent extends Serializer {
    constructor(contentType) {
        super();
        this.contentType = contentType;
    }
}
module.exports = {
    Serializer: Serializer,
    SerializerStudent: SerializerStudent,
    acceptedFormats: ['application/json']
}