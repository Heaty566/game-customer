const mongoose = require('mongoose');
const Joi = require('joi');

const schemaUser = new mongoose.Schema({
    name: {
        type: String,
        minlength: 3,
        maxlength: 50,
        required: true
    },
    email: {
        type: String,
        minlength: 3,
        maxlength: 50,
        required: true,
        unique: true
    },
    password: {
        type: String,
        max: 1000,
        required: true
    }
});

const User = mongoose.model('user', schemaUser);


module.exports.User = User;
module.exports.validate = validateUser;