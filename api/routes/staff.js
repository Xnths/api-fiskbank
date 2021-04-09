const router = require('express').Router({ mergeParams: true });
const { StaffController } = require('../database/controllers');

router
    .route('/staff')
    .get(StaffController.getAllStaff)
    .post(StaffController.createStaff)
    .options((req, res) => {
        res.set('Access-Control-Allow-Methods', 'GET, POST')
        res.set('Access-Control-Allow-Headers', 'Content-Type')
        res.send(204).end();
    });
router
    .route('/staff/:id')
    .get(StaffController.getStaffById)
    .put(StaffController.updateStaff)
    .delete(StaffController.deleteStaff)
    .options((req, res) => {
        res.set('Access-Control-Allow-Methods', 'GET')
        res.set('Access-Control-Allow-Headers', 'Content-Type')
    })

module.exports = router;