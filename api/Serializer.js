const NotSupported = require('./errors/NotSupported')
const jsontoxml = require('jsontoxml')

class Serializer {
    _json(data) {
        return JSON.stringify(data);
    }
    _xml(data) {
        let tag = this.tagSingular;
        if (Array.isArray(data)) {
            tag = this.tagPlural;
            data = data.map(item => {
                return { [this.tagSingular]: item }
            })
            return jsontoxml({ [tag]: data })
        };
        return jsontoxml({ [tag]: data });
    }
    serialize(data) {
        data = this.filter(data);
        if (this.contentType === "application/json") return this._json(data);
        if (this.contentType === "application/xml") return this._xml(data);
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
    constructor(contentType, extraParams) {
        super();
        this.contentType = contentType;
        this.publicParams = [
            'studentID',
            'name'
        ].concat(extraParams || []);
        this.tagSingular = 'student';
        this.tagPlural = 'students';
    }
}
class SerializerError extends Serializer {
    constructor(contentType, extraParams) {
        super();
        this.contentType = contentType;
        this.publicParams = [
            'studentIDError',
            'name',
            'message'
        ].concat(extraParams || []);
        this.tagSingular = 'error';
        this.tagPlural = 'errors';
    }
}
class SerializerTransactions extends Serializer {
    constructor(contentType, extraParams) {
        super();
        this.contentType = contentType;
        this.publicParams = [
            'name',
            'amount'
        ].concat(extraParams || []);
        this.tagSingular = 'Transaction';
        this.tagPlural = 'Transactions';
    }
}
class SerializerBalance extends Serializer {
    constructor(contentType, extraParams) {
        super();
        this.contentType = contentType;
        this.publicParams = [
            'name',
            'balance'
        ].concat(extraParams);
        this.tagSingular = 'Balance';
        this.tagPlural = 'Balances';
    }
}

module.exports = {
    Serializer: Serializer,
    SerializerStudent: SerializerStudent,
    SerializerError: SerializerError,
    SerializerTransactions: SerializerTransactions,
    SerializerBalance: SerializerBalance,
    acceptedFormats: ['application/json', 'application/xml']
}