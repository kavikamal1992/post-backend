const express = require("express")
const dbConnect = require("./src/db")
const {userRouter} = require("./src/routers/userRouter")
const postRouter = require("./src/routers/postRouter")
const dotenv = require("dotenv").config()
const cors = require('cors')

const app = express()

app.use(express.json())
app.use(cors())
app.use('/',userRouter)
app.use('/',postRouter)

dbConnect()

app.get('/',(req,res)=>{
    res.send("HELLO MERN APP")
})

const port = process.env.PORT

app.listen(port,()=>{
    console.log(`Server Stared  => http://localhost:${port}`);
})