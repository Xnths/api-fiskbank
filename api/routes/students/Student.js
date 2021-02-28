const { response } = require('express');
const studentsTable = require('./StudentsTable');

class Student {
    constructor({ id, name, book }) {
        this.id = id;
        this.name = name;
        this.book = book;
    }

    async subscribe() {
        const result = await studentsTable.insert({
            name: this.name,
            book: this.book
        })

        this.id = result.id;
    }
}

module.exports = Student;