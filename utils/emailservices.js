const nodemailer = require("nodemailer")
require("dotenv").config()
    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS
      }
  })

   const sendEmail = async(resp,statuscode,email,otp )=>{
    try{
      const mailOptions = {
      from: process.env.EMAIL_USER,
      to: email,
      subject: "Email Verification required for login",
      text: `Your one time password (OTP) is: ${otp}`,
    }

  const info = await transporter.sendMail(mailOptions)
    console.log("OTP Email Sent Successfully" + info)
    resp.status(statuscode).send({ message:"Otp sent to your email!"}  )

    }
    
    catch (error) {
      console.log(error)
   resp.status(500).send({message:"Internal Server Error , OTP Not Sent"  }  )
   }

  }
 


    module.exports = sendEmail

   


 


