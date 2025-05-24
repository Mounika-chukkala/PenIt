const mongoose = require("mongoose");
async function dbConnect() {
  try {
    await mongoose.connect("mongodb://localhost:27017");
    console.log("Db Conected successfully");
  } catch (error) {
    console.log("error aa gaya while connecting db");
    console.log(error);
  }
}

module.exports = dbConnect;