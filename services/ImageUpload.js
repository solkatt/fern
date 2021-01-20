// const config = require('config')

// const aws = require("aws-sdk");
// const multer = require("multer");
// const multerS3 = require("multer-s3");
// const s3 = new aws.S3();






// // aws.config.update({
// //     secretAccessKey: process.env.S3_ACCESS_SECRET,
// //     accessKeyId: process.env.S3_ACCESS_KEY,
// //     region: "eu-north-1",
// // });

// aws.config.update({
//     secretAccessKey: config.get('S3_ACCESS_SECRET'),
//     accessKeyId: config.get('S3_ACCESS_KEY'),
//     region: "eu-north-1",
// });




// const fileFilter = (req, file, cb) => {
//     if (file.mimetype === "image/jpeg" || file.mimetype === "image/png") {
//         cb(null, true);
//     } else {
//         cb(new Error("Invalid file type, only JPEG and PNG is allowed!"), false);
//     }
// };


// const upload = multer({
//     fileFilter: fileFilter,
//     storage: multerS3({
//         s3: s3,
//         bucket: "fern-product-images",  
//         acl: "public-read",
//         metadata: function (req, file, cb) {
//             cb(null, {
//                 fieldName: 'Testing_metadata'
//             });
//         },
//         key: function (req, file, cb) {
//             cb(null, Date.now()+file.originalname);
//         },
//     }),
// });





// module.exports = upload


