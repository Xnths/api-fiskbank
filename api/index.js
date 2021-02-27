const table = require('./database/table');
const express = require('express');
const config = require('config');
const connection = require('./database/connection');

connection.connect(async (error) => {
    if (error) {
        console.log(error);
    } else {
        console.log("Connected to the Database")
        await table.init();

        const app = express();

        app.listen(config.get('api.port'), () => console.log("Listening..."))
    }
})