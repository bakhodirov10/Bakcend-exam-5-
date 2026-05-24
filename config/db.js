const mongoose = require("mongoose");

async function connectDB() {
  try {
    // Agar kodingiz Render'ga borsa, u yerdagi MONGO_URI ni o'qiydi
    // Agar kompyuteringizda bo'lsa, orqadagi Atlas linkidan foydalanadi
    const dbURI = process.env.MONGO_URL
    
    await mongoose.connect(dbURI);
    console.log("DataBase successfully connected ✅");
  } catch (error) {
    console.error("DataBase connection error ❌:", error.message);
    // process.exit(1) ni butunlay olib tashladik, server krash bo'lmaydi!
  }
}

module.exports = connectDB;