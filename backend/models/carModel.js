const { model, Schema } = require('../connection');

const mySchema = new Schema({
    brand: String,
    model: String,
    chassisNumber: { type: String, required: true, unique: true },
    regNumber: { type: String, default: 'unknown' },
    year: { type: Number, required: true },
    image: { type: String }, // Cloudinary image URL
    owner: { type: Schema.Types.ObjectId, ref: 'users', required: true },
    createdAt: { type: Date, default: Date.now }
});

module.exports = model('cars', mySchema);