const mongoose = require('mongoose');
const Joi = require('joi');


const genreSchame = new mongoose.Schema({
    name: {
        type: String,
        maxlength: 50,
        minlength: 1,
        required: true
    }
});

const Genre = mongoose.model("genres", genreSchame);

validateGenre = (genre) => {
    const shema = {
        name: Joi.string().max(50).min(1).required()
    }

    return Joi.validate(genre,shema);
};

embeddingGenre = (value) => {
    return genre = {
        _id: value._id,
        name: value.name
    };
};  

module.exports.embeddingGenre = embeddingGenre;
module.exports.genreSchame = genreSchame;
module.exports.Genre = Genre;
module.exports.validateGenre = validateGenre;