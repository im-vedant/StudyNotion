const nodemailer = require('nodemailer')
require('dotenv').config()
const mailSender=async (email,title, body)=>{
    try{
        const transporter = nodemailer.createTransport({
            host: process.env.MAIL_HOST,
            port: 587,
            secure : false,
            auth: {
              user: process.env.MAIL_USER,
              pass: process.env.MAIL_PASS,
              tls: {rejectUnauthorized: false},
            },
          })
          const info = await transporter.sendMail({
            from:"StudyNotion" , // sender address
            to: `${email}`, // list of receivers
            subject:`${title}` , // Subject line
            html: `${body}`, // plain text body
          });
    }
    catch(err)
    {
        console.log(err.message)
    }
}
module.exports=mailSender