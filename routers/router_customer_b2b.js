const express = require('express');
const router = express.Router();
const {
    createCustomerB2B,
    getAllCustomersB2B,
    getCustomerB2BById,
    updateCustomerB2B,
    deleteCustomerB2B
} = require('../controllers/Customer_b2b');

router.post('/create_customer_b2b', createCustomerB2B);
router.get('/all_customers_b2b', getAllCustomersB2B);
router.get('/get_customer_b2b/:id', getCustomerB2BById);
router.patch('/update_customer_b2b/:id', updateCustomerB2B);
router.delete('/delete_customer_b2b/:id', deleteCustomerB2B);

module.exports = router;
