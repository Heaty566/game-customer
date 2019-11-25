const mongoose = require('mongoose');
const Joi = require('joi');
const {gameSchame} = require('./game.js')


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
    shoppingCar: {
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
        shoppingCarId: Joi.array().items(Joi.objectId().required())
    }

    return Joi.validate(customer, schema);
};

module.exports.validateCustomer = validateCustomer;
module.exports.Customer = Customer;
module.exports.customerSchame = customerSchame;