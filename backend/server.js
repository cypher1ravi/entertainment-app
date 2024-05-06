const express = require('express');
const cors = require("cors");
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const moviesRouter = require('./routes/movies');
const tvSeriesRouter = require('./routes/tvSeries');
const additionalRouter = require('./routes/additional');
const bookmarkRouter = require('./routes/bookmark');


const app = express();

// Middleware
app.use(express.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cors({ origin: "*" }))
app.use(bodyParser.json());

// Database connection
mongoose.connect('mongodb+srv://ravindrachaubey410:TeSd58uVfa4lvnEz@cluster0.d0lhvu1.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0')
    .then(() => console.log('Connected to MongoDB'))
    .catch(err => console.error('Error connecting to MongoDB:', err));

// Routes
// app.use('/auth', authRouter);
app.use('/movies', moviesRouter);
app.use('/tvseries', tvSeriesRouter);
app.use('/additional', additionalRouter);
app.use('/bookmark', bookmarkRouter)

app.use('/', (err, req, res, next) => {
    res.status(500).json("Something Went Wrong")
})

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
