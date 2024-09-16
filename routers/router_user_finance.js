const express = require('express');
const router = express.Router();
const {
    createUserFinance,
    getallUserFinance,
    getUserFinancebyId,
    updateUserFinance,
    deleteUserFinance
} = require('../controllers/user_finance');

router.post('/create_customer', createUserFinance);
router.get('/all_customers', getallUserFinance);
router.get('/get_customer/:id', getUserFinancebyId);
router.patch('/update_customer/:id', updateUserFinance);
router.delete('/delete_customer/:id', deleteUserFinance);

module.exports = router;
