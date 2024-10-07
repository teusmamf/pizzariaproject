const UserFinance = require('../models/user_finance');
const errorMessages = require('../error_messages/error_messages');
const bcrypt = require('bcrypt');


async function createUserFinance(req, res) {
    try {
        const {cpf,password} = req.body;
        if(!testCPF(cpf)){
            return res.status(400).json({error:errorMessages.NOT_VALID_CPF});
        }

        const hashPassword = await bcrypt.hash(req.body.password, 10);

        const user_finance = new UserFinance({
            ...req.body,
            password:hashPassword
        });

        await user_finance.save();
        res.status(201).send({message: errorMessages.CREATED_USER , user_finance});
      
    } catch (error) {
        console.log(error);
        res.status(400).send(error);
        
    }
}

async function getallUserFinance(req, res) {
    try {
        const usersFinance = await UserFinance.find().select('-id');
        res.status(200).send(usersFinance);
    } catch (error) {
        res.status(500).send(error);
    }
}

async function getUserFinancebyId(req, res) {
    try {
        const customer = await UserFinance.findOne({ id: req.params.id }).select('-id');
        if (!customer) return res.status(404).send();
        res.status(200).send(UserFinance);
    } catch (error) {
        res.status(500).send(error);
    }
}

async function updateUserFinance(req, res) {
    try {
        const userFinance = await UserFinance.findOneAndUpdate({ id: req.params.id }, req.body, { new: true }).select('-id');
        if (!userFinance) return res.status(404).send();
        res.status(200).send(userFinance);
    } catch (error) {
        res.status(400).send(error);
    }
}

async function deleteUserFinance(req, res) {
    try {
        const userFinance = await UserFinance.findOneAndDelete({ id: req.params.id }).select('-id');
        if (!userFinance) return res.status(404).send();
        res.status(200).send(userFinance);
    } catch (error) {
        res.status(500).send(error);
    }
}

module.exports = {
    createUserFinance,
    getallUserFinance,
    getUserFinancebyId,
    updateUserFinance,
    deleteUserFinance
};
