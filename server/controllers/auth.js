let user=require('../models/userModel')
let OTP=require('../models/otpModel')
let otpGenerator=require('otp-generator')
const bcrypt =require('bcrypt')
const profile=require('../models/profileModel')
const jwt=require('jsonwebtoken')
const mailSender=require('../utils/mailSender')
require('dotenv').config()
async function signup(req,res)
{
    try{
       let {firstName,lastName,email,password,confirmPassword,accountType,otp } =req.body
       console.log('signup',req.body)
       if(!firstName ||!lastName|| !email||!password||!confirmPassword )
       {
        return res.status(403).json({
            success : false,
            message : "All fields are required"
        })
       }
       if(password !=confirmPassword)
       {
        return res.status(400).json({
            success : false,
            message : "Password and confirm password does not match, please try again"
        })
       }
       let existingUser=await user.findOne({email : email})
       if(existingUser)
       {
        return res.status(400).json({
            success : false,
            message : "User is already registered"
        })
       }
       let recentOTP=await OTP.find({email : email}).sort({createdAt : -1}).limit(1)
       if(recentOTP.length===0)
       {
        return res.status(400).json({
            success : false,
            message : "OTP not found"
        })
       }
       else if(otp!==recentOTP[0].otp)
       {
        return res.status(400).json({
            success : false,
            message : "Invalid OTP"
        })
       }
       const hashedPassword=await bcrypt.hash(password,10)
       const Profile=await profile.create({
        gender : null,
        dateOfBirth: null,
        about : null,
        contactNumber : null,
        countryCode : null
       })
       const image = `https://api.dicebear.com/5.x/initials/svg?seed=${firstName} ${lastName}`
       const userDetail=await user.create({firstName,lastName,email,password: hashedPassword,accountType,additionalDetails : Profile._id, image: image})
       return res.status(200).json({
        success : true,
        message : "User is registered",
        userDetail
    })
    }
    catch(err)
    {
        console.log(err.message)
        res.status(500).json({
            success : false,
            message : "user cannot be registered, please try again"
               })
    }

}
async function login(req,res)
{
    try{
        let {email,password,accountType} =req.body
        if( !email||!password )
        {
         return res.status(403).json({
             success : false,
             message : "All fields are required"
         })
        }
        const existingUser=await user.findOne({email : email}).populate("additionalDetails").exec()
        if(!existingUser)
        {
         return res.status(400).json({
             success : false,
             message : "User is not registered, please signup first"
         })
        }
       if(await bcrypt.compare(password, existingUser.password))
       {
        const payload={
            email : existingUser.email,
            id: existingUser._id,
            accountType : existingUser.accountType
        }
        const token=jwt.sign(payload,process.env.JWT_SECRET,{expiresIn :"24h"})
        existingUser.token=token
        const options={
            expires : new Date(Date.now()+24*60*60*1000),
            httpOnly : true
        }
        res.cookie("token", token, options).status(200).json({
            success : true,
            token,
            user : existingUser,
            message : "logged in successfully"
        })

       }
       else{
        return res.status(401).json({
            success : false,
            message :"Wrong password"
        })
       }
    }
     catch(err)
     {
         console.log(err.message)
         res.status(500).json({
             success : false,
             message : "user cannot be logged in, please try again"
                })
     }
}
async function changePassword(req,res)
{
    try {
        console.log(req.body)
        let {email,oldPassword,newPassword}=req.body
        let userDetails=await user.findOne({email : email})
        if(!userDetails)
        {
            return res.status(400).json({
                success : false,
                message : "User not found"
            })
        }
        if(await bcrypt.compare(oldPassword,userDetails.password))
        {
            const hashedPassword=await bcrypt.hash(newPassword,10)
            const updatedData=await user.findOneAndUpdate({email : email}, {password : hashedPassword})
            mailSender(email,"Password Changed","Your password is changed successfully")
            return res.status(200).json({
                success : true,
                message : "Password changed successfully"
            })
        }

    } catch (error) {
        res.status(500).json({
            success : false,
            message : error.message
        })
    }
}
async function sendOTP(req,res){
try{
    const {email}=req.body
    let userData = await user.findOne({ email: email });
    if(userData){
      return   res.status(401).json({
        success : false,
        message: "User already registered"
        })
    }
    var otp=otpGenerator.generate(6,{
        upperCaseAlphabets : false,
        lowerCaseAlphabets :false,
        specialChars: false
    })
    console.log("OTP generated", otp)
    const result=await OTP.findOne({otp : otp})
    while(result)
    {
        otp=otpGenerator.generate(6,{
            upperCaseAlphabets : false,
            lowerCaseAlphabets :false,
            specialChars: false
        })
        result=await OTP.findOne({otp : otp})
    }
    const otpPayload={email,otp}
    let otpBody=await OTP.create(otpPayload)
    console.log(otpBody)
    res.status(200).json({
        success : true,
        message : "OTP sent successfully",
        otp
    })
}
catch(err)
{
    res.status(500).json({
        success : false,
        message : err.message
    })
}
    
    
}

module.exports={sendOTP,changePassword,login,signup}