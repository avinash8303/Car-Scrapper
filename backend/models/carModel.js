const { model, Schema, Types } = require('../connection');

const mySchema = new Schema({
    brand: String,
    model: String,
    chassisNumber: { type: String, required: true, unique: true },
    regNumber: { type: String, default: 'unknown' },
    year: { type: Number, required: true },
    image: { type: String }, // Cloudinary image URL
    owner: { type: Schema.Types.ObjectId, ref: 'users', required: true },
    status:  { type: String, enum: ['active', 'scrapped'], default: 'active' },
    createdAt: { type: Date, default: Date.now }
});

module.exports = model('cars', mySchema);