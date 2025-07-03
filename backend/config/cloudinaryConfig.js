const cloudinary=require("cloudinary").v2;
// const dotenv=require("dotenv");
const { CLOUD_NAME, CLOUD_API_KEY, CLOUD_API_SECRET } = require("./dotenv.config");
// dotenv.config();


async function cloudinaryConfig(){
    
 try {
         cloudinary.config({ 
        cloud_name:CLOUD_NAME, 
        api_key: CLOUD_API_KEY, 
        api_secret:CLOUD_API_SECRET
    });
console.log("cloudinary configuration Successfull")
 } catch (error) {
    console.log("Bro there is an error while configuring cloudinary");
    console.log(error.message)
 }
 
}

module.exports=cloudinaryConfig
