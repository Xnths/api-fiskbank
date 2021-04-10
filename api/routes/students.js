const { StudentsController } = require('../database/controllers');

const router = require('express').Router({ mergeParams: true });

router
    .route('/students')
    .get(StudentsController.findAllStudents)
    .post(StudentsController.createStudent)
    .options((req, res) => {
        res.set('Access-Control-Allow-Methods', 'GET, POST');
        res.set('Access-Control-Allow-Headers', 'Content-Type');
        res.send(204).end();
    })

router
    .route('/students/:id')
    .get(StudentsController.findStudentById)
    .put(StudentsController.updateStudent)
    .delete(StudentsController.deleteStudent)
    .options((req, res) => {
        res.set('Access-Control-Allow-Methods', 'GET');
        res.set('Access-Control-Allow-Headers', 'Content-Type');
        res.send(204).end();
    })

module.exports = router;