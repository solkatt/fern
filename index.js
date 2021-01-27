const config = require('config')
const express = require('express');
const cors = require('cors');

const db = require('./db');
const movieRouter = require('./routes/movie-router')
const userRouter = require('./routes/user-router')
const auth = require('./routes/auth')
const storeRouter = require('./routes/store-router')
const productRouter = require('./routes/product-router')
const orderRouter = require('./routes/order-router')

const path = require("path");

const app = express();
const PORT = process.env.PORT || 3000;
const {
    urlencoded
} = require('express');

if (!config.get('jwtPrivateKey')) {
    console.error('FATAL ERROR: jwtPrivateKey is not defined')
    process.exit(1)
}


app.use(urlencoded({
    extended: true
})); // 
app.use(express.json());
app.use(cors());


db.on('error', console.log.bind(console, 'MongoDB connection error:'));

// // if (process.env.NODE_ENV === 'production') {
// app.use(express.static('/client/build'))

// app.get('*', (req, res) => {
//     res.sendFile(path.join(__dirname, ' client', 'build', 'index.html'))
// })
// // }



app.use('/api', movieRouter);
app.use('/api', userRouter);
app.use('/api', auth);
app.use('/api', storeRouter);
app.use('/api', productRouter);
app.use('/api', orderRouter);





if (process.env.NODE_ENV === 'production') {
    app.use(express.static(path.join(__dirname, './client/build')));
    
    app.get('/*', function (req, res) {
        const index = path.join(__dirname, './client/build/index.html');
        res.sendFile(index);
    });
}


// app.get('/', (req, res) => {
//     res.send('Hello Fern')
// });










app.listen(PORT, () => {
    console.log(`Server up and running on port: ${PORT}`)
})