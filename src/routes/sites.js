const express = require('express');
const router = express.Router();

const sitesController = require('../app/controllers/SitesController');
const passport = require('../config/passport');
const loggedInGuard = require("../guard/loggedInGuard");


router.get('/sign-in',sitesController.login);
router.post('/sign-in',passport.authenticate('local',{  
    successRedirect: '/',
    failureRedirect: '/sign-in',
    failureFlash: true
}
),sitesController.login);
router.get('/logout',sitesController.logout);
router.get('/sign-up',sitesController.up);
router.post('/sign-up',sitesController.submit);

router.get('/home',sitesController.home);
router.get('/create',sitesController.create);
router.post('/store',sitesController.store);
router.get('/cart',sitesController.cart);
router.post('/cart',loggedInGuard,sitesController.postCart);
router.get('/',sitesController.home);


module.exports = router;