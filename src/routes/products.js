const express = require('express');
const router = express.Router();

const productsController = require('../app/controllers/ProductsController');

//product + '/:slug'
router.get('/combo',productsController.combo);
router.use('/pizza',productsController.pizza);
router.get('/burger',productsController.burger);
router.get('/chicken',productsController.chicken);
router.get('/dinner',productsController.dinner);
router.get('/drink',productsController.drink);

//product + '/'
router.get('/',productsController.index);


module.exports = router;