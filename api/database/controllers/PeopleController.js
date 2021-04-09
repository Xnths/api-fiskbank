const { PeopleService } = require('../services')
const { SerializerPeople } = require('../../Serializer');
const peopleService = new PeopleService();

class PeopleController {
    static async createPerson(req, res, next) {
        try {
            const data = req.body;

            const serializer = new SerializerPeople(
                res.getHeader('Content-Type')
            );

            await peopleService.insert(data);
            res.status(201).send(serializer.serialize(data));
            next();
        } catch (error) {
            next(error);
        }
    }
    static async getAllPeople(req, res, next) {
        try {
            const serializer = new SerializerPeople(
                res.getHeader('Content-Type')
            )

            const people = await peopleService.findAll();

            res.status(200).send(serializer.serialize(people));
            next()
        } catch (error) {
            next(error)
        }
    }
    static async getPersonById(req, res, next) {
        try {
            const { id } = req.params

            const serializer = new SerializerPeople(
                res.getHeader('Content-Type')
            )

            const person = await peopleService.findOneById({ id });
            res.status(200).send(serializer.serialize(person));
            next();
        } catch (error) {
            next(error);
        }
    }
    static async updatePerson(req, res, next) {
        try {
            const { id } = req.params;
            const data = req.body;

            const serializer = new SerializerPeople(
                res.getHeader('Content-Type')
            )

            await peopleService.update(data, { id });

            const updatedPerson = await peopleService.findOneById({ id });
            res.status(200).send(serializer.serialize(updatedPerson));
            next();
        } catch (error) {
            next(error);
        }
    }
    static async deletePerson(req, res, next) {
        try {
            const { id } = req.params;

            await peopleService.delete({ id });

            res.status(204).send();
            next();
        } catch (error) {
            next(error);
        }
    }
}

module.exports = PeopleController;