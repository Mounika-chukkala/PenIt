const cloudinary = require("cloudinary").v2;

async function uploadImage(imagePath) {
  try {
    cloudinary.config({
      cloud_name: "dozs80pld",
      api_key: "614995996113529",
      api_secret: "IH7_zbONlN-j2EFz833tQuz5blI", // Click 'View API Keys' above to copy your API secret
    });

    const result = await cloudinary.uploader.upload(imagePath, {
      folder: "Blog app",
      format: "auto",
    });
    console.log(result);
  } catch (error) {}
}

module.exports = uploadImage;
