const mongoose = require('mongoose');
const Joi = require('joi');
const {customerSchame} = require('./customer-module');

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
    // ,
    // shoppingCars: {
    //     type: customerSchame,
    //     required: true
    // }
});

const User = mongoose.model('user', schemaUser);

validateUser = (user) => {
    const schema = {
        name: Joi.string().min(3).max(50).required(),
        email: Joi.string().min(5).max(200).email(),
        password: Joi.string().min(5).max(1000).required()
    }
    return Joi.validate(user, schema);
}


module.exports.User = User;
module.exports.validate = validateUser;