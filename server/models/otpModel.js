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
    type: Date
  }
});
otpSchema.index({ createdAt: 1 }, { expireAfterSeconds: 300 });
async function sendVerificationEmail(email,otp)
{
    try{
      const body=otpTemplate(otp)
        const mailResponse= await mailSender(email,"Verification Mail from StudyNotion",body )
        console.log("Verification mail sent")
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
