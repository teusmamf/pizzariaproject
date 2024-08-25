const express = require('express');
const router = express.Router();
const Customer = require('../models/Customer');

// Create a customer
router.post('/create_customer', async (req, res) => {
    const customer = new Customer(req.body);
    try {
        await customer.save();
        res.status(201).send(customer);
    } catch (error) {
        console.log(error);
        res.status(400).send(error);
    }
});

// Get all customers
router.get('/all_customers', async (req, res) => {
    try {
        const customers = await Customer.find().select('-_id');
        res.status(200).send(customers);
    } catch (error) {
        res.status(500).send(error);
    }
});

// Get individual customer by id
router.get('/get_customer/:id', async (req, res) => {
    try {
        const customer = await Customer.findOne({ id: req.params.id }).select('-_id');
        if (!customer) return res.status(404).send();
        res.status(200).send(customer);
    } catch (error) {
        res.status(500).send(error);
    }
});

// Update a customer
router.patch('/update_customer/:id', async (req, res) => {
    try {
        const customer = await Customer.findOneAndUpdate({ id: req.params.id }, req.body, { new: true }).select('-_id');
        if (!customer) return res.status(404).send();
        res.status(200).send(customer);
    } catch (error) {
        res.status(400).send(error);
    }
});

// Delete a customer
router.delete('/delete_customer/:id', async (req, res) => {
    try {
        const customer = await Customer.findOneAndDelete({ id: req.params.id }).select('-_id');
        if (!customer) return res.status(404).send();
        res.status(200).send(customer);
    } catch (error) {
        res.status(500).send(error);
    }
});

module.exports = router;