const nodemailer=require("nodemailer")
const transporter=nodemailer.createTransport({
      host: "smtp.gmail.com",
  port: 465,
  secure: true, // true for 465, false for other ports
  auth: {
    user: "mounikach178@gmail.com",
    pass: "naev bbmn klea pert",
  },

})

module.exports=transporter