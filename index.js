const  express =  require("express")
const cors = require("cors")
const  user = require("./modules/user")
const routess = require("./routues/routes")

const app = express()
app.use(express.json())
app.use(cors())

app.use("/api",routess
    
 )

const PORT = 9000
app.listen(PORT
    ,()=>{
   console.log( "Server Started At Port "+ PORT )
})