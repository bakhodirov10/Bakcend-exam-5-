const mongoose = require("mongoose");
const User = require("../models/user.model");
const userSchema = require("../validators/auth.validetor");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");

exports.registerUser = async (req, res) => {
  try {
    const validation = userSchema.safeParse(req.body);

    if (!validation.success) {
      return res.status(400).json({
        message: validation.error.errors,
      });
    }

    const { fullName, email, password } = req.body;

    const exitingEmail = await User.findOne({ email });

    if (exitingEmail) {
      return res.status(409).json({
        message: "This email is Busy",
      });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = new User({
      fullName,
      email,
      password: hashedPassword,
    });

    await newUser.save();

    return res.status(201).json({
      message: "Muvaffaqiyatli ro'yxatdan o'tdingiz",
      user: { 
        _id: newUser._id, 
        fullName, 
        email 
      },
    });

  } catch (error) {
    return res.status(500).json({
      message: `Error registerUser-da : ${error.message}`,
    });
  }
};

exports.loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await User.findOne({ email });

    if (!user) {
      return res.status(404).json({
        message: "User not found with this email",
      });
    }

    const isMatch = await bcrypt.compare(password, user.password);

    if (!isMatch) {
      return res.status(401).json({
        message: "Invalid password",
      });
    }

    const refreshToken = jwt.sign({ id: user._id }, process.env.JWT_TOKEN, {
      expiresIn: "7d",
    });

    const accessToken = jwt.sign(
      { id: user._id, fullName: user.fullName },
      process.env.JWT_TOKEN,
      { expiresIn: "15m" },
    );

    res.status(200).json({
      message: "Muvaffaqiyatli logindan o'tdingiz",
      user: { fullName: user.fullName, id: user._id, email: user.email },
      tokens: { accessToken, refreshToken },
    });
  } catch (error) {
    res.status(500).json({
      message: `Error loginUser-da : ${error.message}`,
    });
    console.log(error);
  }
};

exports.getProfile = async (req, res) => {
  try {
    const userId = req.user?.id;

    if (!userId) {
      return res.status(401).json({
        message: "Avtorizatsiyadan o'tilmagan yoki token noto'g'ri",
      });
    }

    const user = await User.findById(userId).select("-password");

    if (!user) {
      return res.status(404).json({
        message: "Foydalanuvchi topilmadi!",
      });
    }

    return res.status(200).json({
        message: "Malumot muvaffaqiyatli olindi",
        user: user
    });

  } catch (error) {
    return res.status(500).json({
        message: `Error getProfile - da : ${error.message}`
    });
  }
};

exports.refreshUser = async (req, res) => {
  try {
    const { refreshToken } = req.body;

    if (!refreshToken) {
      return res.status(400).json({
        message: "Refresh token taqdim etilmadi!",
      });
    }

    let decoded;
    try {
      decoded = jwt.verify(refreshToken, process.env.JWT_TOKEN);
    } catch (err) {
      return res.status(401).json({
        message: "Refresh token yaroqsiz yoki muddati o'tgan!",
      });
    }

    const user = await User.findById(decoded.id);
    if (!user) {
      return res.status(404).json({
        message: "Foydalanuvchi topilmadi!",
      });
    }

    const newAccessToken = jwt.sign(
      { id: user._id, fullName: user.fullName },
      process.env.JWT_TOKEN,
      { expiresIn: "15m" },
    );

    const newRefreshToken = jwt.sign({ id: user._id }, process.env.JWT_TOKEN, {
      expiresIn: "7d",
    });

    return res.status(200).json({
      tokens: {
        accessToken: newAccessToken,
        refreshToken: newRefreshToken,
      },
    });
  } catch (error) {
    return res.status(500).json({
      message: `Error refreshUser-da : ${error.message}`,
    });
  }
};

exports.logoutUser = async (req, res) => {
  try {
    res.clearCookie("accessToken");

    res.status(200).json({
      message: "Tizimdan chiqildi va token bloklandi!",
    });
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};
