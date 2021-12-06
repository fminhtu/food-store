const express = require('express');
const router = express.Router();

const usersController = require('../app/controllers/UsersController');
//const passport = require('../config/passport');


router.get('/account',usersController.viewAccount);



module.exports = router;