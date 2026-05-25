const mongoose = require("mongoose");

async function connectDB() {
  try {
    const mongoDBURI = process.env.MONGO_URL
    await mongoose.connect(mongoDBURI);
    console.log("DataBase successfully connected");
  } catch (error) {
    console.error("DataBase connection error:", error.message)
  }
}

module.exports = connectDB;