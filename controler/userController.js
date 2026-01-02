        const User = require("../modules/user");
       const disposableEmailDomains = require("disposable-email-domains");
        const bcrypt = require("bcrypt")
        const sendEmail = require("../utils/emailservices")
        const {generateOtp}  = require("../utils/otpservices")
        
        const loginUser = async (req, resp) => {
       try{
         const {email, password} = req.body;

        if (!email || !password) {
            resp.status(400).send({ message: "Invaild Email and Password required " });
            return;
        }

        if (typeof email !== "string" || typeof password !== "string") {
            resp.status(400).send("Invail email and password");
            return;
        }
       
      //   const existingUser = await User.findOne({ email });
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;
        if(!emailRegex.test(email) ){
          resp.status(400).send({message:"Invaild Email and Password"} )
          return
        }
      const strongPasswordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).{8,}$/;
      if (!strongPasswordRegex.test( password  )  ){ 
     resp.status(400).send({message:"Your Password Not Stronged"})
     return
      }
      const domain = email.split( "@" )[1]
      if(disposableEmailDomains.includes(domain)){
         resp.status(400).send({message:"Spam Email Found Invaild Email "})
         return
      }
      const updatedEmail = email.trim().toLowerCase()
        const existingUser = await User.findOne({email:updatedEmail})

       if(existingUser){
         if(!existingUser.password ){
          resp.status(400).send({message:"You Have Loging With yourgoogle Account"})
          return;
        }
        const isMatched = await bcrypt.compare(password ,existingUser.password  )
        if(!isMatched) {
          resp.status(400).send({message:"Invalid Credentials"})
          return;
        }
         if(!existingUser.verified){
                // otp to email
                const otp = generateOtp(updatedEmail)
                  await sendEmail(resp,200,updatedEmail,otp)
                  return;
            }
            if(!existingUser.service){
              resp.status(400).send({message:"Your service has been disbled. Contact website support"})
              return;
            }
            resp.status(200).send({message:"Login Successfully"})
            return
       }
            
         const salt = await bcrypt.genSalt(10)
         const hasedPassword = await bcrypt.hash(password,salt)
         const result = await User.create({ email:updatedEmail,password:hasedPassword  })
         
          // resp.status(201).send({message:"LoginSuccessfully",data:result});
          const otp  = generateOtp(updatedEmail)
                  await sendEmail(resp,201,updatedEmail,otp)
                  
         

        //  if (existingUser) {
        //     resp.send({ message: "User with this email already exists" });
        //     return;
        //  }
        
        //  const result = await User.create({email,password}) 
        //  {
        //     resp.send({ message:"User Created Successfully", data:result  } )
        //  }
       }
       catch (error) {
  console.log("ERROR ", error);
  resp.status(500).send({
    message: "Internal Server Error",
    error: error.message
  });
  return
}
          };

          const verifyUser = (req,res )=>{

          }
       module.exports = {loginUser,verifyUser}