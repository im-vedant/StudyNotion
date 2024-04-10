const user = require("../models/userModel");
const mailSender = require("../utils/mailSender");
const bcrypt = require("bcrypt");
const crypto=require('crypto')
require('dotenv').config()
async function resetPasswordToken(req, res) {
  try {
    const email = req.body.email;
    const User = await user.findOne({ email: email });
    if (!User) {
      return res.status(402).json({
        success: false,
        message: "Email Id is not registered",
      });
    }
    const token = crypto.randomUUID();
    const updatedDetails = await user.findOneAndUpdate(
      { email: email },
      {
        resetPasswordToken: token,
        resetPasswordExpires: Date.now() + 10 * 60 * 1000,
      },
      { new: true }
    );
    const url = `${process.env.FRONTEND_URL}/update-password/${token}`;
    await mailSender(
      email,
      "Password Reset Link",
      `Password Reset Link :${url}`
    );
    return res.json({
      success: true,
      message:
        "Email sent successfully, please check your email and change password",
        token
    });
  } catch (err) {
    console.log(err.message)
    res.status(400).json({
      success: false,
      message: "Could not generate reset password link",
    });
  }
}

async function resetPassword(req, res) {
  try {
    const { password, confirmPassword, token } = req.body;
    if (password !== confirmPassword)
      return res.json({
        success: false,
        message: "Password and confirm password are not same",
      });
      const userDetails=await user.findOne({resetPasswordToken :token})
      if(!userDetails)
      return res.json({
        success: false,
        message: "Invalid token",
      });
      if(userDetails.resetPasswordExpires<Date.now())
      return res.json({
        success: false,
        message: "Url is expired",
      });
      const hashedPassword=await bcrypt.hash(password,10)
      userDetails.password=hashedPassword
      userDetails.resetPasswordExpires=undefined
      userDetails.resetPasswordToken=undefined
      await userDetails.save()
      return res.json({
        success: true,
        message: "Password is changed successfully",
      })

  } catch(err) {
    return res.json({
        success: false,
        message: "Could not reset Password",
      })
  }
}


module.exports={resetPassword,resetPasswordToken}