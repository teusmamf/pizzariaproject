const mongoose = require('mongoose');
const { v4: uuidv4 } = require('uuid');

const customerSchema = new mongoose.Schema({
    id: { type: String, default: uuidv4, unique: true },
    name: { type: String, required: true },
    cpf: { type: String, required: true, length: 11 },
    address: {
        street: { type: String, required: true },
        number: { type: Number, required: true }
    },
    phone: { type: String, required: true }
});

module.exports = mongoose.model('Customer', customerSchema);