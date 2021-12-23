const Menu = require('../models/Menu');
const userService = require('../service/userService');

class UsersController{
    viewAccount(req,res,next){
        res.render("UserAccount/profile")
    }

    async activate(req,res,next){
        const {email} = req.query;
        const activationString = req.query['activation-string'];
        const result = await userService.activate(email,activationString);
        if(result){
            res.render("UserAccount/activate",{
                message: result,
            })
        }
    }

    changePassword(req,res,next){
        res.render("UserAccount/changepass")
    }

    async resetPassword(req,res,next){
        const {email} = req.query;
        const {password, confirmPassword} = req.body;
        if(password !== confirmPassword){
            return res.render("UserAccount/changepass",{message : true});
        }
        const result = await userService.reset(email,confirmPassword);
        return res.redirect('/sign-in')
    }
    
    historyOrder(req,res,next){
        res.render("UserAccount/historyOrder");
    }



}
module.exports = new UsersController;