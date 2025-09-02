const mongoose = require('mongoose');
require('dotenv').config();

const url = process.env.DB_URL;


//  this is a asyncronous function - retrurns promise objects
mongoose.connect(url)
.then((result) => {
    console.log('database connected');
})
.catch((err) => {
    console.log(err);
});

module.exports = mongoose;