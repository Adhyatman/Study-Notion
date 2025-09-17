const Course = require("../models/Course");
const Category = require("../models/Category");
const User = require("../models/User");
const { uploadImageToCloudinary } = require("../utils/imageUploader");
//changes-------------------------

//Create course handler function
exports.createCourse = async (req, res) => {
    try {
        //fetch data
        const { courseName, courseDescription, whatYouWillLearn, price, category, tags } = req.body;
        //get thumbnail
        const thumbnail = req.files.thumbnailImage;
        //validation
        if (!courseName || !courseDescription || !whatYouWillLearn || !price || !category || !thumbnail || !tags) {
            return res.status(400).json({
                success: false,
                message: "All fields are required",
            });
        }
        //check for instructor
        const userId = req.user.id;
        const instructorDetails = await User.findById(userId);
        console.log("Instructor Details: ", instructorDetails);

        if (!instructorDetails) {
            return res.status(404).json({
                success: false,
                message: "Instructor Details are not found",
            });
        }
        //check if tag is valid or not
        const categoryDetails = await Category.findById(category);
        if (!categoryDetails) {
            return res.status(404).json({
                success: false,
                message: "Category Details are not found",
            });
        }
        //upload image to cloudinary
        const thumbnailImage = await uploadImageToCloudinary(thumbnail, process.env.FOLDER_NAME);

        //create an entry for new course
        const newCourse = await Course.create({
            courseName,
            courseDescription,
            tags,
            instructor: instructorDetails._id,
            whatYouWillLearn: whatYouWillLearn,
            price,
            category: categoryDetails._id,
            thumbnail: thumbnailImage.secure_url,
        });

        //add new course to the user schema of instructor
        await User.findByIdAndUpdate(
            instructorDetails._id,
            {
                $push: {
                    courses: newCourse._id,
                },
            },
            { new: true }
        );
        //update tag schema
        await Category.findByIdAndUpdate(
            categoryDetails._id,
            {
                $push: {
                    course: newCourse._id,
                },
            },
            { new: true }
        );
        return res.status(200).json({
            success: true,
            message: "Course created successfully",
            data: newCourse,
        });
    } catch (err) {
        console.log(err);
        return res.status(500).json({
            success: false,
            message: "Failed to create course",
            error: err.message,
        });
    }
};

//getAllCourse handler function
exports.showAllCourses = async (req, res) => {
    try {
        const allCourses = await Course.find(
            {},
            { courseName: true, price: true, thumbnail: true, instructor: true, ratingAndReviews: true, studentsEnrolled: true }
        )
            .populate("instructor")
            .exec();
        return res.status(200).json({
            success: true,
            message: "Data for all courses fetched successfully",
            data: allCourses,
        });
    } catch (err) {
        console.log(err);
        return res.status(500).json({
            success: false,
            message: "Cannot fetch course data",
            error: err.message,
        });
    }
};
