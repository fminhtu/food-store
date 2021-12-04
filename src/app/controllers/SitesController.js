const Menu = require('../models/Menu');

class SitesController{

    //get//new
    home(req,res, next){
        res.render('home', {user: req.user});    
    }
    

    //get; sign in
    in(req,res){
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