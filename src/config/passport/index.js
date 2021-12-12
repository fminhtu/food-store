var passport = require('passport')
  , LocalStrategy = require('passport-local').Strategy;
const userService = require('../../app/service/userService');

passport.use(new LocalStrategy(
  async function(username, password, done) {
    const user = await userService.findByUsername(username);
    if(!user){
         return done(null,false,{message: "Incorrect username"});
    }
    const valid = await userService.validPassword(password,user);
    if(!valid){
        return done(null,false,{message: "Incorrect password"});
    }
    return done(null,user);
},
));

passport.serializeUser(function(user, done) {
    done(null, {id:user._id, name:user.name,username: user.username, email:user.email,phoneNumber:user.phoneNumber,dateOfBirth:user.dateOfBirth,image:user.image,role:user.role});
});
  
passport.deserializeUser(async function(user, done) {
  done(null,user);
});

module.exports = passport;