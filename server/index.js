const config = require('config')
const express = require('express');
const cors = require('cors');

const db = require('./db');
const movieRouter = require('./routes/movie-router')
const userRouter = require('./routes/user-router')
const auth = require('./routes/auth')

const app = express();
const PORT = 3000;
const { urlencoded } = require('express');

if (!config.get('jwtPrivateKey')) {
    console.error('FATAL ERROR: jwtPrivateKey is not defined')
    process.exit(1)
}

app.use(urlencoded({extended: true})); // 
app.use(express.json());
app.use(cors());


db.on('error', console.log.bind(console, 'MongoDB connection error:'));

app.get('/', (req, res) => {
    res.send('Hello Fern')
});

app.use('/api', movieRouter);
app.use('/api', userRouter);
app.use('/api', auth);

app.listen(PORT, () => {
    console.log(`Server up and running on port: ${PORT}`)
})