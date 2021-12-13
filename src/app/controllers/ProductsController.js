const Menu = require('../models/Menu');
const { ToObject } = require('../../util/mongoose');
const { ToArrObject } = require('../../util/mongoose');
const ProductsService = require('../service/productsService');


function escapeRegex(text) {
    return text.replace(/[-[\]{}()*+?.,\\^$|#\s]/g, "\\$&");
};

class ProductsController{

    //get//product
    index(req,res,next){
        if(req.query.search) {
            const regex = new RegExp(escapeRegex(req.query.search), 'gi');
            Menu.find({name: regex},{},{option: "i"})
                .then(item => res.render('product_category/category',{
                    item : ToArrObject(item)
                }))
                .catch(next);
        }
     else {
        Promise.all([Menu.find({}),Menu.count({})])
        .then(([item,count])=>{
            let items = ProductsService.viewItem(req.query.page,count,item);
            let totalPageArr = ProductsService.paginationArray(req.query.page,count,"");           
            res.render('product_category/category',{
                item: items,
                totalPageArr
            })
        }
        )
        }
    }

    //get : product/category
    combo(req,res,next){
        Promise.all([Menu.find({category:'combo'}),Menu.count({category:'combo'})])
            .then(([item,count])=>{
                let items = ProductsService.viewItem(req.query.page,count,item);
                let totalPageArr = ProductsService.paginationArray(req.query.page,count,"/combo");             
                res.render('product_category/category',{
                    item: items,
                    totalPageArr,
                })
            }
            )
    }

    async comboDetail(req,res,next){
        const productWithComments = await ProductsService.getProductWithComment(req.params.slug);
        res.render('product_category/detail',productWithComments);
    }

    pizza(req,res,next){
        Promise.all([Menu.find({category:'pizza'}),Menu.count({category:'pizza'})])
            .then(([item,count])=>{
                let items = ProductsService.viewItem(req.query.page,count,item);
                let totalPageArr = ProductsService.paginationArray(req.query.page,count,"/pizza");             
                res.render('product_category/category',{
                    item: items,
                    totalPageArr,
                })
            }
            )
    }

    async pizzaDetail(req,res,next){
        const productWithComments = await ProductsService.getProductWithComment(req.params.slug);
        res.render('product_category/detail',productWithComments);
    }

    burger(req,res,next){
        Promise.all([Menu.find({category:'burger'}),Menu.count({category:'burger'})])
            .then(([item,count])=>{
                let items = ProductsService.viewItem(req.query.page,count,item);
                let totalPageArr = ProductsService.paginationArray(req.query.page,count,"/burger");             
                res.render('product_category/category',{
                    item: items,
                    totalPageArr,
                })
            }
            )
    }

    async burgerDetail(req,res,next){
        const productWithComments = await ProductsService.getProductWithComment(req.params.slug);
        res.render('product_category/detail',productWithComments);
    }

    chicken(req,res,next){
        Promise.all([Menu.find({category:'chicken'}),Menu.count({category:'chicken'})])
            .then(([item,count])=>{
                let items = ProductsService.viewItem(req.query.page,count,item);
                let totalPageArr = ProductsService.paginationArray(req.query.page,count,"/chicken");             
                res.render('product_category/category',{
                    item: items,
                    totalPageArr,
                })
            }
            )
    }

    async chickenDetail(req,res,next){
        const productWithComments = await ProductsService.getProductWithComment(req.params.slug);
        res.render('product_category/detail',productWithComments);
    }

    dinner(req,res,next){
        Promise.all([Menu.find({category:'side-dishes'}),Menu.count({category:'side-dishes'})])
            .then(([item,count])=>{
                let items = ProductsService.viewItem(req.query.page,count,item);
                let totalPageArr = ProductsService.paginationArray(req.query.page,count,"/side-dishes");             
                res.render('product_category/category',{
                    item: items,
                    totalPageArr,
                })
            }
            )
    }

    async dinnerDetail(req,res,next){
        const productWithComments = await ProductsService.getProductWithComment(req.params.slug);
        res.render('product_category/detail',productWithComments);
    }

    drink(req,res,next){
        Promise.all([Menu.find({category:'drink'}),Menu.count({category:'drink'})])
            .then(([item,count])=>{
                let items = ProductsService.viewItem(req.query.page,count,item);
                let totalPageArr = ProductsService.paginationArray(req.query.page,count,"/drink");             
                res.render('product_category/category',{
                    item: items,
                    totalPageArr,
                })
            }
            )
    }

    async drinkDetail(req,res,next){
        const productWithComments = await ProductsService.getProductWithComment(req.params.slug);
        res.render('product_category/detail',productWithComments);
    }


    async postCommentCombo(req,res,next){
        if(!req.user){
            return res.redirect('/sign-in')
        }
        const comment = await ProductsService.postComment(req.user.id,req.user.name,req.body.productId, req.body.content);
        res.redirect('/product/combo/'+req.params.slug)
    }

    async postCommentBurger(req,res,next){
        if(!req.user){
            return res.redirect('/sign-in')
        }
        const comment = await ProductsService.postComment(req.user.id,req.user.name,req.body.productId, req.body.content);
        res.redirect('/product/burger/'+req.params.slug)
    }

    async postCommentChicken(req,res,next){
        if(!req.user){
            return res.redirect('/sign-in')
        }
        const comment = await ProductsService.postComment(req.user.id,req.user.name,req.body.productId, req.body.content);
        res.redirect('/product/chicken/'+req.params.slug)
    }


    async postCommentPizza(req,res,next){
        if(!req.user){
            return res.redirect('/sign-in')
        }
        const comment = await ProductsService.postComment(req.user.id,req.user.name,req.body.productId, req.body.content);
        res.redirect('/product/pizza/'+req.params.slug)
    }


    async postCommentDinner(req,res,next){
        if(!req.user){
            return res.redirect('/sign-in')
        }
        const comment = await ProductsService.postComment(req.user.id,req.user.name,req.body.productId, req.body.content);
        res.redirect('/product/side-dishes/'+req.params.slug)
    }

    async postCommentDrink(req,res,next){
        if(!req.user){
            return res.redirect('/sign-in')
        }
        const comment = await ProductsService.postComment(req.user.id,req.user.name,req.body.productId, req.body.content);
        res.redirect('/product/drink/'+req.params.slug)
    }

    
    
}
module.exports = new ProductsController;