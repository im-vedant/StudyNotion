const mongoose=require('mongoose')
const userschema=new mongoose.Schema({
    firstName :{
        type : String,
        required : true,
        trim : true
    },
    lastName :{
        type : String,
        required : true,
        trim : true
    },
    email: {
        type: String,
        trim : true,
        required : [true,"Please provide your email"]
    },
    password :{
        type :String,
        required : true,
        minLength: 8,
    },
    accountType:{
        type:String,
        enum :["admin", "student","instructor"],
        required : true
    },
    courses:[{
        type : mongoose.Schema.Types.ObjectId,
        ref :"course"
    }],
    additionalDetails: {
        type : mongoose.Schema.Types.ObjectId,
        ref : "profile",
        required : true
    },
    image :{
        type : String,
        required : true
    },
    courseProgress :[
        {
        type : mongoose.Schema.Types.ObjectId,
        ref : "courseProgress"
        }
    ],
    resetPasswordToken:{
        type: String,
    },
    resetPasswordExpires:{
        type : Date
    },
})
module.exports=mongoose.model("user",userschema)