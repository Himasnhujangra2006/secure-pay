const mongoose = require("mongoose")
require("dotenv").config()
const connectDb = async ()=>{
  await  mongoose.connect( process.env.MONGO_URL )
  console.log("Connnected on MongoDb")
}

// const connectDb = async ()=>{
//    await mongoose.connect("mongodb://localhost:27017/SecurePay")
//    console.log("Connected to MongoDb")

module.exports = connectDb