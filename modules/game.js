const mongoose = require('mongoose');
const Joi = require('joi');
const  {genreSchame} = require('./genre.js');

const gameSchame = new mongoose.Schema({
    name: {
        type: String,
        maxlength: 50,
        minlength: 1,
        required: true
    },
    year: {
        type: Number,
        max: 3000,
        min: 2000
    },
    isPublish: {
        type: Boolean,
        default: false
    },
    genre: {
        type: genreSchame,
        required: true
    }

});

const Game = mongoose.model("games", gameSchame);

validateGame = (game) => {
    const shema = {
        name: Joi.string().max(50).min(1).required(),
        year: Joi.number().max(3000).min(2000).required(),
        isPublish: Joi.boolean(),
        genreId: Joi.string().required()
    }

    return Joi.validate(game, shema);
};

module.exports.gameSchame = gameSchame;
module.exports.Game = Game;
module.exports.validateGame = validateGame;