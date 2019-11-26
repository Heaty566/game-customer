const mongoose = require('mongoose');
const Joi = require('joi');
const  {genreSchame, embeddingGenre} = require('./genre.js');

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
        genreId: Joi.objectId().required()
    }
    return Joi.validate(game, shema);
};

embeddingGame = (value, value2) => {
    return game = {
        _id: value,
        name: value.name,
        year: value.year,
        isPublish: value.isPublish,
        genre: embeddingGame(value2)
    }
}

module.exports.gameSchame = gameSchame;
module.exports.Game = Game;
module.exports.validateGame = validateGame;