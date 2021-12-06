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
    done(null, user.username);
  });
  
  passport.deserializeUser(async function(username, done) {
    const user = await userService.findByUsername(username);
   done(null,user);
  });

module.exports = passport;