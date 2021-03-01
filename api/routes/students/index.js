const router = require('express').Router();
const studentsTable = require('./StudentsTable');
const Student = require('./Student');

router.get('/', async (req, res) => {
    const students = await studentsTable.findAllStudents();
    res.send(students);
})

router.post('/', async (req, res, next) => {
    try {
        const data = req.body;
        const student = new Student(data);
        await student.subscribe();
        res.status(201);
        res.send(
            JSON.stringify(student)
        );
    } catch (error) {
        next(error);
    }
})

router.get('/:id', async (req, res, next) => {
    try {
        const id = req.params.id;
        const student = await studentsTable.findStudentById(id);
        res.status(200);
        res.send(student);
    } catch (error) {
        next(error);
    }
})

module.exports = router;