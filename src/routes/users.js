const express = require('express');
const router = express.Router();

const usersController = require('../app/controllers/UsersController');
const loggedInGuard = require("../guard/loggedInGuard");
//const passport = require('../config/passport');


router.get('/account',loggedInGuard,usersController.viewAccount);
router.get('/activate',usersController.activate);
router.get('/change-pass',usersController.changePassword);
router.post('/change-pass',usersController.resetPassword);
router.use('/history-order',loggedInGuard,usersController.historyOrder);






module.exports = router;