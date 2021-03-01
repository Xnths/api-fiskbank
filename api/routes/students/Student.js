const InvalidParam = require('../../errors/InvalidParam');
const studentsTable = require('./StudentsTable');

class Student {
    constructor({ id, name, book }) {
        this.id = id;
        this.name = name;
        this.book = book;
    }

    async subscribe() {
        this._validateInformation();
        const result = await studentsTable.insert({
            name: this.name,
            book: this.book
        })

        this.id = result.id;
    }

    _validateInformation() {
        if (this.name.length < 6) throw new InvalidParam("Name");
        if (this.book.length > 5) throw new InvalidParam("Book");
    }
}

module.exports = Student;