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
        image: "https://play-lh.googleusercontent.com/9lWRV--bbBVqN79jCoi7vBbXGirjbFe2RSDaZMfMmPp48s9zeMAb7oICWHmLVEyNCQ=s180-rw",
        role: role
    });
}
