const mongoose = require("mongoose")

async function connectDB() {
    try {
        await mongoose.connect("mongodb://127.0.0.1:27017/backend-exam")
        console.log("DataBase succesfully connected")
    } catch (error) {
        console.log(`DataBase connection error: ${error}`)
        process.exit(1)
    }
}

module.exports = connectDB
