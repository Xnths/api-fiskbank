const router = require('express').Router({ mergeParams: true });
const { PeopleController } = require('../database/controllers')

router
    .route('/people')
    .get(PeopleController.getAllPeople)
    .post(PeopleController.createPerson)
    .options((req, res) => {
        res.set('Access-Control-Allow-Methods', 'GET, POST');
        res.set('Access-Control-Allow-Headers', 'Content-type');
        res.send(204).end();
    })

router
    .route('/people/:id')
    .get(PeopleController.getPersonById)
    .put(PeopleController.updatePerson)
    .delete(PeopleController.deletePerson)
    .options((req, res) => {
        res.set('Access-Control-Allow-Methods', 'GET, PUT, DELETE');
        res.set('Access-Control-Allow-Headers', 'Content-type')
        res.send(204).end();
    })

module.exports = router;