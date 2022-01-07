const User = require('../models/User');
const Cart = require('../models/Cart');
const Order = require('../models/Order');
const bcrypt = require('bcrypt');
const randomstring = require("randomstring");
const nodemailer = require('../../config/nodemailer')
var mongoose = require('mongoose');
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

exports.resetPass = async(email)=>{
    const user = await User.findOne({email}).lean();
    if(!user) return false;
    const option = {
        from: process.env.SENDERUSERNAME,
        to: email,
        subject: "RESET PASSWORD",
        html: `<h1>Have an issue with your account?</h1>
            <p>Wanna reset your password?
            <a href="${process.env.DOMAIN_NAME}/user/change-pass?email=${user.email}"> Click here </a>
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

exports.checkPassword = async(password, confirm) =>{
    if(password === confirm) return true;
    return false;
};

exports.reset = async(email,password) => {
    const pwdHashed = await bcrypt.hash(password,10);
    const user = await User.findOne({email}).lean();
    if(!user){
        return false;
    }
    await User.updateOne({
        email
    },{
        $set: {
            password: pwdHashed
        }
    });
    return true;
}

exports.pay = async(username,fullname, email, phoneNumber, address) => {
    var today = new Date().getTime();
    var item = await Order.findOne().sort('-orderId');
    mongoose.model('cart').findOne({ username: username }, function(err, result) {

        let swap = new (mongoose.model('order'))(result.toJSON()) //or result.toObject
        /* you could set a new id
        swap._id = mongoose.Types.ObjectId()
        swap.isNew = true
        */
       swap.orderId = item.orderId + 1;
       swap.fullname = fullname;
       swap.email = email;
       swap.phoneNumber = phoneNumber;
       swap.address = address;
       swap.date = today;
       swap.status = false;
        result.remove()
        swap.save() 
    })
}

exports.history = async(username) =>{
    return Order.find({
        username: username
    }).lean();
}

exports.changePassword = async(username,oldpassword,password,confirmPassword) =>{
    const user = await this.findByUsername(username);
    const check = await this.validPassword(oldpassword,user);
    if(check === false) return "Wrong old password."
    if(password !== confirmPassword) return "Wrong confirm password."
    await this.reset(user.email,confirmPassword);
    return "Success"
}
