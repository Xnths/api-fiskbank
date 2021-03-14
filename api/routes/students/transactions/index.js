const router = require('express').Router({ mergeParams: true })
const TransactionTable = require('./TransactionsTable');
const SerializerTransactions = require('../../../Serializer').SerializerTransactions;
const SerializerBalance = require('../../../Serializer').SerializerBalance;
const SerializerOperation = require('../../../Serializer').SerializerOperation;
const EmptyLog = require('../../../errors/EmptyLog');
const Transaction = require('./Transaction');

router.options('/', (req, res) => {
    res.set('Access-Control-Allow-Methods', 'GET');
    res.set('Access-Control-Allow-Headers', 'Content-type');
    res.status(204);
    res.end();
})

router.get('/', async (req, res, next) => {
    try {
        const studentID = req.params.studentID;
        const transactions = await TransactionTable.log(studentID);
        const serializer = new SerializerTransactions(
            res.getHeader('Content-Type')
        )
        if (transactions.toString() == "") throw new EmptyLog("transactions");
        res.set('Location', `api/students/${studentID}/transactions/`)
        res.send(serializer.serialize(transactions));
    } catch (error) {
        next(error);
    }
})

router.options('/:operationID', (req, res) => {
    res.set('Access-Control-Allow-Methods', 'GET, POST');
    res.set('Access-Control-Allow-Headers', 'Content-type');
    res.status(204);
    res.end();
})

router.get('/:operationID', async (req, res, next) => {
    try {
        const data = {
            operationID: req.params.operationID,
            studentID: req.params.studentID
        }
        const transaction = new Transaction(data);
        const operation = await transaction.getOperation();

        const serializer = new SerializerOperation(
            res.getHeader('Content-Type')
        )

        res.set('Location', `api/students/${studentID}/transactions/${operationID}`)
        res.send(serializer.serialize(operation));
    } catch (error) {
        next(error);
    }
})

router.get('/balance', async (req, res, next) => {
    try {
        const studentID = req.params.studentID;
        const account = await TransactionTable.getAccount(studentID);
        const serializer = new SerializerBalance(
            res.getHeader('Content-Type')
        )
        res.set('Location', `api/students/${studentID}/transactions/balance`)
        res.send(serializer.serialize(account));
    } catch (error) {
        next(error)
    }
})

router.post('/deposit', async (req, res, next) => {
    try {
        const studentID = req.params.studentID;
        let data = req.body;
        data = {
            studentID: studentID,
            amount: data.amount
        }
        const transaction = new Transaction(data);
        await transaction.deposit();
        const serializer = new SerializerTransactions(
            res.getHeader('Content-Type')
        );
        res.set('Location', `api/students/${studentID}/transactions/deposit`)
        res.status(201);
        res.send(serializer.serialize(data))
    } catch (error) {
        next(error);
    }
})

router.post('/withdraw', async (req, res, next) => {
    try {
        const studentID = req.params.studentID;
        const amount = req.body.amount;

        const transaction = new Transaction({
            studentID: studentID,
            amount: amount
        })
        await transaction.withdraw();

        const serializer = new SerializerTransactions(
            res.getHeader('Content-type')
        )
        res.set('Location', `api/students/${studentID}/transactions/withdraw`)
        res.send(serializer.serialize(transaction));
    } catch (error) {
        next(error);
    }
})

module.exports = router;