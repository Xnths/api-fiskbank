const { StaffService } = require('../services');
const { SerializerStaff } = require('../../Serializer');
const staffService = new StaffService();

class StaffController {
    static async createStaff(req, res, next) {
        try {
            const data = req.body;

            const serializer = new SerializerStaff(
                res.getHeader('Content-Type')
            );

            const staff = await staffService.insert(data);

            res.status(201).send(serializer.serialize(staf));
            res.next();
        } catch (error) {
            next(error);
        }
    }
    static async getAllStaff(req, res, next) {
        const serializer = new SerializerStaff(
            res.getHeader('Content-Type')
        );

        const staff = await staffService.findAll();

        res.status(200).send(serializer.serialize(staff));
        res.next();
    }
}