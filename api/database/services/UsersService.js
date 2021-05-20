const Services = require('./Services');

class UsersService extends Services {
    constructor() {
        super('Users');
    }
}

module.exports = UsersService;