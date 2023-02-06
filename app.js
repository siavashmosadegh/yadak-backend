
const express = require('express');

const app = express();

app.use((req,res,next) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Headers', '*');
    res.setHeader('Access-Control-Allow-Mehtods', '*');
    next();
});

app.use(express.json());

const mainRouter = require('./routes/mainRoutes');

app.use('/api/v1/main', mainRouter);

module.exports = app;