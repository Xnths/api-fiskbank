require('dotenv').config();

const db = require('./database');
const app = require('./app');
const { people, staff } = require('./routes')
const {
    IdNotFound,
    InvalidParams,
    NotSupported,
    NotEligibleParam,
    EmptyLog
} = require('./errors');
const { SerializerError } = require('./Serializer');

db.connection.connect(async (error) => {
    if (error) {
        console.log(error);
    } else {
        console.log("Connected to the Database")

        app
            .use('/api', people)
            .use('/api', staff)


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

        await db.table.init();

        app.listen(process.env.API_PORT, () => console.log("Listening..."))
    }
})