const router = require('express').Router({ mergeParams: true })
const TransactionTable = require('./TransactionsTable');
const SerializerTransactions = require('../../../Serializer').SerializerTransactions;
const SerializerBalance = require('../../../Serializer').SerializerBalance;
const EmptyLog = require('../../../errors/EmptyLog');

router.get('/', async (req, res, next) => {
    const id = req.params.id;
    try {
        const transactions = await TransactionTable.log(id);
        const serializer = new SerializerTransactions(
            res.getHeader('Content-Type')
        )
        if (transactions.toString() == "") throw new EmptyLog("transactions")
        res.send(serializer.serialize(transactions));
    } catch (error) {
        next(error);
    }
})

router.get('/balance', async (req, res, next) => {
    const id = req.params.id;
    try {
        const balance = await TransactionTable.checkBalance(id);
        const serializer = new SerializerBalance(
            res.getHeader('Content-Type')
        )
        res.send(serializer.serialize(balance));
    } catch (error) {
        next(error)
    }
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