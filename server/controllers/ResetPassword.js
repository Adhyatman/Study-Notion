const User = require("../models/User");
const mailSender = require("../utils/mailSender");
const bcrypt = require("bcrypt");

//resetPasswordToken
exports.resetPasswordToken = async (req, res) => {
    try {
        //get email from req body
        const email = req.body.email;
        //check user for this email
        const user = await User.findOne({ email });
        if (!user) {
            return res.json({
                success: false,
                message: "email is not registered",
            });
        }
        //generate token
        const token = crypto.randomUUID();
        //update user by adding token and expiration time
        const updatedDetails = User.findOneAndUpdate(
            { email },
            {
                resetPasswordToken: token,
                resetPasswordExpires: Date.now() + 5 * 60 * 1000,
            },
            { new: true }
        );
        //create url
        const url = `http://localhost:3000/update-password/${token}`;
        //send mail containing the url
        await mailSender(email, "Password Reset Link", `Password Reset Link: ${url}`);
        //return the response
        return res.status(200).json({
            success: true,
            message: "email sent successfully, check your mail",
        });
    } catch (e) {
        console.log(e.message);
        return res.status(500).json({
            success: false,
            message: "error occured in generating reset passowrd token",
        });
    }
};

//resetPassword
exports.resetPassword = async (req, res) => {
    try {
        //data fetch
        const { password, confirmPassword, resetPasswordToken } = req.body;
        //validation
        if (password !== confirmPassword) {
            return res.status(401).json({
                success: false,
                message: "password not matching",
            });
        }
        //get user details from db using token
        const userDetails = await user.findOne({ resetPasswordToken });
        //if no entry - invalid token
        if (!userDetails) {
            return res.json({
                success: false,
                message: "Token is invalid",
            });
        }
        //token time check
        if (userDetails.resetPasswordExpires > Date.now()) {
            return res.json({
                success: false,
                message: "token expired",
            });
        }
        //hash password
        const hashedPassword = await bcrypt.hash(password, 10);
        //password update
        await User.findOneAndUpdate({ resetPasswordToken }, { password: hashedPassword }, { new: true });
        //return response
        return res.status(200).json({
            success: true,
            message: "resetted password successfully",
        });
    } catch (e) {
        console.log(e.message);
        return res.status(500).json({
            success: false,
            message: "could not reset password",
        });
    }
};
