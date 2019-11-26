const Joi = require('joi');

validateId = (id) => {
    const shema = {
        id: Joi.objectId().required()  
    };

    return Joi.validate(id, shema);
};

module.exports.validateId = validateId;