const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const foodSchema = new Schema({
    name: {
        type: String,
        required: true,
    },
    type: {
        type: String,
        required: true
    },
    flavor: {
        type: String,
        default: true
    },
    quantity: {
        type: String,
        default: true,
    },
    aisle: {
        type: String,
        required: true
    },
    bin: {
        type: String,
        required: true
    },
    date: {
        type: String,
        required: true
    }
}, {
    timestamps: true
});

const Food = mongoose.model('Food', foodSchema);

module.exports = Food;