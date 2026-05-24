const nodemailer = require("nodemailer")

const transporter = nodemailer.createTransport({
    service: "Gmail",
    auth: {
        user: "boxodirovabdulloh46@gmail.com",
        pass: "tkgbiouaetnwbdrz"
    }
})

module.exports = transporter