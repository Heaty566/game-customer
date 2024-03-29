//import mongoose
const mongoose = require('mongoose');
//import express and create app
const config = require('config');
const express = require('express');
const app = express();
//import Joi and objectId
const Joi = require('joi');
Joi.objectId = require('joi-objectid')(Joi);
//import router
const genres = require('./routes/genres-route');
const games = require('./routes/games-route');
const customers = require('./routes/customers-route');
const users = require('./routes/users-route');
const auth = require('./routes/auth');
//connect to url 
app.use(express.json());
app.use('/genres', genres);
app.use('/games', games);
app.use('/customers', customers);
app.use('/users', users);
app.use('/auth', auth);

if (!config.get('app.jwtPrivateKey')) {
    console.log("FATAL ERROR: jwtPrivate");
    process.exit(1);
};

//connect to mongoose db
mongoose.connect("mongodb://localhost/game-project",  { useNewUrlParser: true,  useUnifiedTopology: true} )
    .then(() => console.log('connect to server succesfully'))
    .catch(() => console.log('connect to server failed'));


//connect to localhost
const port = process.env.port || 3000;
app.listen(port, () => console.log(`listening on port ${port}`))