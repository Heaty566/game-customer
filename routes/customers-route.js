const _ = require('lodash');

//import express and router
const express = require('express');
const router = express.Router();

//import module 
const {validate, Customer} = require('../modules/customer-module');
const {Game, embed} = require('../modules/game-module');
const {validateId} = require('../modules/handle-module');

router.get('/', async(req, res) => {
    const customer = await Customer.find();
    res.send(customer);
});

router.get('/:id', async (req, res) => {
    const {error} = validateId({ id: req.params.id });
    if (error) return res.status(404).send("the customer with the given Id was not found"); 

    let customer = await Customer.findOne({_id: req.params.id});
    res.send(customer);
});

router.post('/', async (req, res) => {
    const {error} = validate(req.body);
    if (error) return res.status(400).send(error.details[0].message);

    let customer = new Customer(_.pick(req.body, ['name', 'phone', 'isMembership']));

    for (let value of req.body.gamesId){
        const {error: error2} = validateId({ id: value });
        if (error2) return res.status(404).send("the game with the given Id was not found");
        let game = await Game.findById(value);
        customer.games.push(embed(game));
    }; 

    customer = await customer.save();
    res.send(customer);
});

router.put('/:id', async (req, res) => {
    const {error} = validate(req.body);
    if (error) return res.status(400).send(error.details[0].message);

    const {error: error2} = validateId({ id: req.params.id });
    if (error2) return res.status(404).send("the customer with the given Id was not found"); 

    let customer = await Customer.findById(req.params.id);
    customer.name = req.body.name;
    customer.phone = req.body.phone;
    customer.isMembership = req.body.isMembership;
    customer.games = [];
    for (let value of req.body.gamesId){
        const {error: error2} = validateId({ id: value });
        if (error2) return res.status(404).send("the game with the given Id was not found");
        let game = await Game.findById(value);
        customer.games.push(embed(game));
    }; 

    customer = await customer.save();
    res.send(customer);
});

router.delete('/:id', async (req, res) => {
    const {error: error1} = validateId({ id: req.params.id });
    if (error1) return res.status(404).send("the customer with the given Id was not found"); 
    
    const customer = await Customer.findOneAndDelete({_id: req.params.id});
    res.send(customer);
});

module.exports = router;