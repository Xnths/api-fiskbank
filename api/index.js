require('dotenv').config();
const table = require('./database/table');
const express = require('express');
const bodyParser = require('body-parser');
const connection = require('./database/connection');
const routes = require('./routes/students');
const IdNotFound = require('./errors/IdNotFound');
const InvalidParam = require('./errors/InvalidParam');
const NotSupported = require('./errors/NotSupported');
const acceptedFormats = require('./Serializer').acceptedFormats;
const NotEligibleParam = require('./errors/NotEligibleParam');
const EmptyLog = require('./errors/EmptyLog');
const SerializerError = require('./Serializer').SerializerError;

connection.connect(async (error) => {
    if (error) {
        console.log(error);
    } else {
        console.log("Connected to the Database")
        await table.init();

        const app = express();

        app.use((req, res, next) => {
            res.set('Access-Control-Allow-Origin', '*')
            next();
        })

        app.use((req, res, next) => {
            let format = req.header('Accept');

            if (format == "*/*") {
                format = "application/json";
            }

            if (!acceptedFormats.includes(format)) {
                res.status(406);
                res.end();
                return
            }

            res.setHeader('Content-Type', format);
            next()
        })

        app.use(bodyParser.json());
        app.use(bodyParser.urlencoded({ extended: true }));
        app.use('/api/students', routes)

        app.use((error, req, res, next) => {
            let status = 500;

            if (error instanceof IdNotFound) status = 404;
            if (error instanceof InvalidParam) status = 400;
            if (error instanceof NotSupported) status = 406;
            if (error instanceof NotEligibleParam) status = 403;
            if (error instanceof EmptyLog) status = 412;

            const serializer = new SerializerError(
                res.getHeader('Content-Type')
            )

            res.status(status);
            res.send(
                serializer.serialize(error)
            );
        })

        app.listen(process.env.API_PORT, () => console.log("Listening..."))
    }
})