const express = require("express")
const router = express.Router()
const controllerOTP = require("../controllers/otp.controller")

router.post(
    "/send-otp",
    controllerOTP.sendOTP
)

router.post(
    "/verify-otp",
    controllerOTP.verifyOTP
)

module.exports = router