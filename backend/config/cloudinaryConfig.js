const cloudinary=require("cloudinary").v2;
const dotenv=require("dotenv")
dotenv.config();


async function cloudinaryConfig(){
    
 try {
         cloudinary.config({ 
        cloud_name:process.env.CLOUD_NAME, 
        api_key: process.env.CLOUD_API_KEY, 
        api_secret:process.env.CLOUD_API_SECRET
    });
console.log("cloudinary configuration Successfull")
 } catch (error) {
    console.log("Bro there is an error while configuring cloudinary");
    console.log(error.message)
 }
 
}

module.exports=cloudinaryConfig
