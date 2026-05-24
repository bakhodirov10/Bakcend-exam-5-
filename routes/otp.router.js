const express = require("express")
const router = express.Router()
const OTPController = require("../controllers/Otp.constroller")

router.post(
    "/send-otp",
    OTPController.sendOTP
)

router.post(
    "verify-otp", 
    OTPController.verifyOTP
)

module.exports = router