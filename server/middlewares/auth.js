const jwt=require('jsonwebtoken')
require('dotenv').config()
const user=require('../models/userModel')
async  function auth(req,res, next)
{
    try{
        const token= req.header("Authorization").replace("Bearer ", "")
        console.log(token)
        if(!token)
        {
            return res.status(401).json({
                success : false,
                message: "Token is missing"
            })
        }
        try{
            console.log("afgjagjla")
            const decoded=jwt.verify(token,process.env.JWT_SECRET)
            console.log(decoded)
            req.user=decoded
        }
        catch(err)
        {
            return res.status(401).json({
                success : false,
                message : "Token is invalid"
            })
        }
        next();

    }
    catch(err)
    {
        return res.status(401).json({
            success : false,
            message : "Something went wrong while validating the token"
        })
    }
}

async function isStudent(req,res,next)
{
    try{
        if(req.user.accountType!=="student")
        {
            return res.status(401).json({
                success : false,
                message: "This is a protected route for students only"
            })
        }
        next()
    }
    catch(err)
    {
        return res.status(401).json({
            success : false,
            message : "User role cannot be verified"
        })
    }
}
async function isInstructor(req,res,next)
{
    try{
        if(req.user.accountType!=="instructor")
        {
            return res.status(401).json({
                success : false,
                message: "This is a protected route for instructor only"
            })
        }
        next()
    }
    catch(err)
    {
        return res.status(401).json({
            success : false,
            message : "User role cannot be verified"
        })
    }
}
async function isAdmin(req,res,next)
{
    try{
        if(req.user.accountType!=="admin")
        {
            return res.status(401).json({
                success : false,
                message: "This is a protected route for admin only"
            })
        }
        next()
    }
    catch(err)
    {
        return res.status(401).json({
            success : false,
            message : "User role cannot be verified"
        })
    }
}

module.exports={isAdmin,isInstructor,isStudent,auth}