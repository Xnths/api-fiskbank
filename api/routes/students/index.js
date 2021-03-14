const router = require('express').Router();
const studentsTable = require('./StudentsTable');
const Student = require('./Student');
const SerializerStudent = require('../../Serializer').SerializerStudent;

router.options('/', (req, res) => {
    res.set('Access-Control-Allow-Methods', 'GET, POST');
    res.set('Access-Control-Allow-Headers', 'Content-type');
    res.send(204);
    res.end();
})

router.get('/', async (req, res) => {
    const students = await studentsTable.findAllStudents();
    const serializer = new SerializerStudent(
        res.getHeader("Content-Type")
    )

    res.send(serializer.serialize(students));
})

router.post('/', async (req, res, next) => {
    try {
        const data = req.body;
        const student = new Student(data);
        const serializer = new SerializerStudent(
            res.getHeader("Content-Type")
        )

        await student.subscribe();

        res.status(201);
        res.send(
            serializer.serialize(student)
        );
    } catch (error) {
        next(error);
    }
})

router.options('/:studentID', (req, res) => {
    res.set('Access-Control-Allow-Methods', 'GET, POST');
    res.set('Access-Control-Allow-Headers', 'Content-type');
    res.send(204);
    res.end();
})

router.get('/:studentID', async (req, res, next) => {
    try {
        const studentID = req.params.studentID;
        const student = await studentsTable.findStudentById(studentID);
        const serializer = new SerializerStudent(
            res.getHeader("Content-Type"),
            ['book']
        )

        res.status(200);
        res.send(serializer.serialize(student));
    } catch (error) {
        next(error);
    }
})

router.patch('/:studentID', async (req, res, next) => {
    try {
        const studentID = req.params.studentID;
        const info = req.body;
        await studentsTable.updateInformation(studentID, info);
        const student = await studentsTable.findStudentById(studentID);
        const serializer = new SerializerStudent(
            res.getHeader('Content-Type')
        )

        res.status(202);
        res.send(serializer.serialize(student));
    } catch (error) {
        next(error);
    }
})

const routerTransactions = require('./transactions');
const valstudentIDStudent = async (req, res, next) => {
    try {
        const studentID = req.params.studentID;
        const student = new Student({ studentID: studentID })
        await studentsTable.findStudentById(studentID);
        req.student = student;
        next()
    } catch (error) {
        next(error);
    }
}
router.use('/:studentID/transactions', valstudentIDStudent, routerTransactions);

module.exports = router;