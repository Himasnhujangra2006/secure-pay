const express = require("express")
const router = express.Router()

router.post("/login",(req,res)=>{
    res.send("login successfully")
    
}  )
module.exports = router




