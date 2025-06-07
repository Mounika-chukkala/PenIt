const nodemailer=require("nodemailer")
const dotenv=require("dotenv")
dotenv.config();
const transporter=nodemailer.createTransport({
      host: "smtp.gmail.com",
  port: 465,
  secure: true, // true for 465, false for other ports
  auth: {
    user: process.env.TRANSPORTER_USER,
  
    pass: process.env.TRANSPORTER_PASS,
  },

})

module.exports=transporter