const mongoose = require('mongoose');
const express = require('express');
const app = express();
const genre = require('./routes/genre.js');
const game = require('./routes/game.js');
const customer = require('./routes/customer.js')
app.use(express.json());

app.use('/genres', genre);
app.use('/games', game);
app.use('/customers', customer);

mongoose.connect("mongodb://localhost/game-project",  { useNewUrlParser: true,  useUnifiedTopology: true} )
    .then(() => console.log('connect to server succesfully'))
    .catch(() => console.log('connect to server failed'));



const port = process.env.port || 3000;
app.listen(port, () => console.log(`listening on port ${port}`))