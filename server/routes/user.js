const express=require('express')
const router =express.Router()
const {login,signup,changePassword,sendOTP }=require('../controllers/auth')
const { resetPassword,resetPasswordToken}=require('../controllers/resetPassword')
const {auth}=require('../middlewares/auth')

router.post('/login',login)

router.post('/signup', signup)

router.post('/sendotp', sendOTP)

router.post('/changepassword', auth, changePassword)

router.post('/reset-password-token', resetPasswordToken)

router.post('/reset-password', resetPassword)

module.exports=router