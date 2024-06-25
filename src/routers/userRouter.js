const express = require("express")
const bcrypt = require("bcrypt")
const jwt = require("jsonwebtoken")
const userModel = require("../models/userModel")

const userRouter = express.Router()

userRouter.get('/users',(req,res)=>{
    res.send("Hello Users...")
})

// post - register

userRouter.post('/register',async(req,res)=>{
    const {username, emailID, mobileNum,password} = req.body
    const user = await userModel.findOne({emailID})
    if(user){
        return res.send({"message":"user already exists"})
    }
    const hashPswd = await bcrypt.hash(password,10)
    const newUser = new userModel({username,emailID,mobileNum,password:hashPswd})
    await newUser.save()
    res.send({"message":"user created successfully"})
})

userRouter.post('/login',async(req,res)=>{
    const { emailID,password} = req.body
    const user = await userModel.findOne({emailID})
    if(!user){
        return res.send({"message":"user not exists"})
    }
    const comparePswd = await bcrypt.compare(password,user.password)
    if(!comparePswd){
        return res.send({"message":"password incorrect"})
    }
    const token = jwt.sign(
        {id : user._id},
        process.env.PRIVATE_KEY,
        {expiresIn: "30m"}
    )
    res.send({token, userID : user._id , username : user.username})
})

const verifyToken = (req,res,next) =>{
    const auth= req.headers.authorization
    if(auth){
        jwt.verify(auth,process.env.PRIVATE_KEY,(err)=>{
            if(err){
                return res.send({message:"invalid token"})
            }
            next()
        })
    }
    else{
        res.send({message:"auth failed"})
    }
}

module.exports = {userRouter,verifyToken}