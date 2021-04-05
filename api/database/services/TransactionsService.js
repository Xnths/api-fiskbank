const Services = require('./Services');

class TransactionsService extends Services {
    constructor() {
        super('Transactions');
    }
}

module.exports = TransactionsService;