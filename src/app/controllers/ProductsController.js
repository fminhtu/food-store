const Menu = require('../models/Menu');
const { ToArrObject } = require('../../util/mongoose');
const { ToObject } = require('../../util/mongoose');


class ProductsController{

    //get//product
    index(req,res,next){
        Menu.find({})
            .then(cs => res.render('product_category/category',{ 
                cs : ToArrObject(cs)
            }))
            .catch(next);
    }

    //get : product/category
    combo(req,res,next){
        Menu.find({category:'combo'})
            .then(cs => res.render('product_category/category',{ 
                cs : ToArrObject(cs)
            }))
            .catch(next);
    }

    comboDetail(req,res,next){
        Menu.findOne({slug: req.params.slug})
            .then(detail => res.render('product_category/detail',{ 
                detail : ToObject(detail)
            }))
            .catch(next);
    }

    pizza(req,res,next){
        Menu.find({category:'pizza'})
            .then(cs => res.render('product_category/category',{ 
                cs : ToArrObject(cs)
            }))
            .catch(next);
    }

    pizzaDetail(req,res,next){
        Menu.findOne({slug: req.params.slug})
            .then(detail => res.render('product_category/detail',{ 
                detail : ToObject(detail)
            }))
            .catch(next);
    }

    burger(req,res,next){
        Menu.find({category:'burger'})
            .then(cs => res.render('product_category/category',{ 
                cs : ToArrObject(cs)
            }))
            .catch(next);
    }

    burgerDetail(req,res,next){
        Menu.findOne({slug: req.params.slug})
            .then(detail => res.render('product_category/detail',{ 
                detail : ToObject(detail)
            }))
            .catch(next);
    }

    chicken(req,res,next){
        Menu.find({category:'chicken'})
            .then(cs => res.render('product_category/category',{ 
                cs : ToArrObject(cs)
            }))
            .catch(next);
    }

    chickenDetail(req,res,next){
        Menu.findOne({slug: req.params.slug})
            .then(detail => res.render('product_category/detail',{ 
                detail : ToObject(detail)
            }))
            .catch(next);
    }

    dinner(req,res,next){
        Menu.find({category:'side-dishes'})
            .then(cs => res.render('product_category/category',{ 
                cs : ToArrObject(cs)
            }))
            .catch(next);
    }

    dinnerDetail(req,res,next){
        Menu.findOne({slug: req.params.slug})
            .then(detail => res.render('product_category/detail',{ 
                detail : ToObject(detail)
            }))
            .catch(next);
    }

    drink(req,res,next){
        Menu.find({category:'drink'})
            .then(cs => res.render('product_category/category',{ 
                cs : ToArrObject(cs)
            }))
            .catch(next);
    }

    drinkDetail(req,res,next){
        Menu.findOne({slug: req.params.slug})
            .then(detail => res.render('product_category/detail',{ 
                detail : ToObject(detail)
            }))
            .catch(next);
    }
    
}
module.exports = new ProductsController;