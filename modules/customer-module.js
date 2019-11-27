const mongoose = require('mongoose');
const Joi = require('joi');
const {gameSchame} = require('./game-module')


const customerSchame = new mongoose.Schema({
    name: {
        type: String,
        maxlength: 50,
        minlength: 1,
        required: true
    },
    phone: {
        type: String,
        maxlength: 20,
        minlength: 10,
        required: true
    },
    isMembership: {
        type: Boolean,
        default: false
    },
    games: {
        type: [gameSchame],
        required: true
    }
});

const Customer = mongoose.model('customers', customerSchame);

validateCustomer = (customer) => {
    const schema = {
        name: Joi.string().max(50).min(1).required(),
        phone: Joi.string().max(20).min(10),
        isMembership: Joi.boolean(),
        gamesId: Joi.array().items(Joi.objectId())
    }
    return Joi.validate(customer, schema);
};

embed = (value) => {
    return customer = {
        _id: value.id,
        name: value.name,
        phone: value.phone,
        isMembership: isMembership,
        games: value.games
    }
};


module.exports.customerSchame = customerSchame;
module.exports.validate = validateCustomer;
module.exports.Customer = Customer;
