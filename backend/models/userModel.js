const { model, Schema } = require('../connection');

const mySchema = new Schema({
    name: String,
    email: { type: String, required: true, unique: true },
    city: {type: String, default:'unknown'},
    password: { type: String, required: true },
    createdAt: { type: Date, default: Date.now }
});

module.exports = model('users', mySchema);