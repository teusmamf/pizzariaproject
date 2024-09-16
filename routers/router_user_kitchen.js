const express = require('express');
const router = express.Router();
const {
    createUserKitchen,
    getalluserKitchen,
    getUserKitchenbyID,
    updateUserKitchen,
    deleteUserKitchen
} = require('../controllers/user_kitchen');

router.post('/create_userkitchen', createUserKitchen);
router.get('/all_usersKitchen', getalluserKitchen);
router.get('/get_userKitchen/:id', getUserKitchenbyID);
router.patch('/update_userKitchen/:id', updateUserKitchen);
router.delete('/delete_user_kitchen/:id', deleteUserKitchen);

module.exports = router;
