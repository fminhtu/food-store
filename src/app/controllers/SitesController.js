const Menu = require('../models/Menu');
const userService = require('../service/userService');
const ProductsService = require('../service/productsService')
const sendMail = require('../../config/nodemailer');
const productsService = require('../service/productsService');
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
        if(req.user)
        ProductsService.unAuthToAuth(req.session.unAuthID,req.user.username)
        res.render('home', {user: req.user});    
    }

    forgetPassword(req,res, next){
        res.render('forgetpassword');    
    }

    async resetPassword(req,res,next){
        const {email} = req.body;
        const result = await userService.resetPass(email);
        if(result === false) return res.render('forgetpassword',{message: "Can't find your account. Try another one."})
        return res.redirect('/sign-in');
    }

    async cart(req,res,next){
        var tempUsername = req.session.unAuthID;
        var cart;
        if(req.user)   {
        cart = await ProductsService.getCart(req.user.username);
        }
        else
        cart = await ProductsService.getCart(tempUsername);
        if(cart[0]){
            const totalPrice =  ProductsService.totalPrice(cart[0].items)
            res.render('cart',{cart : cart[0].items,totalPrice})
        }
        else{
            res.render('cart',{cart,totalPrice: 0})
        }
    }

    async postCart(req,res,next){
        const {productId,name,product,quantity} = req.body;
        var updateQuantity;
        var removeItem;
        if(req.user){
        updateQuantity = await ProductsService.updateQuantity(req.user.username,product,quantity);
        removeItem = await ProductsService.removeItem(req.user.username,productId);
        }
        else{
            updateQuantity = await ProductsService.updateQuantity(req.session.unAuthID,product,quantity);
            removeItem = await ProductsService.removeItem(req.session.unAuthID,productId);
        }
        res.redirect('cart')
    }
    

    //get; sign in
    login(req,res){
        const error = req.flash('error');
        
        res.render('sign-in',{error});
    }

    async pay(req,res){
        const cart = await ProductsService.getCart(req.user.username);
        const totalPrice = await ProductsService.totalPrice(cart[0].items);
        res.render('pay',{user: req.user,cart: cart[0].items, totalPrice: totalPrice});
    }


    async postPay(req,res){
        const {name,email,phoneNumber,address} = req.body;
        await userService.pay(req.user.username,name,email,phoneNumber,address);
        return res.redirect('/user/history-order');
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