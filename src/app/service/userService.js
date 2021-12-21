const User = require('../models/User');
const bcrypt = require('bcrypt');
const randomstring = require("randomstring");
const nodemailer = require('../../config/nodemailer')

exports.findByUsername = (username) => {
    return User.findOne({
        username: username
    }).lean();
}

exports.validPassword = async function (password,user){
   return bcrypt.compare(password,user.password);
}


exports.checkValidInput = async (fullname, username,password, email, date,phoneNumber,role) => {
    const error = {}
    const emailCheck = await User.findOne({
        email: email
    }).lean();
    const usernameCheck = await User.findOne({
        username: username
    }).lean();
    if(email === "") {
        error.emailCheck = "Email is required.";
    }
    else if(emailCheck){
        error.emailCheck = "Email is existed."
    }

    if(username === "") {
        error.usernameCheck = "Username is required.";
    }
    else if(usernameCheck){
        error.usernameCheck = "Username is existed."
    }

    return error
}

exports.register = async (name,username,password,email,phoneNumber,dateOfBirth,role) => {
    const pwdHashed = await bcrypt.hash(password,10);
    const activationString = randomstring.generate();
    await User.create({
        name : name,
        username : username,
        password : pwdHashed,
        email: email,
        dateOfBirth: dateOfBirth,
        phoneNumber: phoneNumber,
        image: "https://play-lh.googleusercontent.com/9lWRV--bbBVqN79jCoi7vBbXGirjbFe2RSDaZMfMmPp48s9zeMAb7oICWHmLVEyNCQ=s180-rw",
        role: role,
        status: "unactivated",
        activationString: activationString,
        ban:"false"
    });
    const option = {
        from: process.env.SENDERUSERNAME,
        to: email,
        subject: "VERIFY YOUR ACCOUNT NOW!!!",
        html: `<h1>Thank for supporting us</h1>
            <p>Please activate your account
            <a href="${process.env.DOMAIN_NAME}/user/activate?email=${email}&activation-string=${activationString}"> Activate now </a>
            </p>
        `
    }
    nodemailer.transporter.sendMail(option,function(err,info){
        if(err){
            console.log(err);
            return;
        }
        console.log("Sent " + info);
    });
}

exports.activate = async(email, activationString) =>{
    const user = await User.findOne({email, activationString}).lean();
    if(!user){
        return false;
    }
    await User.updateOne({
        email,activationString
    },{
        $set: {
            status:"activated"
        }
    });
    return true;
};

