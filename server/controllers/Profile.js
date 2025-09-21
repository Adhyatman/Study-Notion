const User = require("../models/User");
const Profile = require("../models/Profile");
const Course = require("../models/Course");

exports.updateProfile = async (req, res) => {
    try {
        //get data
        const { dateOfBirth = "", about = "", contactNumber, gender } = req.body;
        //get userId
        const id = req.user.id;
        //validation
        if (!contactNumber || !gender || !id) {
            return res.status(400).json({
                success: true,
                message: "all fields are needed",
            });
        }
        //find profile
        const userDetails = await User.findById(id);
        const profileId = userDetails.additionalDetails;
        const profileDetails = await Profile.findById(profileId);
        //update profile
        profileDetails.dateOfBirth = dateOfBirth;
        profileDetails.about = about;
        profileDetails.gender = gender;
        profileDetails.contactNumber = contactNumber;
        await profileDetails.save();
        return res.status(200).json({
            success: true,
            message: "updated profile successfully",
            profileDetails,
        });
    } catch (err) {
        console.log(err);
        return res.status(500).json({
            success: false,
            message: "unable to update profile",
            error: err.message,
        });
    }
};

exports.deleteAccount = async (req, res) => {
    try {
        //get id
        const id = req.user.id;
        //validation
        const userDetails = await User.findById(id);
        if (!userDetails) {
            return res.status(400).json({
                success: false,
                message: "User not found",
            });
        }
        //delete profile
        await Profile.findByIdAndDelete({ _id: userDetails.additionalDetails });
        //delete user from enrolled courses
        for (const courseId of userDetails.courses) {
            await Course.findByIdAndUpdate(courseId, { $pull: { studentsEnrolled: id } });
        }
        //delete user
        await User.findByIdAndDelete({ _id: id });
        //homework : unenroll user from all enrolled courses
        return res.status(200).json({
            success: true,
            message: "account deleted successfully",
        });
    } catch (err) {
        console.log(err);
        return res.status(500).json({
            success: false,
            message: "could not delete account",
            error: err.message,
        });
    }
};

exports.getAllUserDetails = async (req, res) => {
    try {
        //get id
        const id = req.user.id;
        //validation and get user details
        const userDetails = await User.findById(id).populate("additionalDetails").exec();
        return res.status(200).json({
            success: true,
            message: "user data fetched successfully",
            userDetails,
        });
    } catch (err) {
        console.log(err);
        return res.status(500).json({
            success: false,
            message: "could not get user details",
            error: err.message,
        });
    }
};
