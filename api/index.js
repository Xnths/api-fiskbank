const table = require('./database/table');
const express = require('express');
const config = require('config');
const bodyParser = require('body-parser');
const connection = require('./database/connection');
const routes = require('./routes/students');
const IdNotFound = require('./errors/IdNotFound');
const InvalidParam = require('./errors/InvalidParam');
const acceptedFormats = require('./Serializer').acceptedFormats;

connection.connect(async (error) => {
    if (error) {
        console.log(error);
    } else {
        console.log("Connected to the Database")
        await table.init();

        const app = express();

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

            res.status(status);
            res.send(
                JSON.stringify({
                    message: error.message
                })
            );
        })

        app.listen(config.get('api.port'), () => console.log("Listening..."))
    }
})