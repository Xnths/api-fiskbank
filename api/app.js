const express = require('express');
const bodyParser = require('body-parser');
const { acceptedFormats } = require('./Serializer');
const app = express();

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

module.exports = app;