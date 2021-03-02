const NotSupported = require('./errors/NotSupported')

class Serializer {
    _json(data) {
        return JSON.stringify(data);
    }
    serialize(data) {
        if (this.contentType === "application/json") return this._json(
            this.filter(data)
        );

        throw new NotSupported(this.contentType);
    }
    filterObject(data) {
        const newObject = {};
        this.publicParams.forEach(param => {
            if (data.hasOwnProperty(param)) newObject[param] = data[param];
        })
        return newObject;
    }
    filter(data) {
        if (Array.isArray(data)) {
            data = data.map(item => this.filterObject(item));
        } else {
            data = this.filterObject(data);
        }

        return data;
    }
}
class SerializerStudent extends Serializer {
    constructor(contentType) {
        super();
        this.contentType = contentType;
        this.publicParams = ['id', 'name'];
    }
}
module.exports = {
    Serializer: Serializer,
    SerializerStudent: SerializerStudent,
    acceptedFormats: ['application/json']
}