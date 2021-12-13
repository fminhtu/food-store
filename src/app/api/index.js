const express = require('express');
const router = express.Router();
const productApiRouter = require('./product');
router.use('/products',productApiRouter) ;

module.exports = router;