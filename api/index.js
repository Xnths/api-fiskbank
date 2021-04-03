require('dotenv').config();

const db = require('./database');
const app = require('./app');
const { people } = require('./routes')

db.connection.connect(async (error) => {
    if (error) {
        console.log(error);
    } else {
        console.log("Connected to the Database")

        app.use('/api', people);

        await db.table.init();

        app.listen(process.env.API_PORT, () => console.log("Listening..."))
    }
})