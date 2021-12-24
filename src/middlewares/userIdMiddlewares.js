const randomstring = require("randomstring");

module.exports = (req,res,next) =>{
    if(!req.session.unAuthID){
        req.session.unAuthID = randomstring.generate();
    }
        next();
}