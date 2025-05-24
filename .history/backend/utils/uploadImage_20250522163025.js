const cloudinary=require("cloudinary").v2;

async function uploadImage(imagePath){
const result=await cloudinary.uploader.upload(imagePath,{
    folder:"Blog app",
    format:"auto"
})
console.log(result)
}

module.exports=uploadImage