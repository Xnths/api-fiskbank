const express = require('express');
const bodyParser = require('body-parser');
const app = express();

const {
    IdNotFound,
    InvalidParams,
    NotSupported,
    NotEligibleParam,
    EmptyLog
} = require('./errors');

const { SerializerError, acceptedFormats } = require('./Serializer');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

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
        res.status(406).end();
        return
    }

    res.setHeader('Content-Type', format);
    next()
})

app.use((error, req, res, next) => {
    let status = 500;

    if (error instanceof IdNotFound) status = 404;
    if (error instanceof InvalidParams) status = 400;
    if (error instanceof NotSupported) status = 406;
    if (error instanceof NotEligibleParam) status = 403;
    if (error instanceof EmptyLog) status = 412;

    const serializer = new SerializerError(
        res.getHeader('Content-Type')
    )

    res
        .status(status)
        .send(
            serializer.serialize(error)
        );
})

module.exports = app;