const express = require('express');
const router = express.Router();

const sitesController = require('../app/controllers/SitesController');



router.get('/sign-in',sitesController.in);
router.get('/sign-up',sitesController.up);
router.get('/home',sitesController.home);
router.get('/create',sitesController.create);
router.post('/store',sitesController.store);

router.get('/',sitesController.home);


module.exports = router;