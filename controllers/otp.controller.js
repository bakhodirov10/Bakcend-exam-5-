const transporter = require("../config/mail")

const storeOTP = {}
exports.sendOTP = async (req, res) =>{
    try {
        const {email} = req.body

        if(!email){
            res.status(400).json({
                message: "Email required"
            })
        }

        const otp = Math.floor(100000 + Math.random() * 900000)

        storeOTP[email] = otp

        await transporter.sendMail({
            from: "boxodirovabdulloh46@gmail.com",
            to: email,
            subject: "OTP xabaring",
            text: `Your OTP: ${otp}`
        })

        res.status(200).json({
            message: "OTP sended"
        })
    } catch (error) {
        res.status(500).json({
            message: `Error is on sendOTP: ${error.message}`
        })
        console.log(error)
    }
}


exports.verifyOTP = async (req, res) => {
    try {
        const {email , otp} = req.body

        if(!email || !otp){
            res.status(400).json({
                message: "All fields are required"
            })
        }

        if(storeOTP[email] == otp){
            delete storeOTP[email]

            return res.status(200).json({
                message: "Muvaffaqiyatli tasdiqlandi"
            })
        }

        res.status(400).json({
            message: "To'g'ri kiritilmagan"
        })
    } catch (error) {
        res.status(500).json({
            message: `Error is on verifyOTP: ${error.message}`
        })
        console.log(error)
    }
}