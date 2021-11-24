const express = require('express');
const router = express.Router();

const productsController = require('../app/controllers/ProductsController');

//product + '/:slug'

router.get('/combo/:slug',productsController.comboDetail);
router.get('/combo',productsController.combo);
router.get('/pizza/:slug',productsController.pizzaDetail);
router.get('/pizza',productsController.pizza);
router.get('/burger/:slug',productsController.burgerDetail);
router.get('/burger',productsController.burger);
router.get('/chicken/:slug',productsController.chickenDetail);
router.get('/chicken',productsController.chicken);
router.get('/side-dishes/:slug',productsController.dinnerDetail);
router.get('/side-dishes',productsController.dinner);
router.get('/drink/:slug',productsController.drinkDetail);
router.get('/drink',productsController.drink);

//product + '/'
router.get('/',productsController.index);


module.exports = router;