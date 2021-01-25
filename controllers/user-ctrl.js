const jwt = require('jsonwebtoken')
const config = require('config')


const bcrypt = require('bcrypt')

const User = require('../models/user-model')

// registerUser = (req, res) => {
//     const body = req.body

//     if (!body) {
//         return res.status(400).json({
//             success: false,
//             error: 'You must provide a user details',
//         })
//     }

//     const user = new User(body)

//     if (!user) {
//         return res.status(400).json({ success: false, error: err })
//     }

//     user
//         .save()
//         .then(() => {
//             return res.status(201).json({
//                 success: true,
//                 id: user._id,
//                 message: 'User created!',
//             })
//         })
//         .catch(error => {
//             return res.status(400).json({
//                 error,
//                 message: 'User not created!',
//             })
//         })
// }

//Mosh approach
// registerUser = async (req, res) => {
//     // const { error } = validate(req.body)
//     // if (error) return res.status(400).send(error.details[0].message)


//     let user = await User.findOne({email: req.body.email})
//     if (user) return res.status(400).send('User already registered')

//     user = new User(req.body)

//     const salt = await bcrypt.genSalt(10);
//     user.password = await bcrypt.hash(user.password, salt)

//     await user.save()
//     res.send({
//         name:user.name,
//         email: user.email,
//         id: user._id
//     })
// }


//moshHeaderSignUpToken
//response Headers
registerUser = async (req, res) => {
    // const { error } = validate(req.body)
    // if (error) return res.status(400).send(error.details[0].message)


    let user = await User.findOne({email: req.body.email})
    if (user) return res.status(400).send('User already registered')

    user = new User(req.body)

    const salt = await bcrypt.genSalt(10);
    user.password = await bcrypt.hash(user.password, salt)
    
    await user.save()
   
    // const payload = {
    //     _id: user._id
    // }
    
    // const token = jwt.sign(payload, config.get('jwtPrivateKey'))

    const token = user.generateAuthToken()
    res.header('x-auth-token', token).send({
        name:user.name,
        email: user.email,
        id: user._id
    })

}    




getCurrentUser = async (req, res) => {
    const user = await User.findById(req.user._id).select('-password')
    console.log(user)
res.send(user)
}




updateUserStoreID = async (req, res) => {
    const storeID = req.body.storeID

    console.log('req.body.storeID:', storeID)
    
    if (!storeID) {
        return res.status(400).json({
            success: false,
            error: 'You must provide a body to update',
        })
    }

    User.findOne({ _id: req.params.id }, (err, user) => {

        if (err) {
            return res.status(404).json({
                err,
                message: 'User not found!',
            })
        }
        user.storeID = storeID
        user.save()
            .then(() => {
                return res.status(200).json({
                    success: true,
                    id: user._id,
                    storeID: user.storeID,
                    message: 'Added StoreID to User!',
                })
            })
            .catch(error => {
                return res.status(404).json({
                    error,
                    message: 'User Store not updated!',
                })
            })
    })
}







// updateUser = async (req, res) => {
//     const body = req.body

//     if (!body) {
//         return res.status(400).json({
//             success: false,
//             error: 'You must provide a body to update',
//         })
//     }

//     Movie.findOne({ _id: req.params.id }, (err, user) => {
//         if (err) {
//             return res.status(404).json({
//                 err,
//                 message: 'Movie not found!',
//             })
//         }
//         user.name = body.name
//         user.time = body.time
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
    registerUser,
    getCurrentUser,
    updateUserStoreID
    // updateMovie,
    // deleteMovie,
    // getMovies,
    // getMovieById,
}