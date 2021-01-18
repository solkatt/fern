// const { MongoClient } = require("mongodb");
 
// // Replace the following with your Atlas connection string                                                                                                                                        
// const url = "mongodb+srv://admin:CwaHxf5rrNgJAqCz@ferncluster.otqiy.mongodb.net/fern?retryWrites=true&w=majority"
// const client = new MongoClient(url);
// async function run() {
//     try {
//         await client.connect();
//         console.log("Connected correctly to server");
//     } catch (err) {
//         console.log(err.stack);
//     }
//     finally {
//         await client.close();
//     }
// }
// run().catch(console.dir);


///////////////  



const mongoose = require('mongoose')
const url = process.env.MONGODB_URI || "mongodb+srv://admin:CwaHxf5rrNgJAqCz@ferncluster.otqiy.mongodb.net/fern?retryWrites=true&w=majority"

mongoose
    .connect(url, { useNewUrlParser: true, useUnifiedTopology: true })
    .catch(e => {
        console.error('Connection error', e.message)
    })

const db = mongoose.connection

module.exports = db
