const express= require("express")
const cors=require("cors")
const { connection } = require("./config/db")
const {userRouter}=require("./routes/User.route")
const { analyticsRouter } = require("./routes/Analytics.route")
const { postRouter } = require("./routes/Post.route")


require("dotenv").config()

const app=express()
app.use(cors({
    origin:"*"
}))
app.use(express.json())

app.get("/",(req,res)=>{
    res.send("Welcome")
})

app.use("/users",userRouter)
app.use("/posts",postRouter)
app.use("/analytics",analyticsRouter)


app.listen(process.env.port,async()=>{
    try{
        await connection
        console.log("Connected to DB")
    }catch(err){
        console.log(err)
        console.log("Error while connecting to DB")
    }
    console.log(`Server running at ${process.env.port}`)
})