const nodemailer = require('nodemailer')
require('dotenv').config()
const mailSender=async (email,title, body)=>{
    try{
        const transporter = nodemailer.createTransport({
            host: "smtp.gmail.com",
            port: 587,
            secure : false,
            auth: {
              user: 'studynotion.official@gmail.com',
              pass: 'qsgh lsdq lwzz iqhc',
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