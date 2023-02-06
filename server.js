const mongoose = require('mongoose');
const app = require('./app');
const dotenv = require('dotenv');

dotenv.config({ path: './config.env'});

const DB = process.env.DATABASE.replace('<PASSWORD>',process.env.DATABASE_PASSWORD);

mongoose
    .connect(DB, {
        useNewUrlParser: true,
        useCreateIndex: true,
        useFindAndModify: false
    })
    .then(con => {
        console.log('DB connection successfull');
    });

const port = 8000;

app.listen(port, () => {
    console.log(`listening on port ${port}`);
});