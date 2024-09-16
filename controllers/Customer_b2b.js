const Customer = require('../models/Customer_b2b');

async function createCustomerB2B(req, res) {
    try {
        const customer = new Customer(req.body);
        await customer.save();
        res.status(201).send(customer);
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
