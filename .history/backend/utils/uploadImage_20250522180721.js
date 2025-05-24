const cloudinaryConfig = require("../config/cloudinaryConfig");

const cloudinary = require("cloudinary").v2;

async function uploadImage(imagePath) {
  try {
cloudinaryConfig();
    const result = await cloudinary.uploader.upload(imagePath, {
      folder: "Blog app",
    //   format: "auto",
    });
return result;
} catch (error) {}
}

module.exports = uploadImage;
