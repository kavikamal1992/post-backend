const express = require("express")
const mongoose =require("mongoose")
const postModel = require("../models/postModel")
const { verifyToken } = require("./userRouter")


const postRouter = express.Router()

postRouter.get('/getPosts',async(req,res)=>{
    try {
       const allPost =  await postModel.find()
       res.send(allPost)
    } catch (error) {
        res.send(error)
    }
})

postRouter.post('/newPost',verifyToken,async(req,res)=>{
    const newPost = new postModel({
        _id : new mongoose.Types.ObjectId(),
        title : req.body.title,
        imageUrl : req.body.imageUrl,
        desc : req.body.desc,
        userOwner : req.body.userOwner
    })
    try {
        const newlyCreatedPost = await newPost.save()
        res.send(newlyCreatedPost)
    } catch (error) {
        res.send(error)
    }
})

module.exports = postRouter

