const Menu = require('../models/Menu');
const ProductsService = require('../service/productsService');


function escapeRegex(text) {
    return text.replace(/[-[\]{}()*+?.,\\^$|#\s]/g, "\\$&");
};

class ProductsController{

    //get//product
    async index(req,res,next){
        
        if (req.query.order && req.query.category && req.query.type){
            let type;
            
            if (req.query.order == "asc") {
                if (req.query.type === "price") {
                    type = { new_price: 1, price: 1 }
                }
                else if (req.query.type === "rating") {
                    type = { num_rating: 1, rating: 1}
                }
                const item = await Menu.find({ category: [req.query.category]}).sort( type ).lean();
                const count = item.length;
                let items = ProductsService.viewItem(req.query.page,count,item);
                const totalPageArr = ProductsService.paginationArrayFilter(req.query.page, count, req.query.category,req.query.type,"asc"); 
                res.render('product_category/category', {
                        item: items,
                        totalPageArrFilter: totalPageArr
                })
                
            }
            else if (req.query.order == "dsc") {            
                if (req.query.type === "price") {
                    type = { new_price: -1, price: -1 }
                }
                else if (req.query.type === "rating") {
                    type = { num_rating: -1, rating: -1 }
                }
                const item = await Menu.find({ category: [req.query.category]}).sort( type ).lean();
                const count = item.length;
                let items = ProductsService.viewItem(req.query.page,count,item);
                const totalPageArr = ProductsService.paginationArrayFilter(req.query.page, count, req.query.category,req.query.type,"asc"); 
                res.render('product_category/category', {
                        item: items,
                        totalPageArrFilter: totalPageArr
                })
            }
           
        }
        else if(req.query.search) {
            const regex = new RegExp(escapeRegex(req.query.search), 'gi');
            const item = await Menu.find({name: regex},{},{option: "i"}).lean();
            const count = item.length;
            let items = ProductsService.viewItem(req.query.page,count,item);
            const totalPageArr = ProductsService.paginationArray(req.query.page, count, req.query.search); 
            res.render('product_category/category',{
                item: items,
                totalPageArrNotAjax: totalPageArr
            })
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
        const productsWithPagination = await ProductsService.getProductsWithPagination("combo",req.params.page);
        res.render('product_category/category',productsWithPagination);
    }

    async comboDetail(req,res,next){
        const productWithComments = await ProductsService.getProductCmtPage(req.params.slug,req.params.page);
        res.render('product_category/detail',productWithComments);
    }

    async pizza(req,res,next){
        const productsWithPagination = await ProductsService.getProductsWithPagination("pizza",req.params.page);
        res.render('product_category/category',productsWithPagination);
    }

    async pizzaDetail(req,res,next){
        const productWithComments = await ProductsService.getProductCmtPage(req.params.slug,req.params.page);
        res.render('product_category/detail',productWithComments);
    }

    async burger(req,res,next){
        const productsWithPagination = await ProductsService.getProductsWithPagination("burger",req.params.page);
        res.render('product_category/category',productsWithPagination);
    }

    async burgerDetail(req,res,next){
        const productWithComments = await ProductsService.getProductCmtPage(req.params.slug,req.params.page);
        res.render('product_category/detail',productWithComments);
    }

    async chicken(req,res,next){
        const productsWithPagination = await ProductsService.getProductsWithPagination("chicken",req.params.page);
        res.render('product_category/category',productsWithPagination);
    }

    async chickenDetail(req,res,next){
        const productWithComments = await ProductsService.getProductCmtPage(req.params.slug,req.params.page);
        res.render('product_category/detail',productWithComments);
    }

    async dinner(req,res,next){
        const productsWithPagination = await ProductsService.getProductsWithPagination("side-dishes",req.params.page);
        res.render('product_category/category',productsWithPagination);
    }

    async dinnerDetail(req,res,next){
        const productWithComments = await ProductsService.getProductCmtPage(req.params.slug,req.params.page);
        res.render('product_category/detail',productWithComments);
    }

    async drink(req,res,next){
        const productsWithPagination = await ProductsService.getProductsWithPagination("drink",req.params.page);
        res.render('product_category/category',productsWithPagination);
    }

    async drinkDetail(req,res,next){
        const productWithComments = await ProductsService.getProductCmtPage(req.params.slug,req.params.page);
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
        var cart;
        if(req.user)
        cart = await ProductsService.addCart(req.user.id,req.body.productId,req.body.productName,req.body.image,req.body.price,req.body.quantity);
        else
        cart = await ProductsService.addCart(req.session.unAuthID,req.body.productId,req.body.productName,req.body.image,req.body.price,req.body.quantity);
        res.redirect(`/product/${req.body.category}/`+req.params.slug)
    }

}
module.exports = new ProductsController;