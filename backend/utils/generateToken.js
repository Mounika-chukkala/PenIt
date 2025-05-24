const jwt = require("jsonwebtoken");
// const { secret } = require("../config/dotenv.config");
// require("dotenv").config();

const secret="qwertypoiuasdfglkjhzxcvmnb"
async function generateJWT(payload) {
  let token = await jwt.sign(payload, secret);
  return token;
}

async function verifyJWT(token) {
  try {
    let data = await jwt.verify(token, secret);
    return data;
  } catch (err) {
    return false;
  }
}

async function decodeJWT(token) {
  let decoded = await jwt.decode(token);
  return decoded;
}

module.exports = { generateJWT, verifyJWT, decodeJWT };