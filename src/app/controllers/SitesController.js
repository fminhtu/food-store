const Menu = require('../models/Menu');
const userService = require('../service/userService');
const ProductsService = require('../service/productsService')
function isEmpty(obj) {
    for(var prop in obj) {
        if(obj.hasOwnProperty(prop))
            return false;
    }
    return true;
}

class SitesController{

    //get//new
    home(req,res, next){
        res.render('home', {user: req.user});    
    }

    async cart(req,res,next){   
        if(!req.user){
            return res.redirect('/sign-in')
        }
        const cart = await ProductsService.getCart(req.user.id)
        const totalPrice = await ProductsService.totalPrice(cart);
        res.render('cart',{cart,totalPrice});
    }

    async postCart(req,res,next){
        const {productId,name,product,quantity} = req.body;
        const updateQuantity = await ProductsService.updateQuantity(req.user.id,product,quantity);
        const removeItem = await ProductsService.removeItem(req.user.id,productId);
        res.redirect('cart')
    }
    

    //get; sign in
    login(req,res){
        const error = req.flash('error');
        res.render('sign-in',{error});
    }

    async pay(req,res){
        const cart = await ProductsService.getCart(req.user.id)
        const totalPrice = await ProductsService.totalPrice(cart);
        res.render('pay',{user: req.user,cart: cart, totalPrice: totalPrice});
    }

    logout(req,res){
        req.logout();
        res.redirect('/')
    }

    //get: sign up
    up(req,res){
    res.render('sign-up');
    }

    async submit(req,res){
        const {name,username,password,email,date,phoneNumber,role} = req.body;
        const error = await userService.checkValidInput(name,username,password,email,date,phoneNumber,role);
        if(!isEmpty(error)) {
            res.render('sign-up',{error})
        }
        else{
        const user = await userService.register(name,username,password,email,phoneNumber,date,role);
        res.redirect("/sign-in");
        }
    }
    
    //get : create
    create(req,res,next){
        res.render('create');
    }

    // //post : store
    store(req,res,next){
        const newItem = req.body;
        newItem.slug = `food-${req.body.id}`;
        newItem.rating = 0.0;
        newItem.num_rating=0;
        const menu = new Menu(newItem);
        menu.save();
        res.render('saved');
    }
    
  
}

function isEmpty(obj) {
    for (var prop in obj) {
        if (obj.hasOwnProperty(prop))
            return false;
    }

    return true;
}

module.exports = new SitesController;