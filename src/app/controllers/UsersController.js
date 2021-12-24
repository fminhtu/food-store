const Menu = require('../models/Menu');
const userService = require('../service/userService');
const User = require('../models/User');

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
    
    updateAccount(req,res,next){
        res.render("UserAccount/update");
    }

    async storeUpdate(req,res,next){
        const username = req.session.passport.user.username;
        let userInfo = await User.findOne({username:username}).lean();

        userInfo.name = req.body.name;
        req.session.passport.user.name = req.body.name;

        userInfo.dateOfBirth = req.body.dateOfBirth;
        req.session.passport.user.dateOfBirth = req.body.dateOfBirth;

        userInfo.phoneNumber = req.body.phoneNumber;
        req.session.passport.user.phoneNumber = req.body.phoneNumber;

        userInfo.image = req.body.image;
        req.session.passport.user.image = req.body.image;

        User.updateOne({username:username},userInfo)
            .then(()=>res.redirect('/user/account'))
            .catch(next);
    }
    historyOrder(req,res,next){
        res.render("UserAccount/historyOrder");
    }



}
module.exports = new UsersController;