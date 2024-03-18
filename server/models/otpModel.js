const mongoose = require("mongoose");
const mailSender = require("../utils/mailSender");
const otpTemplate=require('../mail_templates/emailVerification')
const otpSchema = new mongoose.Schema({
  email: {
    type: String,
    required: true,
  },
  otp: {
    type: String,
    required: true,
  },
  createdAt: {
    type: Date,
    default : Date.now(),
    expires : 1000*60*5*100000
  }
});
async function sendVerificationEmail(email,otp)
{
    try{
      const body=otpTemplate(otp)
        const mailResponse= await mailSender(email,"Verification Mail from StudyNotion",body )
    }
    catch(err)
    {
        console.log("error occured while sending mail")
        console.log(err.message)
    }
}
otpSchema.pre("save", async function(next){
    await sendVerificationEmail(this.email, this.otp)
    next()
})

module.exports = mongoose.model("otp", otpSchema);
