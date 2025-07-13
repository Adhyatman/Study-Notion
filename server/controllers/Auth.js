const User = require("../models/User");
const OTP = require("../models/OTP");
const otpGenerator = require("otp-generator");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
require("dotenv").config();
const mailSender = require("../utils/mailSender");

//sendOTP
exports.sendOTP = async (req, res) => {
    try {
        //fetch email from req body
        const { email } = req.body;

        //check if already exists
        const checkUserPresent = await User.findOne({ email });
        if (checkUserPresent) {
            return res.status(401).json({
                success: false,
                message: "User already registered",
            });
        }
        var otp = otpGenerator.genearte(6, {
            upperCaseAlphabets: false,
            lowerCaseAlphabets: false,
            specialChars: false,
        });
        console.log("OTP generated ", otp);

        //check unique otp or not
        const result = await OTP.findOne({ otp: otp });

        while (result) {
            otp = otpGenerator.genearte(6, {
                upperCaseAlphabets: false,
                lowerCaseAlphabets: false,
                specialChars: false,
            });
            result = await OTP.findOne({ otp: otp });
        }
        const otpPayload = { email, otp };

        //create an entry for OTP
        const otpBody = await OTP.create(otpPayload);
        console.log(otpBody);

        res.status(200).json({
            success: true,
            message: "OTP sent successfully",
            otp,
        });
    } catch (e) {
        console.log(e);
        return res.status(500).json({
            success: false,
            message: e.message,
        });
    }
};

//signup
exports.signup = async (req, res) => {
    try {
        //fetch data from req body
        const { firstName, lastName, email, password, confirmPassword, accountType, contactNumber, otp } = req.body;

        //validate data
        if (!firstName || !lastName || !email || !password || !confirmPassword || !contactNumber || !otp) {
            return res.status(403).json({
                success: false,
                message: "All fields are required",
            });
        }

        //match password and confirm password
        if (password != confirmPassword) {
            return res.status(403).json({
                success: false,
                message: "Password and Confirm Password do not match",
            });
        }

        //check if user exists
        const existingUser = await User.findOne({ email });
        if (existingUser) {
            return res.status(403).json({
                success: false,
                message: "User is already registered",
            });
        }

        //find most recent OTP from database
        const recentOTP = await OTP.find({ email }).sort({ createdAt: -1 }).limit(1);
        console.log(recentOTP);

        //validate OTP
        if (recentOTP.length == 0) {
            //NO OTP FOUND
            return res.status(400).json({
                success: false,
                message: "OTP Not found",
            });
        } else if (otp !== recentOTP) {
            //INVALID OTP
            return res.status(400).json({
                success: false,
                message: "Invalid OTP",
            });
        }

        //Hash password
        const hashedPassword = await bcrypt.hash(password, 10);

        //entry create in DB
        const profileDetails = Profile.create({
            gender: null,
            dateOfBirth: null,
            about: null,
            contactNumber: null,
        });
        const user = await User.create({
            firstName,
            lastName,
            email,
            password: hashedPassword,
            accountType,
            additionalDetails: profileDetails._id,
            image: `https://api.dicebear.com/9.x/pixel-art/svg?seed=${firstName} ${lastName}`,
        });

        //return res
        return res.status(200).json({
            success: true,
            message: "user successfully created",
        });
    } catch (e) {
        console.log(e);
        return res.status(500).json({
            success: false,
            message: "user cannot be registered",
        });
    }
};

//login
exports.login = async (req, res) => {
    try {
        //get data from req body
        const { email, password } = req.body;
        //validation data
        if (!email || !password) {
            return res.status(403).json({
                success: false,
                message: "all fields are required",
            });
        }
        //user check exist or not
        const user = await User.findOne({ email }.populate("additionalDetails"));
        if (!user) {
            return res.status(401).json({
                success: false,
                message: "user is not registered, please sign up first",
            });
        }
        //generate JWT after checking password
        if (await bcrypt.compare(password, user.password)) {
            const payload = {
                email: user.email,
                id: user._id,
                accountType: user.accountType,
            };
            const token = jwt.sign(payload, process.env.JWT_SECRET, {
                expiresIn: "2h",
            });
            user.token = token;
            user.password = undefined;
            //create cookie and send response
            const options = {
                expires: new Date(Date.now() + 3 * 24 * 60 * 60 * 1000),
            };
            res.cookie("token", token, options).status(200).json({
                success: true,
                token,
                user,
                message: "logged in",
            });
        } else {
            return res.status(401).json({
                success: false,
                message: "wrong password",
            });
        }
    } catch (e) {
        return res.status(500).json({
            success: false,
            message: "login failed",
        });
    }
};

//changePassword
exports.changePassword = async (req, res) => {
    try {
        //get data from req body
        //get oldPassword, newPassword, confirmNewPassword
        const { email, oldPassword, newPassword, confirmNewPassword } = req.body;
        //validation
        const userDetails = await User.findOne({ email });
        if (!userDetails) {
            return res.json({
                success: false,
                message: "user does not exist",
            });
        }
        const isPasswordMatch = await bcrypt.compare(oldPassword, userDetails.password);
        if (!isPasswordMatch) {
            return res.status(401).json({
                success: false,
                message: "old password does not match",
            });
        }
        if (newPassword !== confirmNewPassword) {
            return res.status(401).json({
                success: false,
                message: "confirm password does not match",
            });
        }
        //hash password
        const hashedPassword = await bcrypt.hash(newPassword, 10);
        //update pwd in DB
        await User.findOneAndUpdate({ email }, { password: hashedPassword }, { new: true });
        //send mail - password updated
        await mailSender(email, "Password updated", "your password has been updated");
        //return response
        return res.status(200).json({
            success: true,
            message: "password changed successfully",
        });
    } catch (e) {
        console.log(e.message);
        return res.status(500).json({
            success: false,
            message: "could not update password",
        });
    }
};
