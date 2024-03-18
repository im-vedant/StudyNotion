const cloudinary =require('cloudinary').v2
// Set up Cloudinary
require('dotenv').config()
function CloudinaryConnect(){
    try{
        console.log("cloudinary")
        cloudinary.config({ 
            cloud_name: process.env.CLOUD_NAME, 
            api_key: process.env.API_KEY, 
            api_secret:process.env.API_SECRET,
            secure: true 
          });

    }
    catch(err)
    {
        console.log(err)
    }
}
module.exports={CloudinaryConnect}