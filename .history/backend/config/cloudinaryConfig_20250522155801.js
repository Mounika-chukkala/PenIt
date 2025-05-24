const cloudinary=require("cloudinary").v2;

async function cloudinaryConfig(){
 try {
        await cloudinary.config({ 
        cloud_name: 'dozs80pld', 
        api_key: '614995996113529', 
        api_secret: 'IH7_zbONlN-j2EFz833tQuz5blI' // Click 'View API Keys' above to copy your API secret
    });

 } catch (error) {
    console.log("Bro there was an error");
    console.log(error.message)
 }
 
}
