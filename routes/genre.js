const express = require('express');
const {validateGenre, Genre} = require('../modules/genre.js');
const router = express.Router();

router.get('/', async(req, res) => {
    const genre = await Genre.find();
    res.send(genre);
});

router.get('/:id', async (req, res) => {
    try {
        const genre = await Genre.findById(req.params.id);
        res.send(genre);
    } catch (err) {
        res.status(404).send("the genre with the given ID was not found");
    }
});

router.post('/', async (req, res) => {
    const {error} = validateGenre(req.body);
    if (error) return res.status(400).send(error.details[0].message);

    const genre = new Genre({
        name: req.body.name
    });

    const result = await genre.save();
    res.send(result);
});

router.put('/:id', async (req, res) => {
    const {error} = validateGenre(req.body);
    if (error) return res.status(400).send(error.details[0].message);

    try {
        let genre = await Genre.findOne({_id: req.params.id});
        genre.name = req.body.name;
        const result = await genre.save();
        res.send(result);
    } catch (err) {
        res.status(404).send("the genre with the given ID was not found");
    }
});

router.delete('/:id', async (req, res) => {
    try {
        const genre = await Genre.findOneAndDelete({_id: req.params.id});
        const result = await genre.save();
        res.send(result);
    } catch (err) {
        res.status(404).send("the genre with the given ID was not found");
    }
});

module.exports = router;