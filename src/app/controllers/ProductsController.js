const Menu = require('../models/Menu');
const ProductsService = require('../service/productsService');


function escapeRegex(text) {
    return text.replace(/[-[\]{}()*+?.,\\^$|#\s]/g, "\\$&");
};

class ProductsController{

    //get//product
    index(req,res,next){
        
        if (req.query.order && req.query.category && req.query.type){
            console.log(req.query)
            if (req.query.order== "asc") {
                Menu.find({ category: [req.query.category]}).sort({ new_price: 1, price: 1 }).lean()
                    .then(item => res.render('product_category/category', {
                        item: item
                    }))
                    .catch(next);
            }
            else if (req.query.order == "dsc") {
                Menu.find({ category: [req.query.category] }).sort({ new_price: -1, price: -1 }).lean()
                    .then(item => res.render('product_category/category', {
                        item: item
                    }))
                    .catch(next);
            }
           
        }
        else if(req.query.search) {
            const regex = new RegExp(escapeRegex(req.query.search), 'gi');
            Menu.find({name: regex},{},{option: "i"}).lean()
                .then(item => res.render('product_category/category',{
                    item : item
                }))
                .catch(next);
        }
        else {
        Promise.all([Menu.find({}).lean(),Menu.count({})])
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
    async combo(req,res,next){
        const productsWithPagination = await ProductsService.getProductsWithPagination("combo",req.params.slug);
        res.render('product_category/category',productsWithPagination);
    }

    async comboDetail(req,res,next){
        const productWithComments = await ProductsService.getProductWithComment(req.params.slug);
        res.render('product_category/detail',productWithComments);
    }

    async pizza(req,res,next){
        const productsWithPagination = await ProductsService.getProductsWithPagination("pizza",req.params.slug);
        res.render('product_category/category',productsWithPagination);
    }

    async pizzaDetail(req,res,next){
        const productWithComments = await ProductsService.getProductWithComment(req.params.slug);
        res.render('product_category/detail',productWithComments);
    }

    async burger(req,res,next){
        const productsWithPagination = await ProductsService.getProductsWithPagination("burger",req.params.slug);
        res.render('product_category/category',productsWithPagination);
    }

    async burgerDetail(req,res,next){
        const productWithComments = await ProductsService.getProductWithComment(req.params.slug);
        res.render('product_category/detail',productWithComments);
    }

    async chicken(req,res,next){
        const productsWithPagination = await ProductsService.getProductsWithPagination("chicken",req.params.slug);
        res.render('product_category/category',productsWithPagination);
    }

    async chickenDetail(req,res,next){
        const productWithComments = await ProductsService.getProductWithComment(req.params.slug);
        res.render('product_category/detail',productWithComments);
    }

    async dinner(req,res,next){
        const productsWithPagination = await ProductsService.getProductsWithPagination("side-dishes",req.params.slug);
        res.render('product_category/category',productsWithPagination);
    }

    async dinnerDetail(req,res,next){
        const productWithComments = await ProductsService.getProductWithComment(req.params.slug);
        res.render('product_category/detail',productWithComments);
    }

    async drink(req,res,next){
        const productsWithPagination = await ProductsService.getProductsWithPagination("drink",req.params.slug);
        res.render('product_category/category',productsWithPagination);
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

    async postCart(req,res,next){
        if(!req.user){
            return res.redirect('/sign-in')
        }
        const cart = await ProductsService.addCart(req.user.id,req.body.productId,req.body.productName,req.body.image,req.body.price,req.body.quantity);
        res.redirect('/product/drink/'+req.params.slug)
    }

}
module.exports = new ProductsController;