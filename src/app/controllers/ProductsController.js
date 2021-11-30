const Menu = require('../models/Menu');
const { ToArrObject } = require('../../util/mongoose');
const { ToObject } = require('../../util/mongoose');



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
            let page = parseInt(req.query.page)||1;
            const perPage = 16;
            let totalPage = Math.floor(count/perPage) + 1;
            let start = (page-1)*perPage;
            let end;
            if (page==totalPage){
                end = count;
            }
            else{
                end = start + perPage;
            }
            let totalPageArr = [];
            for (let i=1;i<=totalPage;i++){
                totalPageArr.push({
                    value : i,
                    isCurrent: page === i
                });
            }              
            res.render('product_category/category',{
                item: ToArrObject(item).slice(start,end),
                totalPageArr
            })
        }
        )
        }
    }
    //get : product/category
    combo(req,res,next){
        Promise.all([Menu.find({category: "combo"}),Menu.count({category: "combo"})])
        .then(([item,count])=>{
            let page = parseInt(req.query.page)||1;
            const perPage = 16;
            let totalPage = Math.floor(count/perPage) + 1;
            let start = (page-1)*perPage;
            let end;
            if (page==totalPage){
                end = count;
            }
            else{
                end = start + perPage;
            }
            let totalPageArr = [];
            for (let i=1;i<=totalPage;i++){
                totalPageArr.push({
                    value : i,
                    isCurrent: page === i,
                    category: "/combo"
                });
            }              
            res.render('product_category/category',{
                item: ToArrObject(item).slice(start,end),
                totalPageArr
            })
        }
        )
    }

    comboDetail(req,res,next){
        Menu.findOne({slug: req.params.slug})
            .then(detail => res.render('product_category/detail',{ 
                detail : ToObject(detail)
            }))
            .catch(next);
    }

    pizza(req,res,next){
        Promise.all([Menu.find({category: "pizza"}),Menu.count({category: "pizza"})])
        .then(([item,count])=>{
            let page = parseInt(req.query.page)||1;
            const perPage = 16;
            let totalPage = Math.floor(count/perPage) + 1;
            let start = (page-1)*perPage;
            let end;
            if (page==totalPage){
                end = count;
            }
            else{
                end = start + perPage;
            }
            let totalPageArr = [];
            for (let i=1;i<=totalPage;i++){
                totalPageArr.push({
                    value : i,
                    isCurrent: page === i,
                    category: "/pizza"
                });
            }              
            res.render('product_category/category',{
                item: ToArrObject(item).slice(start,end),
                totalPageArr
            })
        }
        )
    }

    pizzaDetail(req,res,next){
        Menu.findOne({slug: req.params.slug})
            .then(detail => res.render('product_category/detail',{ 
                detail : ToObject(detail)
            }))
            .catch(next);
    }

    burger(req,res,next){
        Promise.all([Menu.find({category: "burger"}),Menu.count({category: "burger"})])
        .then(([item,count])=>{
            let page = parseInt(req.query.page)||1;
            const perPage = 16;
            let totalPage = Math.floor(count/perPage) + 1;
            let start = (page-1)*perPage;
            let end;
            if (page==totalPage){
                end = count;
            }
            else{
                end = start + perPage;
            }
            let totalPageArr = [];
            for (let i=1;i<=totalPage;i++){
                totalPageArr.push({
                    value : i,
                    isCurrent: page === i,
                    category: "/burger"
                });
            }              
            res.render('product_category/category',{
                item: ToArrObject(item).slice(start,end),
                totalPageArr
            })
        }
        )
    }

    burgerDetail(req,res,next){
        Menu.findOne({slug: req.params.slug})
            .then(detail => res.render('product_category/detail',{ 
                detail : ToObject(detail)
            }))
            .catch(next);
    }

    chicken(req,res,next){
        Promise.all([Menu.find({category: "chicken"}),Menu.count({category: "chicken"})])
        .then(([item,count])=>{
            let page = parseInt(req.query.page)||1;
            const perPage = 16;
            let totalPage = Math.floor(count/perPage) + 1;
            let start = (page-1)*perPage;
            let end;
            if (page==totalPage){
                end = count;
            }
            else{
                end = start + perPage;
            }
            let totalPageArr = [];
            for (let i=1;i<=totalPage;i++){
                totalPageArr.push({
                    value : i,
                    isCurrent: page === i,
                    category: "/chicken"
                });
            }              
            res.render('product_category/category',{
                item: ToArrObject(item).slice(start,end),
                totalPageArr
            })
        }
        )
    }

    chickenDetail(req,res,next){
        Menu.findOne({slug: req.params.slug})
            .then(detail => res.render('product_category/detail',{ 
                detail : ToObject(detail)
            }))
            .catch(next);
    }

    dinner(req,res,next){
        Promise.all([Menu.find({category: "side-dishes"}),Menu.count({category: "side-dishes"})])
        .then(([item,count])=>{
            let page = parseInt(req.query.page)||1;
            const perPage = 16;
            let totalPage = Math.floor(count/perPage) + 1;
            let start = (page-1)*perPage;
            let end;
            if (page==totalPage){
                end = count;
            }
            else{
                end = start + perPage;
            }
            let totalPageArr = [];
            for (let i=1;i<=totalPage;i++){
                totalPageArr.push({
                    value : i,
                    isCurrent: page === i,
                    category: "/side-dishes"
                });
            }              
            res.render('product_category/category',{
                item: ToArrObject(item).slice(start,end),
                totalPageArr
            })
        }
        )
    }

    dinnerDetail(req,res,next){
        Menu.findOne({slug: req.params.slug})
            .then(detail => res.render('product_category/detail',{ 
                detail : ToObject(detail)
            }))
            .catch(next);
    }

    drink(req,res,next){
        Promise.all([Menu.find({category: "drink"}),Menu.count({category: "drink"})])
        .then(([item,count])=>{
            let page = parseInt(req.query.page)||1;
            const perPage = 16;
            let totalPage = Math.floor(count/perPage) + 1;
            let start = (page-1)*perPage;
            let end;
            if (page==totalPage){
                end = count;
            }
            else{
                end = start + perPage;
            }
            let totalPageArr = [];
            for (let i=1;i<=totalPage;i++){
                totalPageArr.push({
                    value : i,
                    isCurrent: page === i,
                    category: "/drink"
                });
            }              
            res.render('product_category/category',{
                item: ToArrObject(item).slice(start,end),
                totalPageArr
            })
        }
        )
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