const express = require('express');
const {validateCustomer, Customer} = require('../modules/customer.js');
const {Game, embeddingGame} = require('../modules/game.js')
const router = express.Router();

router.get('/', async(req, res) => {
    const customer = await Customer.find();
    res.send(customer);
});

router.get('/:id', async (req, res) => {
    try {
        const customer = await Customer.findById(req.params.id);
        res.send(customer);
    } catch (err) {
        res.status(404).send("the customer with the given ID was not found");
    }
});

router.post('/', async (req, res) => {
    const {error} = validateCustomer(req.body);
    if (error) return res.status(400).send(error.details[0].message);

    const customer = new Customer({
        name: req.body.name,
        phone: req.body.phone,
        isMembership: req.body.isMembership
    });

    for (let gameId of req.body.shoppingCarId){
        const game = await Game.findOne({_id: gameId});
        const gamep = embeddingGame(game);
        customer.shoppingCar.push(gamep);
    };

    const result = await customer.save();
    res.send(result);
});

router.put('/:id', async (req, res) => {
    const {error} = validateCustomer(req.body);
    if (error) return res.status(400).send(error.details[0].message);

    try {
        let customer = await Customer.findOne({_id: req.params.id});
        const genre = await Genre.findOne({_id: req.body.genreId})
        customer.name = req.body.name;
        customer.phone = req.body.phone;
        customer.isMembership = req.body.isMembership;
        customer.shoppingCar= {
            _id: genre._id,
            name: genre.name
        };
        const result = await customer.save();
        res.send(result);
    } catch (err) {
        res.status(404).send("the customer with the given ID was not found");
    }
});

router.delete('/:id', async (req, res) => {
    try {
        const customer = await Customer.findOneAndDelete({_id: req.params.id});
        console.log(customer);
        const result = await customer.save();
        res.send(result);
    } catch (err) {
        res.status(404).send("the customer with the given ID was not found");
    }
});

module.exports = router;