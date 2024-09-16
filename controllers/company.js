const Company = require('../models/company');

async function createCompany(req, res) {
    try {
        const company = new Company(req.body);
        await company.save();
        res.status(201).send(company);
    } catch (error) {
        console.log(error);
        res.status(400).send(error);
    }
}

async function getallcompanies(req, res) {
    try {
        const companies = await Company.find().select('-id');
        res.status(200).send(companies);
    } catch (error) {
        res.status(500).send(error);
    }
}

async function getcompanybyId(req, res) {
    try {
        const company = await Company.findOne({ id: req.params.id }).select('-id');
        if (!company) return res.status(404).send();
        res.status(200).send(company);
    } catch (error) {
        res.status(500).send(error);
    }
}

async function updateCompany(req, res) {
    try {
        const company = await Company.findOneAndUpdate({ id: req.params.id }, req.body, { new: true }).select('-id');
        if (!company) return res.status(404).send();
        res.status(200).send(company);
    } catch (error) {
        res.status(400).send(error);
    }
}

async function deleteCompany(req, res) {
    try {
        const company = await Company.findOneAndDelete({ id: req.params.id }).select('-id');
        if (!company) return res.status(404).send();
        res.status(200).send(company);
        
    } catch (error) {
        
        
        res.status(500).send(error);
    }
}

module.exports = {
    createCompany,
    getallcompanies,
    getcompanybyId,
    updateCompany,
    deleteCompany
};
