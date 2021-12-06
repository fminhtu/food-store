const User = require('../models/User');
const bcrypt = require('bcrypt');

exports.findByUsername = (username) => {
    return User.findOne({
        username: username
    }).lean();
}

exports.validPassword = async function (password,user){
   return bcrypt.compare(password,user.password);
}

exports.register = async (name,username,password,email,phoneNumber,dateOfBirth,role) => {
    const pwdHashed = await bcrypt.hash(password,10);
    return User.create({
        name : name,
        username : username,
        password : pwdHashed,
        email: email,
       dateOfBirth: dateOfBirth,
        phoneNumber: phoneNumber,
        image: "http://assets.stickpng.com/images/585e4bf3cb11b227491c339a.png",
        role: role
    });
}
