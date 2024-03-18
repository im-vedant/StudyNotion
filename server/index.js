const express=require('express')
const app=express()
const userRoutes=require('./routes/user')
const profileRoutes=require('./routes/profile')
const courseRoutes=require('./routes/course')
const paymentRoutes=require('./routes/payment')
const {dbConnect}=require('./config/database')
const {CloudinaryConnect}=require('./config/cloudinary')
const cookie_parser=require('cookie-parser')
const cors=require('cors')
const fileUpload=require('express-fileupload')
const {  verifyPayment } = require('./controllers/payments')
require('dotenv').config()
const stripe = require('stripe')('sk_test_51OPrXESACUyWX7X2ZQJ3rgsVzTTXHZwfE4O9C3bIpi2LmQCmPKvdEHToP94Rj6mkweMiuhLZVXONYAy6IXzAKJnD00tQhq6EY9');
const PORT=process.env.PORT || 4000
dbConnect()

app.use((req, res, next) => {
    if (req.originalUrl === '/webhook') {
      next(); // Do nothing with the body because I need it in a raw state.
    } else {
      express.json()(req, res, next);  // ONLY do express.json() if the received request is NOT a WebHook from Stripe.
    }
  });
  
app.use(cookie_parser())
app.use(cors())
app.use(fileUpload({useTempFiles : true, tempFileDir:'/tmp'}))

CloudinaryConnect()
app.use('/api/v1/auth',userRoutes)
app.use('/api/v1/profile',profileRoutes)
app.use('/api/v1/course',courseRoutes)
app.use('/api/v1/payment',paymentRoutes)

app.post('/webhook', express.raw({type: 'application/json'}), verifyPayment)
app.get('/',(req,res)=>{
    res.json({
        success : true,
        message : " Your server is up and running..."
    })
})

app.listen(PORT, ()=>{
    console.log(`app is running at port ${PORT}`)
})
