const { NotSupported } = require('./errors')
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
        data = this._filter(data);
        if (this.contentType === "application/json") return this._json(data);
        if (this.contentType === "application/xml") return this._xml(data);
        throw new NotSupported(`${this.contentType} is not supported.`);
    }
    _filterObject(data) {
        const newObject = {};
        this.publicParams.forEach(param => {
            if (data.hasOwnProperty(param)) newObject[param] = data[param];
        })
        return newObject;
    }
    _filter(data) {
        if (Array.isArray(data)) {
            data = data.map(item => this._filterObject(item));
        } else {
            data = this._filterObject(data);
        }

        return data;
    }
}
class SerializerPeople extends Serializer {
    constructor(contentType, extraParams) {
        super();
        this.contentType = contentType;
        this.publicParams = [
            'name',
            'type',
            'registredAt'
        ].concat(extraParams || []);
        this.tagSingular = "person";
        this.tagPlural = "people";
    }
}
class SerializerStaff extends Serializer {
    constructor(contentType, extraParams) {
        super();
        this.contentType = contentType;
        this.publicParams = [
            'name',
            'position'
        ].concat(extraParams || []);
        this.tagSingular = "staff";
        this.tagPlural = "staff";
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
        ].concat(extraParams || []);
        this.tagSingular = 'Balance';
        this.tagPlural = 'Balances';
    }
}
class SerializerOperation extends Serializer {
    constructor(contentType, extraParams) {
        super();
        this.contentType = contentType;
        this.publicParams = [
            'name',
            'amount'
        ].concat(extraParams || []);
        this.tagSingular = 'Operation';
        this.tagPlural = 'Operations';
    }
}

module.exports = {
    Serializer,
    SerializerError,
    SerializerStudent,
    SerializerStaff,
    SerializerTransactions,
    SerializerBalance,
    SerializerOperation,
    SerializerPeople,
    acceptedFormats: ['application/json', 'application/xml']
}