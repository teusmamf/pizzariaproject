const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const Messages = require('../error_messages/error_messages');
const Userkitchen = require('../models/user_kitchen');
const CustomerB2b = require('../models/Customer_b2b');
const Customer = require('../models/Customer');
const UserFinance = require('../models/user_finance');


async function findUserByUsername(username) {
    let user = await CustomerB2b.findOne({ username });
    if (user) return { user, role: 'CUSTOMER_B2B' };

    user = await Customer.findOne({ username });
    if (user) return { user, role: 'CUSTOMER' };

    user = await UserFinance.findOne({ username });
    if (user) return { user, role: 'USER_FINANCE' };

    user = await Userkitchen.findOne({ username });
    if (user) return { user, role: 'USER_KITCHEN' };

    return null; 
}


async function login(req, res) {
    const { username, password } = req.body;

    try {
       
        const result = await findUserByUsername(username);
        if (!result) {
            return res.status(404).send(Messages.NOT_FOUND_USER);
        }

        const { user, role } = result;
        
        const isPasswordValid = await bcrypt.compare(password, user.password);
        if (!isPasswordValid) {
            return res.status(401).send(Messages.INVALID_PASSWORD);
        }

        const payload = {
            id:user.id,
            role:role,
            school_id:user.school_id,
        }
     
        const token = jwt.sign(
            payload,
            process.env.JWT_SECRET,
            { expiresIn: '60m' } 
        );

        
        res.status(200).send({ message: Messages.SUCESSFUL_LOGIN, token });

    } catch (error) {
        console.log(error);
        res.status(500).send(error);
    }
}

module.exports = { login };
