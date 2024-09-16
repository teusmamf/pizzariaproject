const UserKitchen = require('../models/user_kitchen');

async function createUserKitchen(req, res) {
    try {
        const userKitchen = new UserKitchen(req.body);
        await userKitchen.save();
        res.status(201).send(userKitchen);
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
