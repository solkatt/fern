const Store = require('../models/store-model')

createStore = (req, res) => {

    const body = req.body

    if (!body) {
        return res.status(400).json({
            success: false,
            error: 'You must provide a store',
        })
    }

    const store = new Store(body)

    if (!store) {
        return res.status(400).json({ success: false, error: err })
    }

    store
        .save()
        .then(() => {
            return res.status(201).json({
                success: true,
                id: store._id,
                message: 'Store created!',
            })
        })
        .catch(error => {
            return res.status(400).json({
                error,
                message: 'Store not created!',
            })
        })
}



updateStore = async (req, res) => {
    const body = req.body

    if (!body) {
        return res.status(400).json({
            success: false,
            error: 'You must provide a body to update',
        })
    }

    Store.findOne({ _id: req.params.id }, (err, store) => {
        if (err) {
            return res.status(404).json({
                err,
                message: 'Store not found!',
            })
        }
        store.name = body.name
        store.time = body.time
        store.description= body.description
        store
            .save()
            .then(() => {
                return res.status(200).json({
                    success: true,
                    id: store._id,
                    message: 'Store updated!',
                })
            })
            .catch(error => {
                return res.status(404).json({
                    error,
                    message: 'Store not updated!',
                })
            })
    })
}

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

getStoreById = async (req, res) => {
    await Store.findOne({ _id: req.params.id }, (err, store) => {
        if (err) {
            return res.status(400).json({ success: false, error: err })
        }

        if (!store) {
            return res
                .status(404)
                .json({ success: false, error: `Store not found` })
        }
        return res.status(200).json({ success: true, data: store})
    }).catch(err => console.log(err))
}

getStores = async (req, res) => {
    await Store.find({}, (err, stores) => {
        if (err) {
            return res.status(400).json({ success: false, error: err })
        }
        if (!stores.length) {
            return res
                .status(404)
                .json({ success: false, error: `No Stores found` })
        }
        return res.status(200).json({ success: true, data: stores })
    }).catch(err => console.log(err))
}

module.exports = {
    createStore,
    updateStore,
    // deleteMovie,
    getStores,
    getStoreById,
}