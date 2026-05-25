const mongoose = require("mongoose")
require("dotenv").config()

const connectDB = require("./config/db")
const express = require("express")
const userRouter = require("./routes/auth.routes")
const taskRouter = require("./routes/task.routes")
const cors = require("cors");


const port = process.env.PORT || 5500

const app = express()
app.use(cors())

app.use(express.json())

connectDB()

app.use("/api/auth", userRouter)
app.use("/api", taskRouter)


app.listen(port, ()=>{
    console.log(`Server is listen on ${port}`)
})