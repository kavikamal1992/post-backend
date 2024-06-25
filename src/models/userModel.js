const mongoose =require("mongoose")
//schema
const userSchema= new mongoose.Schema({
username:{type:String,required:true},
emailID:{type:String,required:true},
mobileNum:{type:String,required:true},
password:{type:String,required:true}
})
const userModel=mongoose.model("users",userSchema)

module.exports=userModel
