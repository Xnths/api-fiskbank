const { InvalidParams } = require("../../errors");
const { SerializerStudent } = require("../../Serializer");
const { StudentsService, PeopleService } = require("../services");
const studentsService = new StudentsService();
const peopleService = new PeopleService();

class StudentsController {
    static async findAllStudents(req, res, next) {
        try {
            const serializer = new SerializerStudent(
                res.getHeader('Content-Type')
            );

            const students = await studentsService.findAll();

            res.status(200).send(serializer.serialize(students));
            next();
        } catch (error) {
            next(error);
        }
    }
    static async createStudent(req, res, next) {
        try {
            const data = req.body;

            const serializer = new SerializerStudent(
                res.getHeader('Content-Type')
            );

            await studentsService.insert(data);
            res.status(201).send(serializer.serialize(data));
            next();
        } catch (error) {
            next(error);
        }
    }
    static async findStudentById(req, res, next) {
        try {
            const { id } = req.params;

            const serializer = new SerializerStudent(
                res.getHeader('Content-Type')
            );

            const student = await studentsService.findOneById({ id });
            res.status(200).send(serializer.serialize(student));
            next();
        } catch (error) {
            next(error);
        }
    }
    static async updateStudent(req, res, next) {
        try {
            const { id } = req.params;
            const data = req.body;

            if (data.person_id > 0) throw new InvalidParams("You cannot change the person_id property.");

            const serializer = new SerializerStudent(
                res.getHeader('Content-Type')
            );

            await studentsService.update(data, { id });

            const newStudent = studentsService.findOneById({ id });
            res.status(200).send(serializer.serialize(newStudent));
            next();
        } catch (error) {
            next(error);
        }
    }
    static async deleteStudent(req, res, next) {
        try {
            const { id } = req.params;

            await studentsService.delete({ id });

            res.status(204).end();
            next();
        } catch (error) {
            next(error);
        }
    }
}

module.exports = StudentsController;