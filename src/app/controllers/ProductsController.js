const Menu = require('../models/Menu');
const { ToArrObject } = require('../../util/mongoose');


class ProductsController{

    //get//product
    index(req,res,next){
        Menu.find({})
            .then(cs => res.render('product',{ 
                cs : ToArrObject(cs)
            }))
            .catch(next);
    }

    //get : product/combo
    combo(req,res,next){
        Menu.find({category:'combo'})
            .then(cs => res.render('product_category/combo',{ 
                cs : ToArrObject(cs)
            }))
            .catch(next);
    }

    pizza(req,res,next){
        Menu.find({category:'pizza'})
            .then(cs => res.render('product_category/combo',{ 
                cs : ToArrObject(cs)
            }))
            .catch(next);
    }

    burger(req,res,next){
        Menu.find({category:'burger'})
            .then(cs => res.render('product_category/combo',{ 
                cs : ToArrObject(cs)
            }))
            .catch(next);
    }

    chicken(req,res,next){
        Menu.find({category:'chicken'})
            .then(cs => res.render('product_category/combo',{ 
                cs : ToArrObject(cs)
            }))
            .catch(next);
    }

    dinner(req,res,next){
        Menu.find({category:'dinner'})
            .then(cs => res.render('product_category/combo',{ 
                cs : ToArrObject(cs)
            }))
            .catch(next);
    }

    drink(req,res,next){
        Menu.find({category:'drink'})
            .then(cs => res.render('product_category/combo',{ 
                cs : ToArrObject(cs)
            }))
            .catch(next);
    }
    
}
module.exports = new ProductsController;