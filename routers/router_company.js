const express = require('express');
const router = express.Router();
const {
    createCompany,
    getallcompanies,
    getcompanybyId,
    updateCompany,
    deleteCompany
} = require('../controllers/company');

router.post('/create_company', createCompany);
router.get('/all_companies', getallcompanies);
router.get('/get_company_id/:id', getcompanybyId);
router.patch('/update_company/:id', updateCompany);
router.delete('/delete_company/:id', deleteCompany);

module.exports = router;
