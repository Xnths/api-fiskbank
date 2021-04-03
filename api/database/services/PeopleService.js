const Services = require('./Services');

class PeopleService extends Services {
    constructor() {
        super("People");
    }
}

module.exports = PeopleService;