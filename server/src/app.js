const express = require('express');
const cors = require('cors');
const morgan = require('morgan');


const app = express()
app.use(cors({
    origin: 'http://localhost:3000',
}))
app.use(morgan("combined"));

const planetsRouter = require('./routes/planets/planets.route');
const lauchesRouter = require('./routes/launches/launches.route');

app.use(express.json());

app.use('/planets', planetsRouter);
app.use('/launches', lauchesRouter);

module.exports = app;