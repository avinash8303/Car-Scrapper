const { model, Schema } = require('../connection');

const mySchema = new Schema({
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    createdAt: { type: Date, default: Date.now }
});

module.exports = model('admins', mySchema);