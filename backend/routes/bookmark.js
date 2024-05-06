const express = require('express');
const Users = require('../models/Users')
const decode = require('../middleware/index');


const router = express.Router();

router.post('/add', decode, async (req, res) => {
    const { movieId, firebaseId, email } = req.body;
    try {

        const response = await Users.findOneAndUpdate({ firebaseId }, { $addToSet: { bookmark: [movieId] } })
        if (!response) {
            await Users.create({ firebaseId, email, bookmark: [movieId] })
        }
        res.status(200).json({ message: "Added bookmark Successfully" })
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Failed to add bookmark' }); // Handle errors properly
    }
});

router.post('/remove', decode, async (req, res) => {
    const { movieId, firebaseId, email } = req.body;
    try {

        const response = await Users.findOneAndUpdate({ firebaseId }, { $pull: { bookmark: movieId } }, { new: true })
        console.log(response);
        res.status(200).json({ message: "Removed bookmark Successfully" })
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Failed to remove bookmark' }); // Handle errors properly
    }
});


module.exports = router;


