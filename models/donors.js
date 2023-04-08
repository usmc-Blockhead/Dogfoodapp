const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const donorSchema = new Schema({
    name: {
        type: String,
        required: true,
    },
    phoneNumber: {
        type: String,
        required: true
    },
    email: {
        type: String,
        default: false
    },
    withACompany: {
        type: Boolean,
        default: true,
    },
    thanks: {
        type: Boolean,
        required: true
    }
}, {
    timestamps: true
});

const Donor = mongoose.model('Donor', donorSchema);

module.exports = Donor;