const router = require('express').Router();
const studentsTable = require('./StudentsTable');
const Student = require('./Student');

router.get('/', async (req, res) => {
    const students = await studentsTable.findAllStudents();
    res.send(students);
})

router.post('/', async (req, res) => {
    try {
        const data = req.body;
        const student = new Student(data);
        await student.subscribe(student);
        res.status(201);
        res.send(
            JSON.stringify(student)
        );
    } catch (error) {
        res.status(400);
        res.send(
            JSON.stringify({
                message: error.message
            })
        );
    }
})

router.get('/:id', async (req, res) => {
    try {
        const id = req.params.id;
        const student = await studentsTable.findStudentById(id);
        res.status(200);
        res.send(student);
    } catch (error) {
        res.status(404);
        res.send(
            JSON.stringify({
                message: error.message
            })
        )
    }
})

module.exports = router;