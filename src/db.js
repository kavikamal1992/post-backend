const mongoose=require("mongoose")

const dbconect= async() =>{
try {
    await mongoose.connect(process.env.MONGO_URL)
    console.log("db connected successfully");
} catch (error) {
  console.log("db connection failure",error); 
}
}

module.exports = dbconect