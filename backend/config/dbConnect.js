const mongoose = require("mongoose");
const dotenv=require("dotenv");
const { DB_URL } = require("./dotenv.config");
dotenv.config();

async function dbConnect() {
  
  try {
    await mongoose.connect(DB_URL);
    console.log("Db Conected successfully");
  } catch (error) {
    console.log("error aa gaya while connecting db");
    console.log(error);
  }
}

module.exports = dbConnect;