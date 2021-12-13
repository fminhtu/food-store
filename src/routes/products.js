const express = require('express');
const router = express.Router();

const productsController = require('../app/controllers/ProductsController');

//product + '/:slug'

router.get('/combo/:slug',productsController.comboDetail);
router.post('/drink/:slug/comments',productsController.postCommentCombo);
router.get('/combo',productsController.combo);
router.get('/pizza/:slug',productsController.pizzaDetail);
router.post('/drink/:slug/comments',productsController.postCommentPizza);
router.get('/pizza',productsController.pizza);
router.get('/burger/:slug',productsController.burgerDetail);
router.post('/drink/:slug/comments',productsController.postCommentBurger);
router.get('/burger',productsController.burger);
router.get('/chicken/:slug',productsController.chickenDetail);
router.post('/drink/:slug/comments',productsController.postCommentChicken);
router.get('/chicken',productsController.chicken);
router.get('/side-dishes/:slug',productsController.dinnerDetail);
router.post('/drink/:slug/comments',productsController.postCommentDinner);
router.get('/side-dishes',productsController.dinner);
router.get('/drink/:slug',productsController.drinkDetail);
router.post('/drink/:slug/comments',productsController.postCommentDrink);
router.get('/drink',productsController.drink);
//product + '/'
router.get('/',productsController.index);


module.exports = router;