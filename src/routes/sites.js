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
router.post('/cart',sitesController.postCart);
router.get('/pay',loggedInGuard,sitesController.pay);
router.post('/pay',loggedInGuard,sitesController.postPay);

router.get('/forget-password',sitesController.forgetPassword);
router.post('/forget-password',sitesController.resetPassword);

router.get('/',sitesController.home);


module.exports = router;