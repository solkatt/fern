const express = require('express');
const cors = require('cors');

const db = require('./db');
const movieRouter = require('./routes/movie-router')

const app = express();
const PORT = 3000;
const { urlencoded } = require('express');


app.use(urlencoded({extended: true})); // 
app.use(express.json());
app.use(cors());


db.on('error', console.log.bind(console, 'MongoDB connection error:'));

app.get('/', (req, res) => {
    res.send('Hello Fern')
});

app.use('/api', movieRouter);

app.listen(PORT, () => {
    console.log(`Server up and running on port: ${PORT}`)
})