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
}
module.exports = new UsersController;