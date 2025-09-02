const { model, Schema } = require('../connection');

const mySchema = new Schema({
    //location, email, password,
    email : { type:String,require:true, unique:true} ,
    password: { type: String, required: true },
    location: { type: String, require: true},
    createdAt: { type: Date, default: Date.now }
});

module.exports = model('vendors', mySchema);