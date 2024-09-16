const Customer = require('../models/Customer');
const {testCPF} = require('../utils/validators');
const errorMessages = require('../error_messages/error_messages');

async function createCustomer(req, res) {
    try {
        const {cpf} = req.body;
        if(!testCPF(cpf)){
            return res.status(400).json({error:errorMessages.NOT_VALID_CPF});
        }
        const customer = new Customer(req.body);
        await customer.save();
        res.status(201).send(customer);

    } catch (error) {
        console.log(error);
        res.status(400).send(error);
        
    }
}

async function getAllCustomers(req, res) {
    try {
        const customers = await Customer.find().select('-id');
        res.status(200).send(customers);
    } catch (error) {
        res.status(500).send(error);
    }
}

async function getCustomerById(req, res) {
    try {
        const customer = await Customer.findOne({ id: req.params.id }).select('-id');
        if (!customer){
            return res.status(404).json({error:errorMessages.NOT_FOUND_USER});
        }
        res.status(200).send(customer);
    } catch (error) {
        res.status(500).send(error);
    }
}

async function updateCustomer(req, res) {
    try {
        const customer = await Customer.findOneAndUpdate({ id: req.params.id }, req.body, { new: true }).select('-_id');
        if (!customer) return res.status(404).send();
        res.status(200).send(customer);
    } catch (error) {
        res.status(400).send(error);
    }
}

async function deleteCustomer(req, res) {
    try {
        const customer = await Customer.findOneAndDelete({ id: req.params.id }).select('-id');
        if (!customer) return res.status(404).send();
        res.status(200).send(customer);
    } catch (error) {
        res.status(500).send(error);
    }
}

module.exports = {
    createCustomer,
    getAllCustomers,
    getCustomerById,
    updateCustomer,
    deleteCustomer
};
