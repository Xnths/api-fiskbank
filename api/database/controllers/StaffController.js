const { StaffService } = require('../services');
const { SerializerStaff } = require('../../Serializer');
const { DuplicateEntry, InvalidParams } = require('../../errors');
const staffService = new StaffService();

class StaffController {
    static async createStaff(req, res, next) {
        try {
            const data = req.body;
            const personId = data.person_id;

            const duplicate = await staffService.findDuplicantePerson({ id: personId });
            if (duplicate.length > 0) throw new DuplicateEntry(`This person is already registred as a Staff. If you want to change id ${personId} information use PUT method instead.`);

            const serializer = new SerializerStaff(
                res.getHeader('Content-Type')
            );

            await staffService.insert(data);

            res.status(201).send(serializer.serialize(data));
            next();
        } catch (error) {
            next(error);
        }
    }
    static async getAllStaff(req, res, next) {
        try {
            const serializer = new SerializerStaff(
                res.getHeader('Content-Type')
            );

            const staff = await staffService.findAll();

            res.status(200).send(serializer.serialize(staff));
            next();
        } catch (error) {
            next(error);
        }
    }
    static async getStaffById(req, res, next) {
        try {
            const { id } = req.params;

            const serializer = new SerializerStaff(
                res.getHeader('Content-Type')
            );

            const staffMember = await staffService.findOneById({ id });

            res.status(200).send(serializer.serialize(staffMember));
            next()
        } catch (error) {
            next(error);
        }
    }
    static async updateStaff(req, res, next) {
        try {
            const { id } = req.params;
            const data = req.body;

            if (data.person_id > 0) throw new InvalidParams("You cannot change the person_id property.");

            const serializer = new SerializerStaff(
                res.getHeader('Content-Type')
            );

            await staffService.update(data, { id });

            const newStaff = await staffService.findOneById({ id });
            res.status(200).send(serializer.serialize(newStaff));
            next();
        } catch (error) {
            next(error);
        }
    }
    static async deleteStaff(req, res, next) {
        try {
            const { id } = req.params;

            await staffService.delete({ id });

            res.status(204).end()
            next();
        } catch (error) {
            next(error);
        }
    }
}

module.exports = StaffController;