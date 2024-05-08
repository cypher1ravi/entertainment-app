const express = require('express');
const cors = require("cors");
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const moviesRouter = require('./routes/movies');
const tvSeriesRouter = require('./routes/tvSeries');
const additionalRouter = require('./routes/additional');
const bookmarkRouter = require('./routes/bookmark');
require('dotenv').config();

const app = express();

// Middleware
app.use(express.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cors({ origin: "*" }))
app.use(bodyParser.json());

// Database connection
mongoose.connect(process.env.MONGO_URI)
    .then(() => console.log('Connected to MongoDB'))
    .catch(err => console.error('Error connecting to MongoDB:', err));



app.use('/movies', moviesRouter);
app.use('/tvseries', tvSeriesRouter);
app.use('/additional', additionalRouter);
app.use('/bookmark', bookmarkRouter)

app.use('/', (err, req, res, next) => {
    res.status(500).json("Something Went Wrong")
})

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
