const Product = require('../models/product-model')
const multer = require('multer')

// const upload = require("../services/ImageUpload");
const s3 = require("../services/s3");

// TODO: change to upload.array()
const singleUpload = s3.uploadProduct.single("file");

const config = require('config')

// const multipleUpload =.array('photos', 12)



uploadProductImage = (req, res) => {


    singleUpload(req, res, function (err) {
        if (err) {
            return res.json({
                success: false,
                errors: {
                    title: "Image Upload Error",
                    detail: err.message,
                    error: err,
                },
            });
        }
        res.json({
            success: true,
            image: res.req.file.path,
            fileName: res.req.file.filename,
            imageUrl: req.file.location
        })

        // let update = { profilePicture: req.file.location };

        // User.findByIdAndUpdate(uid, update, { new: true })
        //   .then((user) => res.status(200).json({ success: true, user: user }))
        //   .catch((err) => res.status(400).json({ success: false, error: err }));
    })


}

deleteProductImage = (req, res) => {

    const id = req.params.id
    const image = req.body.image
    if (id === 'temp' || id === undefined) {
        console.log('DELETE ONLY ON S3')
        console.log(image)



        s3.deleteProductImage(image, function (err) {
            if (err) {
                return next(err)
            }
            console.log('deleted')
        });


    } 
       // else {
        //     // IF THERE IS AN PRODUCT ID CHECK DB FOR PRODUCT AND UPDATE IMAGES
        // }

    
}











createProduct = (req, res) => {

    const body = req.body

    if (!body) {
        return res.status(400).json({
            success: false,
            error: 'You must provide a product',
        })
    }

    const product = new Product(body)

    if (!product) {
        return res.status(400).json({
            success: false,
            error: err
        })
    }

    product
        .save()
        .then(() => {
            return res.status(201).json({
                success: true,
                id: product._id,
                message: 'Product created!',
            })
        })
        .catch(error => {
            return res.status(400).json({
                error,
                message: 'Product not created!',
            })
        })
}



updateProduct = async (req, res) => {
    const body = req.body

    if (!body) {
        return res.status(400).json({
            success: false,
            error: 'You must provide a product to update',
        })
    }

    Product.findOne({
        _id: req.params.id
    }, (err, product) => {
        if (err) {
            return res.status(404).json({
                err,
                message: 'Product not found!',
            })
        }
        product.name = body.name
        product.description = body.description
        product.price = body.price
        product.stock_quantity = body.stock_quantity
        product.categories = body.categories
        product.time = body.time
        product
            .save()
            .then(() => {
                return res.status(200).json({
                    success: true,
                    id: product._id,
                    message: 'Product updated!',
                })
            })
            .catch(error => {
                return res.status(404).json({
                    error,
                    message: 'Product not updated!',
                })
            })
    })
}

deleteProduct = async (req, res) => {
    await Product.findOneAndDelete({
        _id: req.params.id
    }, (err, product) => {
        if (err) {
            return res.status(400).json({
                success: false,
                error: err
            })
        }

        if (!product) {
            return res
                .status(404)
                .json({
                    success: false,
                    error: `Product not found`
                })
        }

        return res.status(200).json({
            success: true,
            data: product
        })
    }).catch(err => console.log(err))
}








getProductById = async (req, res) => {
    await Product.findOne({
        _id: req.params.id
    }, (err, product) => {
        if (err) {
            return res.status(400).json({
                success: false,
                error: err
            })
        }

        if (!product) {
            return res
                .status(404)
                .json({
                    success: false,
                    error: `Product not found`
                })
        }
        return res.status(200).json({
            success: true,
            data: product
        })
    }).catch(err => console.log(err))
}


getProductsByStore = async (req, res) => {

    const storeID = req.params.id


    await Product.find({
        storeID: storeID
    }, (err, products) => {
        if (err) {
            return res.status(400).json({
                success: false,
                error: err
            })
        }
        if (!products.length) {
            return res
                .status(404)
                .json({
                    success: false,
                    error: `No Products found`
                })
        }
        return res.status(200).json({
            success: true,
            data: products
        })
    }).catch(err => console.log(err))
}




getAllProducts = async (req, res) => {
    await Product.find({}, (err, products) => {
        if (err) {
            return res.status(400).json({
                success: false,
                error: err
            })
        }
        if (!products.length) {
            return res
                .status(404)
                .json({
                    success: false,
                    error: `No Products found`
                })
        }
        return res.status(200).json({
            success: true,
            data: products
        })
    }).catch(err => console.log(err))
}




module.exports = {
    createProduct,
    updateProduct,
    deleteProduct,
    getAllProducts,
    getProductsByStore,
    getProductById,
    uploadProductImage,
    deleteProductImage,
}