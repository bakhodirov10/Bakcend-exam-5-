const jwt = require("jsonwebtoken")
require('dotenv').config()

const generateToken = (user) => {
        try {
            return jwt.sign(
                {
                    id: user._id,
                    fullName: user.fullName,
                    email: user.email
                },
                process.env.JWT_TOKEN,
                { expiresIn: "5d" }
            )
        } catch (error) {
            return console.error(error)
        }
}

module.exports = generateToken