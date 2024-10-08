const Customer_b2b = require('../models/Customer_b2b');
const Customer = require('../models/Customer_b2b');
const bcrypt = require('bcrypt');
const errorMessages = require('../error_messages/error_messages');
const {testCPF} = require('../utils/validators');

async function createCustomerB2B(req, res) {
    try {
        const { cpf, password } = req.body;

        if (!testCPF(cpf)) {
            return res.status(400).json({ error: errorMessages.NOT_VALID_CPF });
        }

        
        if (!password) {
            return res.status(400).json({ error: 'Password is required' });
        }

        
        const hashPassword = await bcrypt.hash(password, 10);

        
        const customer_b2b = new Customer_b2b({
            ...req.body,
            password: hashPassword
        });

        await customer_b2b.save();
        res.status(201).send({ message: errorMessages.CREATED_USER, customer_b2b });
      
    } catch (error) {
        console.log(error);
        res.status(400).send(error);
    }
}


async function getAllCustomersB2B(req, res) {
    try {
        const customers = await Customer.find().select('-id');
        res.status(200).send(customers);
    } catch (error) {
        res.status(500).send(error);
    }
}

async function getCustomerB2BById(req, res) {
    try {
        const customer = await Customer.findOne({ id: req.params.id }).select('-id');
        if (!customer) return res.status(404).send();
        res.status(200).send(customer);
    } catch (error) {
        res.status(500).send(error);
    }
}

async function updateCustomerB2B(req, res) {
    try {
        const customer = await Customer.findOneAndUpdate({ id: req.params.id }, req.body, { new: true }).select('-id');
        if (!customer) return res.status(404).send();
        res.status(200).send(customer);
    } catch (error) {
        res.status(400).send(error);
    }
}

async function deleteCustomerB2B(req, res) {
    try {
        const customer = await Customer.findOneAndDelete({ id: req.params.id }).select('-id');
        if (!customer) return res.status(404).send();
        res.status(200).send(customer);
    } catch (error) {
        res.status(500).send(error);
    }
}

module.exports = {
    createCustomerB2B,
    getAllCustomersB2B,
    getCustomerB2BById,
    updateCustomerB2B,
    deleteCustomerB2B
};
