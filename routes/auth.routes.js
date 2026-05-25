const express = require("express")
const router = express.Router()
const authController = require("../controllers/auth.controller")
const {authMiddleware} = require("../middlewares/auth.middleware")


router.get(
    "/profile",
    authMiddleware,
    authController.getProfile
)

router.post(
    "/register",
    authController.registerUser
)

router.post(
    "/login",
    authController.loginUser
)

router.post(
    "/refresh",
    authController.refreshUser
)

router.post(
    "/logout", 
    authController.logoutUser
)

module.exports = router





