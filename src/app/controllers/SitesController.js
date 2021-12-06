const Menu = require('../models/Menu');
const userService = require('../service/userService');

class SitesController{

    //get//new
    home(req,res, next){
        res.render('home', {user: req.user});    
    }
    

    //get; sign in
    login(req,res){
        const wrongPass = req.query['wrong-password'] !== undefined;
        res.render('sign-in',{wrongPass});
    }

    logout(req,res){
        req.logout();
        res.redirect('/')
    }

    //get: sign up
    up(req,res){
    res.render('sign-up');
    }

    submit(req,res){
        const {name,username,password,email,date,phoneNumber,role} = req.body;
        const user = userService.register(name,username,password,email,phoneNumber,date,role);
        res.redirect("/sign-in");
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
module.exports = new SitesController;