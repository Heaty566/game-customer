//import mongoose
const mongoose = require('mongoose');
//import express and create app
const express = require('express');
const app = express();
//import Joi and objectId
const Joi = require('joi');
Joi.objectId = require('joi-objectid')(Joi);
//import router
const genres = require('./routes/genres-route');
const games = require('./routes/games-route');
const customers = require('./routes/customers-route');
//connect to url 
app.use(express.json());
app.use('/genres', genres);
app.use('/games', games);
app.use('/customers', customers);

//connect to mongoose db
mongoose.connect("mongodb://localhost/game-project",  { useNewUrlParser: true,  useUnifiedTopology: true} )
    .then(() => console.log('connect to server succesfully'))
    .catch(() => console.log('connect to server failed'));


//connect to localhost
const port = process.env.port || 3000;
app.listen(port, () => console.log(`listening on port ${port}`))