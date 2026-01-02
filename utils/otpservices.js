const crypto = require("crypto")
require("dotenv").config()
const otpmap = new Map();
const OTP_EXPIRY_TIME = 2*60*1000;

const generateOtp= (email)=>{
    const number = crypto.randomInt(100000,999999)
   const otp = String(number).padStart(6,"0")
   const expiry = Date.now()+OTP_EXPIRY_TIME
   otpmap.set(email ,{otp,expiry})

   setTimeout(()=>{
      const otpEntry = otpmap.get(email)
      if(otpEntry)otpmap.delete(email)
        
   }, OTP_EXPIRY_TIME  )
   return otp;
}
module.exports = {generateOtp}