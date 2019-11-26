const _ = require('lodash');

const express = require('express');
const router = express.Router();

const {validate, Game} = require('../modules/game-module');
const {Genre, embed} = require('../modules/genre-module');
const {validateId} = require('../modules/handle-module');

router.get('/', async(req, res) => {
    const game = await Game.find();
    res.send(game);
});

router.get('/:id', async (req, res) => {
    const {error: error2} = validateId({ id: req.params.id });
    if (error2) return res.status(404).send("the game with the given Id was not found"); 

    let game = await Game.findOne({_id: req.params.id});
    res.send(game);
});

router.post('/', async (req, res) => {
    const {error} = validate(req.body);
    if (error) return res.status(400).send(error.details[0].message);

    let game = new Game(_.pick(req.body, ['name', 'year', 'isPublished']));

    const {error: error2} = validateId({ id: req.body.genreId });
    if (error2) return res.status(404).send("the genre with the given Id was not found"); 

    const genre = await Genre.findById(req.body.genreId);
    game.genre = embed(genre);

    game = await game.save();
    res.send(game);
});

router.put('/:id', async (req, res) => {
    const {error} = validate(req.body);
    if (error) return res.status(400).send(error.details[0].message);

    const {error: error2} = validateId({ id: req.params.id });
    if (error2) return res.status(404).send("the game with the given Id was not found"); 

    let game = await Game.findById(req.params.id);

    game.name = req.body.name;
    game.year = req.body.year;
    game.isPublished = req.body.isPublished;
    
    const {error: error3} = validateId({ id: req.body.genreId });
    if (error3) return res.status(404).send("the genre with the given Id was not found"); 

    const genre = await Genre.findById(req.body.genreId);
    game.genre = embed(genre);

    game = await game.save();
    res.send(game);
});

router.delete('/:id', async (req, res) => {
    const {error: error1} = validateId({ id: req.params.id });
    if (error1) return res.status(404).send("the game with the given Id was not found"); 
    
    const game = await Game.findOneAndDelete({_id: req.params.id});
    res.send(game);
});

module.exports = router;