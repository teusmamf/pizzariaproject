const UserKitchen = require('../models/user_kitchen');
const errorMessages = require('../error_messages/error_messages');
const bcrypt = require('bcrypt');

async function createUserKitchen(req, res) {
    try {
        const {cpf,password} = req.body;
        if(!testCPF(cpf)){
            return res.status(400).json({error:errorMessages.NOT_VALID_CPF});
        }

        const hashPassword = await bcrypt.hash(req.body.password, 10);

        const user_kitchen = new UserKitchen({
            ...req.body,
            password:hashPassword
        });

        await user_kitchen.save();
        res.status(201).send({message: errorMessages.CREATED_USER , user_kitchen});
      
    } catch (error) {
        console.log(error);
        res.status(400).send(error);
        
    }
}

async function getalluserKitchen(req, res) {
    try {
        const usersKitchen = await UserKitchen.find().select('-id');
        res.status(200).send(usersKitchen);
    } catch (error) {
        res.status(500).send(error);
    }
}

async function getUserKitchenbyID(req, res) {
    try {
        const userKitchen = await UserKitchen.findOne({ id: req.params.id }).select('-id');
        if (!userKitchen) return res.status(404).send();
        res.status(200).send(UserKitchen);
    } catch (error) {
        res.status(500).send(error);
    }
}

async function updateUserKitchen(req, res) {
    try {
        const userKitchen = await UserKitchen.findOneAndUpdate({ id: req.params.id }, req.body, { new: true }).select('-id');
        if (!userKitchen) return res.status(404).send();
        res.status(200).send(userKitchen);
    } catch (error) {
        res.status(400).send(error);
    }
}

async function deleteUserKitchen(req, res) {
    try {
        const userKitchen = await UserKitchen.findOneAndDelete({ id: req.params.id }).select('-id');
        if (!userKitchen) return res.status(404).send();
        res.status(200).send(userKitchen);
    } catch (error) {
        res.status(500).send(error);
    }
}

module.exports = {
    createUserKitchen,
    getalluserKitchen,
    getUserKitchenbyID,
    updateUserKitchen,
    deleteUserKitchen
};
