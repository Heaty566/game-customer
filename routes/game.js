const express = require('express');
const {validateGame, Game} = require('../modules/game.js');
const {Genre} = require('../modules/genre.js')
const router = express.Router();

router.get('/', async(req, res) => {
    const game = await Game.find();
    res.send(game);
});

router.get('/:id', async (req, res) => {
    try {
        const game = await Game.findById(req.params.id);
        res.send(game);
    } catch (err) {
        res.status(404).send("the game with the given ID was not found");
    }
});

router.post('/', async (req, res) => {
    const {error} = validateGame(req.body);
    if (error) return res.status(400).send(error.details[0].message);

    const genre = await Genre.findOne({_id: req.body.genreId})

    const game = new Game({
        name: req.body.name,
        year: req.body.year,
        isPublish: req.body.isPublish,
        genre: {
            _id: genre._id,
            name: genre.name
        }
    });

    const result = await game.save();
    res.send(result);
});

router.put('/:id', async (req, res) => {
    const {error} = validateGame(req.body);
    if (error) return res.status(400).send(error.details[0].message);

    try {
        let game = await Game.findOne({_id: req.params.id});
        const genre = await Genre.findOne({_id: req.body.genreId})
        game.name = req.body.name;
        game.year = req.body.year;
        game.isPublish = req.body.isPublish;
        game.genre= {
            _id: genre._id,
            name: genre.name
        };
        const result = await game.save();
        res.send(result);
    } catch (err) {
        res.status(404).send("the game with the given ID was not found");
    }
});

router.delete('/:id', async (req, res) => {
    try {
        const game = await Game.findOneAndDelete({_id: req.params.id});
        const result = await game.save();
        res.send(result);
    } catch (err) {
        res.status(404).send("the game with the given ID was not found");
    }
});

module.exports = router;