const { model, Schema } = require('../connection');

const mySchema = new Schema({
    name: String,
    email: { type: String, required: true, unique: true },
    city: {type: String, default:'unknown'},
    password: { type: String, required: false },
    role: { type: String, enum: ['user', 'admin'], default: 'user' },
    createdAt: { type: Date, default: Date.now }
});

module.exports = model('users', mySchema);