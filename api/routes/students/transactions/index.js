const router = require('express').Router({ mergeParams: true })
const TransactionTable = require('./TransactionsTable');
const SerializerTransactions = require('../../../Serializer').SerializerTransactions;

router.get('/', async (req, res, next) => {
    res.send(JSON.stringify("GET"))
})

router.post('/', async (req, res, next) => {
    const id = req.params.id;
    let data = req.body;
    data = {
        id: id,
        amount: data.amount
    }
    try {
        await TransactionTable.deposit(data);
        const serializer = new SerializerTransactions(
            res.getHeader('Content-Type')
        );
        res.status(201);
        res.send(serializer.serialize(data))
    } catch (error) {
        next(error);
    }
})

module.exports = router;