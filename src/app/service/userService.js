const User = require('../models/User');

exports.findByUsername = (username) => {
    return User.findOne({
        username: username
    }).lean();
}

exports.validPassword = (password,user) =>{
    return user.password === password;
}
