const nodemailer = require("nodemailer");

exports.transporter = nodemailer.createTransport({
    service:"gmail",
    auth:{
        user: process.env.SENDERUSERNAME,
        pass: process.env.SENDERPASS
    }
});
