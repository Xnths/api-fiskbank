const Services = require('./Services');

class StudentsService extends Services {
    constructor() {
        super('Students');
    }
}

module.exports = StudentsService;