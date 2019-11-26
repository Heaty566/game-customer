const mongoose = require('mongoose');
const Joi = require('joi');
const  {genreSchame, embed} = require('./genre-module');

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
    isPublished: {
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
        isPublished: Joi.boolean(),
        genreId: Joi.objectId().required()
    }
    return Joi.validate(game, shema);
};

embeddingGame = (value, value2) => {
    return game = {
        _id: value,
        name: value.name,
        year: value.year,
        isPublished: value.isPublished,
        genre: embed(value2)
    }
}

module.exports.gameSchame = gameSchame;
module.exports.Game = Game;
module.exports.validate = validateGame;
module.exports.embed = embeddingGame;