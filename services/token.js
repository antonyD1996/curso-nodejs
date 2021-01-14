import crypto from "crypto";
import jwt from "jsonwebtoken";

const tokenSecret = "q6hE6NIiy5hUhg3pGcw";
const delimiter = "||";

const seconds = 1000 * 60;
const minute = seconds * 60;
const maxAgeMinutes = 120 * minute;

export const newToken = (key) => {
  const hash = crypto.createHmac("sha256", tokenSecret);
  const timeStamp = Date.now().toString();
  const toHmac = key + timeStamp;

  const sha = hash.update(toHmac).digest("hex");
  const toEncode = sha + delimiter + key + delimiter + timeStamp;

  return Buffer.from(toEncode).toString("base64");
};

export const verify = (token) => {
  const decoded = Buffer.from(token, "base64").toString();
  console.log(decoded);
  const [hash, key, timeStamp] = decoded.split(delimiter);

  const date = new Date(timeStamp * 1000);
  console.log(date.getUTCHours());

  const date_now = Date.now();
  const date_timeStamp = new Date(date_now);

  date.getUTCHours += 2;

  if (date < date_timeStamp) {
    return { valid: false, key: null };
  }
  const toCompare = crypto
    .createHmac("sha256", tokenSecret)
    .update(key + timeStamp)
    .digest("hex");
  const valid = toCompare == hash;
  return { valid, key };
};

export const newAuthToken = (userId) => {
  const auth = jwt.sign({role:'auth', userId}, tokenSecret, { expiresIn: "1h" });
  const refresh = jwt.sign({role:'refresh', userId}, tokenSecret, {expiresIn:"7d"});
  
  return {auth, refresh}
};

export const verifyAuthToken = token=>{
    try{
        const decoded = jwt.verify(token, tokenSecret)
        return {error:null, decoded:decoded}
    }catch(err){
        return {error:err, decoded:null}
    }
}
