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
                    courses: newCourse._id,
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

exports.getCourseDetails = async (req, res) => {
    try {
        const { courseId } = req.body;
        const courseDetails = await Course.findById(courseId)
            .populate({ path: "instructor", populate: { path: "additionalDetails" } })
            .populate({ path: "courseContent", populate: { path: "subSection" } })
            .populate("ratingAndReviews")
            .populate("category")
            .exec();
        //.populate("studentsEnrolled")
        if (!courseDetails) {
            return res.status(400).json({
                success: false,
                message: "could not find course with given course ID",
            });
        }
        return res.status(200).json({
            success: true,
            message: "Fetched all the details with given courseId",
            courseDetails,
        });
    } catch (err) {
        console.log(err);
        return res.status(500).json({
            success: false,
            message: "could not get course details",
            error: err.message,
        });
    }
};

exports.getTopCourses = async (req, res) => {
    try {
        const topCourses = await Course.find({})
            .sort({ studentCount: -1 })
            .limit(10)
            .select("title description thumbnail studentsEnrolled ratingAndReviews")
            .populate("instructor", "firstName lastName")
            .populate("category", "name")
            .exec();
        return res.status(200).json({
            success: true,
            message: "fetched data of top courses on the platform",
            topCourses,
        });
    } catch (err) {
        console.log(err);
        return res.status(500).json({
            success: false,
            message: "could not find top courses",
            error: err.message,
        });
    }
};
