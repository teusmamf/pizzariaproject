const mongoose = require('mongoose');
const { v4: uuidv4 } = require('uuid');

const customerSchema = new mongoose.Schema({
    id: { type: String, default: uuidv4, unique: true },
    name: { type: String, required: true },
    username:{type:String, required:true},
    password:{type:String, required:true},
    cpf: { type: String, required: true, length: 11 },
    address: {
        street: { type: String, required: true },
        number: { type: Number, required: true }
    },
    phone: { type: String, required: true },
    role:{
        type:String, 
        required:true,
        enum:['USER_B2B', 'FINAL_CLIENT', 'FINANCE_USER', 'KITCHEN_USER'],
        default:"FINAL_CLIENT"
    }
});

module.exports = mongoose.model('Customer', customerSchema, 'Costumer');