const cloudinary = require('cloudinary').v2;
 async function deleteImage(url,resourceType='image') {
    try {
      if(url.includes("unplash"))
      return ;
      // Extract public ID from image URL
      const publicId = "studynotion/"+url.split('/').pop().split('.')[0];
      console.log(publicId)
  
      // Delete the image from Cloudinary
      const result = await cloudinary.uploader.destroy(publicId,{resource_type : resourceType});
  
      console.log("Image deleted successfully:", result);
    } catch (error) {
      console.error("Error deleting image:", error);
    }
  }

  module.exports={deleteImage}