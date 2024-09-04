const mongoose = require('mongoose');
const { v4: uuidv4 } = require('uuid');

const customerb2bSchema = new mongoose.Schema({
    id: { type: String, default: uuidv4, unique: true },
    name: { type: String, required: true },
    cpf: { type: String, required: true, length: 11 },
    phone: { type: String, required: true },
    company_id:{ type:String, required:true }
});

module.exports = mongoose.model('Customer_b2b', customerb2bSchema);