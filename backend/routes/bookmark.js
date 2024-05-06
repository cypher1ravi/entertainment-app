const express = require('express');
const Bookmark = require('../models/Bookmark')
const decode = require('../middleware/index');
const Movie = require('../models/Movies')
const TvSeries = require('../models/TvSeries')

const router = express.Router();
router.get('/', async (req, res) => {
    try {
        const bookmarks = await Bookmark.find(); // Await the result of the find() method
        res.status(200).json({ bookmarks }); // Send the bookmarks in the response
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: 'Failed to load bookmark' });
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


