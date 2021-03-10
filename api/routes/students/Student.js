const InvalidParam = require('../../errors/InvalidParam');
const studentsTable = require('./StudentsTable');

class Student {
    constructor({ studentID, name, book }) {
        this.studentID = studentID;
        this.name = name;
        this.book = book;
    }

    async subscribe() {
        this._valstudentIDateInformation();
        const result = await studentsTable.insert({
            name: this.name,
            book: this.book
        })

        this.studentID = result.studentID;
    }

    _valstudentIDateInformation() {
        if (this.name.length < 6) throw new InvalidParam("Name");
        if (this.book.length > 5) throw new InvalidParam("Book");
    }
}

module.exports = Student;