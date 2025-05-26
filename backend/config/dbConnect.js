const mongoose = require("mongoose");
const dotenv=require("dotenv")
dotenv.config();

async function dbConnect() {
  
  try {
    await mongoose.connect(process.env.MONGODB_URL);
    console.log("Db Conected successfully");
  } catch (error) {
    console.log("error aa gaya while connecting db");
    console.log(error);
  }
}

module.exports = dbConnect;