const mongoose = require('mongoose');

const express = require('express');
const app = express();

const Joi = require('joi');
Joi.objectId = require('joi-objectid')(Joi);

const genres = require('./routes/genres-route');
const games = require('./routes/games-route');
const customers = require('./routes/customers-route');


app.use(express.json());
app.use('/genres', genres);
app.use('/games', games);
app.use('/customers', customers);


mongoose.connect("mongodb://localhost/game-project",  { useNewUrlParser: true,  useUnifiedTopology: true} )
    .then(() => console.log('connect to server succesfully'))
    .catch(() => console.log('connect to server failed'));



const port = process.env.port || 3000;
app.listen(port, () => console.log(`listening on port ${port}`))