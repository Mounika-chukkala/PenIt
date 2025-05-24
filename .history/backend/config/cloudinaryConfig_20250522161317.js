const cloudinary=require("cloudinary").v2;

async function cloudinaryConfig(){
 try {
    console.log("hi")
         cloudinary.config({ 
        cloud_name: 'dozs80pld', 
        api_key: '614995996113529', 
        api_secret: 'IH7_zbONlN-j2EFz833tQuz5blI' // Click 'View API Keys' above to copy your API secret
    });
console.log("cloudinary configuration Successfull")
 } catch (error) {
    console.log("Bro there is an error while configuring cloudinary");
    console.log(error.message)
 }
 
}

module.exports=cloudinaryConfig
