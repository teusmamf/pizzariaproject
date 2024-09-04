const mongoose = require('mongoose');
const { v4: uuidv4 } = require('uuid');

const companiSchema = new mongoose.Schema({
    id: { type: String, default: uuidv4, unique: true },
    name: { type: String, required: true },
    id_owner:{type:String, required: true},
    address:{type:String, required:true},
    cnpj:{type:String, required: true, length: 14}
});

module.exports = mongoose.model('companySchema', companiSchema);