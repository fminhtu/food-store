const express = require('express');
const router = express.Router();

const usersController = require('../app/controllers/UsersController');
const loggedInGuard = require("../guard/loggedInGuard");
//const passport = require('../config/passport');


router.get('/account',loggedInGuard,usersController.viewAccount);
router.get('/activate',usersController.activate);
router.get('/forget-pass',usersController.forgetPassword);
router.post('/forget-pass',usersController.resetPassword);
router.get('/change-pass',loggedInGuard,usersController.changePassword);
router.post('/change-pass',usersController.postChangePassword);
router.get('/update-account',usersController.updateAccount);
router.put('/storeUpdate',usersController.storeUpdate);
router.get('/history-order',loggedInGuard,usersController.historyOrder);







module.exports = router;