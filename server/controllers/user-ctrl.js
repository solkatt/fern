const User = require('../models/user-model')

createUser = (req, res) => {
    const body = req.body

    if (!body) {
        return res.status(400).json({
            success: false,
            error: 'You must provide a user details',
        })
    }

    const user = new User(body)

    if (!user) {
        return res.status(400).json({ success: false, error: err })
    }

    user
        .save()
        .then(() => {
            return res.status(201).json({
                success: true,
                id: user._id,
                message: 'User created!',
            })
        })
        .catch(error => {
            return res.status(400).json({
                error,
                message: 'User not created!',
            })
        })
}

// updateMovie = async (req, res) => {
//     const body = req.body

//     if (!body) {
//         return res.status(400).json({
//             success: false,
//             error: 'You must provide a body to update',
//         })
//     }

//     Movie.findOne({ _id: req.params.id }, (err, movie) => {
//         if (err) {
//             return res.status(404).json({
//                 err,
//                 message: 'Movie not found!',
//             })
//         }
//         movie.name = body.name
//         movie.time = body.time
//         movie.rating = body.rating
//         movie
//             .save()
//             .then(() => {
//                 return res.status(200).json({
//                     success: true,
//                     id: movie._id,
//                     message: 'Movie updated!',
//                 })
//             })
//             .catch(error => {
//                 return res.status(404).json({
//                     error,
//                     message: 'Movie not updated!',
//                 })
//             })
//     })
// }

// deleteMovie = async (req, res) => {
//     await Movie.findOneAndDelete({ _id: req.params.id }, (err, movie) => {
//         if (err) {
//             return res.status(400).json({ success: false, error: err })
//         }

//         if (!movie) {
//             return res
//                 .status(404)
//                 .json({ success: false, error: `Movie not found` })
//         }

//         return res.status(200).json({ success: true, data: movie })
//     }).catch(err => console.log(err))
// }

// getMovieById = async (req, res) => {
//     await Movie.findOne({ _id: req.params.id }, (err, movie) => {
//         if (err) {
//             return res.status(400).json({ success: false, error: err })
//         }

//         if (!movie) {
//             return res
//                 .status(404)
//                 .json({ success: false, error: `Movie not found` })
//         }
//         return res.status(200).json({ success: true, data: movie })
//     }).catch(err => console.log(err))
// }

// getMovies = async (req, res) => {
//     await Movie.find({}, (err, movies) => {
//         if (err) {
//             return res.status(400).json({ success: false, error: err })
//         }
//         if (!movies.length) {
//             return res
//                 .status(404)
//                 .json({ success: false, error: `Movie not found` })
//         }
//         return res.status(200).json({ success: true, data: movies })
//     }).catch(err => console.log(err))
// }

module.exports = {
    createUser
    // updateMovie,
    // deleteMovie,
    // getMovies,
    // getMovieById,
}