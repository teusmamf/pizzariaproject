const express = require('express');
const router = express.Router();
const {
    createCompany,
    getallcompanies,
    getcompanybyId,
    updateCompany,
    deleteCompany
} = require('../controllers/company');

router.post('/create_customer_b2b', createCompany);
router.get('/all_customers_b2b', getallcompanies);
router.get('/get_customer_b2b/:id', getcompanybyId);
router.patch('/update_customer_b2b/:id', updateCompany);
router.delete('/delete_customer_b2b/:id', deleteCompany);

module.exports = router;
