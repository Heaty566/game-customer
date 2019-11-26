const _ = require('lodash');

const express = require('express');
const router = express.Router();

const {validate, Genre} = require('../modules/genre-module');
const {validateId} = require('../modules/handle-module');

router.get('/', async(req, res) => {
    const genre = await Genre.find();
    res.send(genre);
});

router.get('/:id', async (req, res) => {
    const {error: error2} = validateId({ id: req.params.id });
    if (error2) return res.status(404).send("the genre with the given Id was not found"); 

    let genre = await Genre.findOne({_id: req.params.id});
    res.send(genre);
});

router.post('/', async (req, res) => {
    const {error} = validate(req.body);
    if (error) return res.status(400).send(error.details[0].message);

    const genre = new Genre(_.pick(req.body, ['name']));

    const result = await genre.save();
    res.send(result);
});

router.put('/:id', async (req, res) => {
    const {error: error1} = validate(req.body);
    if (error1) return res.status(400).send(error1.details[0].message);

    const {error: error2} = validateId({ id: req.params.id });
    if (error2) return res.status(404).send("the genre with the given Id was not found"); 
    
    const genre = await Genre.findOne({_id: req.params.id});
    genre.name = req.body.name;

    const result = await genre.save();
    res.send(result);
});

router.delete('/:id', async (req, res) => {
    const {error: error} = validateId({ id: req.params.id });
    if (error) return res.status(404).send("the genre with the given Id was not found"); 
    
    const genre = await Genre.findOneAndDelete({_id: req.params.id});
    res.send(genre);
});

module.exports = router;