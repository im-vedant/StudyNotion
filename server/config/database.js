const mongoose=require('mongoose')
require('dotenv').config()
async function dbConnect(){
    mongoose.connect(process.env.DATABASE_URL).then(()=>console.log("Database connected successfully"))
    .catch((err)=>{
        console.log("DB connection failed")
        console.log(err)
        process.exit(1)
    })
}
module.exports={dbConnect}