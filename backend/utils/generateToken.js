const jwt = require("jsonwebtoken");
const { JWT_SECRET } = require("../config/dotenv.config");
const secret=JWT_SECRET
async function generateJWT(payload) {
  let token = await jwt.sign(payload, secret  );
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
  const currentTime=Date.now()/1000;
  return decoded;
    // decoded.exp>currentTime};

  //   if (!token) return { decoded: null, isValid: false };

  // const decoded = jwt.decode(token);
  // const currentTime = Date.now() / 1000; // in seconds
  // return {
  //   decoded,
  //   isValid: decoded.exp > currentTime,
  // };

}

module.exports = { generateJWT, verifyJWT, decodeJWT };