const Menu = require('../models/Menu');
const userService = require('../service/userService');

class UsersController{
    viewAccount(req,res,next){
        res.render("UserAccount/profile")
    }
}
module.exports = new UsersController;