const express = require('express');
const router = express.Router();

const usersController = require('../app/controllers/UsersController');
const loggedInGuard = require("../guard/loggedInGuard");
//const passport = require('../config/passport');


router.get('/account',loggedInGuard,usersController.viewAccount);



module.exports = router;