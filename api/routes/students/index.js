const router = require('express').Router();
const studentsTable = require('./StudentsTable');
const Student = require('./Student');
const SerializerStudent = require('../../Serializer').SerializerStudent;

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

router.get('/:id', async (req, res, next) => {
    try {
        const id = req.params.id;
        const student = await studentsTable.findStudentById(id);
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

router.patch('/:id', async (req, res, next) => {
    try {
        const id = req.params.id;
        const info = req.body;
        await studentsTable.updateInformation(id, info);
        const student = await studentsTable.findStudentById(id);
        const serializer = new SerializerStudent(
            res.getHeader('Content-Type')
        )

        res.status(202);
        res.send(serializer.serialize(student));
    } catch (error) {
        next(error);
    }
})

const routerFiskDollars = require('./fiskdollars');
router.use('/:id/fiskdollars', routerFiskDollars);

module.exports = router;