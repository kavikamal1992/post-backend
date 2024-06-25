const mongoose =require("mongoose")
//schema
const postSchema= new mongoose.Schema({
title:{type:String,required:true},
imageUrl:{type:String,required:true},
desc:{type:String,required:true},
userOwner:{type:mongoose.Schema.Types.ObjectId,ref:"users",required:true}
})
const postModel=mongoose.model("posts",postSchema)

module.exports=postModel