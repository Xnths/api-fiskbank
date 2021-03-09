const router = require('express').Router({ mergeParams: true })
const TransactionTable = require('./TransactionsTable');
const SerializerTransactions = require('../../../Serializer').SerializerTransactions;
const SerializerBalance = require('../../../Serializer').SerializerBalance;
const EmptyLog = require('../../../errors/EmptyLog');
const Transaction = require('./Transaction');

router.get('/', async (req, res, next) => {
    try {
        const id = req.params.id;
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
    try {
        const id = req.params.id;
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
    try {
        const id = req.params.id;
        let data = req.body;
        data = {
            id: id,
            amount: data.amount
        }
        const transaction = new Transaction(data);
        await transaction.deposit();
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