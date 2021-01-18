const express = require('express')
const router = express.Router()
const MovieCtrl = require('../controllers/movie-ctrl')

//Middleware
const auth = require('../middleware/auth')
const admin = require('../middleware/admin')

/// Examples
router.post('/movie', auth, admin, MovieCtrl.createMovie)

router.put('/movie/:id', MovieCtrl.updateMovie)
router.delete('/movie/:id', MovieCtrl.deleteMovie)
router.get('/movie/:id', MovieCtrl.getMovieById)
router.get('/movies', MovieCtrl.getMovies)


module.exports = router