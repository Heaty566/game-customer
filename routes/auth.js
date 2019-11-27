const express = require('express');
const router = express.Router();
const {User} = require('../modules/user-module');
const bcrypt = require('bcrypt');
const Joi = require('joi');

router.post("/", async (req, res) => {
    const {error} = validateUser(req.body);
    if (error) return res.status(400).send(error.details[0].message);

    const user = await User.findOne({ email: req.body.email});
    if (!user) return res.status(400).send("Invalid email or password");
    
    const validatePassword = await bcrypt.compare(req.body.password, user.password);
    if (!validatePassword) return res.status(400).send("Invalid email or password");

    res.send(true);
});



validateUser = (user) => {
    const schema = {
        email: Joi.string().min(5).max(255).required(),
        password: Joi.string().min(5).max(255).required()
    }
    return Joi.validate(user, schema);
};

module.exports = router;