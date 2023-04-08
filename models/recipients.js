const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const recipientSchema = new Schema({
    name: {
        type: String,
        required: true,
    },
    address: {
        type: String,
        required: true
    },
    city: {
        type: String,
        default: true
    },
    state: {
        type: String,
        default: true,
    },
    zipcode: {
        type: String,
        required: true
    },
    donatedQuantity: {
        type: String,
        required: true
    },
}, {
    timestamps: true
});

const Recipient = mongoose.model('Recipient', recipientSchema);

module.exports = Recipient;