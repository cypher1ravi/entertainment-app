const express = require('express');
const router = express.Router();
const Movie = require('../models/Movies');
const MovieDetails = require('../models/MovieDetails');
router.get('/', async (req, res) => {
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 8;
    const totalDocuments = await Movie.countDocuments();
    const totalPages = Math.ceil(totalDocuments / limit);
    try {
        const movies = await Movie.find()
            .skip((page - 1) * limit)
            .limit(limit);
        res.json({ movies, totalPages, totalDocuments, currentPage: page });
    } catch (error) {
        res.status(500).json({ message: 'Error fetching movies from database.' });
    }
});
router.get('/details/:id', async (req, res) => {
    const id = req.params.id;
    console.log(id);
    try {
        const movie = await MovieDetails.findOne({ 'details.id': id });
        if (!movie) {
            return res.status(404).json({ message: 'The movie with the given ID was not found' });
        }
        res.json(movie); // Use res.json() to send JSON response
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Failed to fetch movie' }); // Handle errors properly
    }
});
module.exports = router;
