const mongoose = require("mongoose")
 
const connectDb = async ()=>{
  await  mongoose.connect("mongodb://localhost:27017/SecurePay")
  console.log("Connnected on MongoDb")
}

// const connectDb = async ()=>{
//    await mongoose.connect("mongodb://localhost:27017/SecurePay")
//    console.log("Connected to MongoDb")

module.exports = connectDb