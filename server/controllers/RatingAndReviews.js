const RatingAndReview = require("../models/RatingAndReview");
const Course = require("../models/Course");

exports.createRating = async (req, res) => {
    try {
        //get user id
        const userId = req.user.id;
        //fetch data from req body
        const { courseId, rating, review } = req.body;
        //check if user is enrolled or not
        const courseDetails = await Course.findOne({ _id: courseId, studentsEnrolled: { $elemMatch: { $eq: userId } } });
        if (!courseDetails) {
            return res.status(404).json({
                success: false,
                message: "user is not enrolled in this course",
            });
        }
        //check if user has not already reviewed
        const alreadyReviewed = await RatingAndReview.findOne({ user: userId, course: courseId });
        if (alreadyReviewed) {
            return res.status(403).json({
                success: false,
                message: "Course if already reviewed by user",
            });
        }
        //create rating and review
        const ratingReview = await RatingAndReview.create({
            rating,
            review,
            course: courseId,
            user: userId,
        });
        //update course
        await Course.findByIdAndUpdate(
            { _id: courseId },
            {
                $push: {
                    ratingAndReviews: ratingReview,
                },
            },
            { new: true }
        );
        //return response
        return res.status(200).json({
            success: true,
            message: "Rating and Review successfully created",
            ratingReview,
        });
    } catch (err) {
        console.log(err);
        return res.status(500).json({
            success: false,
            message: "could not create rating",
            error: err.message,
        });
    }
};

exports.getAverageRating = async (req, res) => {
    try {
        //get course Id
        const { courseId } = req.body;
        //calculate avg rating
        const result = await RatingAndReview.aggregate([
            {
                $match: {
                    course: new mongoose.Types.ObjectId(courseId),
                },
            },
            {
                $group: {
                    _id: null,
                    averageRating: { $avg: "$rating" },
                },
            },
        ]);
        //return rating
        if (result.length > 0) {
            return res.status(200).json({
                success: true,
                averageRating: result[0].averageRating,
            });
        }
        //if no rating/review exist
        return res.status(200).json({
            success: true,
            message: "average rating is 0, now rating given till now",
            averageRating: 0,
        });
    } catch (err) {
        console.log(err);
        return res.status(500).json({
            success: false,
            message: "could not find average rating",
            error: err.message,
        });
    }
};

exports.getAllRating = async (req, res) => {
    try {
        const allReviews = await RatingAndReview.find({})
            .sort({ rating: "desc" })
            .populate({
                path: "user",
                select: "firstName lastName email image",
            })
            .populate({
                path: "course",
                select: "courseName",
            })
            .exec();
        return res.status(200).json({
            success: true,
            message: "All reviews fetched successfully",
            allReviews,
        });
    } catch (err) {
        console.log(err);
        return res.status(500).json({
            success: false,
            message: "could not fetch all reviews",
            error: err.message,
        });
    }
};

exports.getCourseRatings = async (req, res) => {
    try {
        //get course id
        const { courseId } = req.body;
        //fetch data
        const courseRatings = await Course.findById(courseId, "ratingAndReviews", { new: true })
            .populate({
                path: "ratingAndReviews",
                populate: {
                    path: "user",
                    select: "firstName lastName email image",
                },
            })
            .populate({
                path: "ratingAndReviews",
                populate: {
                    path: "course",
                    select: "courseName",
                },
            })
            .exec();
        //validation
        if (!courseRatings) {
            return res.status(400).json({
                success: false,
                message: "could not find course with given id",
            });
        }
        if (courseRatings.ratingAndReviews.length === 0) {
            return res.status(404).json({
                success: true,
                message: "no reviews and ratings for this course yet",
            });
        }
        //return response
        return res.status(200).json({
            success: true,
            message: "fetched ratings and reviews for given course ID",
            courseRatings,
        });
    } catch (err) {
        console.log(err);
        return res.status(500).json({
            success: false,
            message: "",
            error: err.message,
        });
    }
};
