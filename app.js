const mongoose = require("mongoose")
require("dotenv").config()

const connectDB = require("./config/db")
const express = require("express")
const userRouter = require("./routes/auth.routes")
const OtpRouter = require("./routes/otp.router")
const taskRouter = require("./routes/task.routes")



const port = process.env.PORT || 5500

const app = express()

app.use(express.json())

connectDB()


app.use("/api/auth", userRouter)
app.use("/api", OtpRouter)
app.use("/api", taskRouter)


app.listen(port, ()=>{
    console.log(`Server is listen on ${port}`)
})