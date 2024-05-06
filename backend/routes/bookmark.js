const express = require('express');
const Bookmark = require('../models/Bookmark')
const decode = require('../middleware/index');
const Movie = require('../models/Movies')
const TvSeries = require('../models/TvSeries')


const router = express.Router();
router.get('/', decode, async (req, res) => {
    // const { userId } = req.query; // Assuming you pass the user identifier as a query parameter
    const userId = req.body.firebaseId
    try {
        // Find bookmarks for the specified user
        const userBookmarks = await Bookmark.findOne({ firebaseId: userId });

        if (!userBookmarks) {
            return res.status(404).json({ message: 'User not found or has no bookmarks' });
        }

        // Extract bookmark IDs for movies and TV series
        const movieBookmarkIds = userBookmarks.bookmark
            .filter(item => item.mediatype === 'movies')
            .map(item => item.id);
        const tvSeriesBookmarkIds = userBookmarks.bookmark
            .filter(item => item.mediatype === 'tvseries')
            .map(item => item.id);

        // Find movies and TV series based on bookmark IDs
        const movies = await Movie.find({ id: movieBookmarkIds });
        const tvSeries = await TvSeries.find({ id: tvSeriesBookmarkIds });

        // Send the combined results
        res.status(200).json([...movies, ...tvSeries]);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Failed to load bookmarks' });
    }
});

router.post('/add', decode, async (req, res) => {
    const { movieId, firebaseId, email, mediaType } = req.body;

    try {
        let user = await Bookmark.findOne({ firebaseId });

        if (!user) {
            user = await Bookmark.create({ firebaseId, email, bookmark: [] });
        }

        const bookmarkExists = user.bookmark.some(item =>
            item.id === movieId && item.mediatype.toLowerCase() === mediaType.toLowerCase()
        );

        if (!bookmarkExists) {
            user.bookmark.push({ id: movieId, mediatype: mediaType });
            await user.save();
            res.status(200).json({ message: "Added bookmark Successfully" });
        } else {
            res.status(200).json({ message: "Bookmark already exists" });
        }
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Failed to add bookmark' }); // Handle errors properly
    }
});

router.post('/remove', decode, async (req, res) => {
    const { movieId, firebaseId, mediaType } = req.body;

    try {
        // Find the user
        const user = await Bookmark.findOne({ firebaseId });

        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }

        // Remove the bookmark matching both movieId and mediaType
        user.bookmark = user.bookmark.filter(item => item.id !== movieId || item.mediatype !== mediaType);

        // Save the updated user
        await user.save();

        res.status(200).json({ message: "Removed bookmark Successfully" });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Failed to remove bookmark' });
    }
});



module.exports = router;


