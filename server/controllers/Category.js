const Category = require("../models/Category");
const Course = require("../models/Course");
//changes-------------------------

exports.createCategory = async (req, res) => {
    try {
        //fetch data
        const { name, description } = req.body;
        //validation
        if (!name || !description) {
            return res.status(400).json({
                success: false,
                message: "All fields are required",
            });
        }
        //create entry in db
        const categoryDetails = await Category.create({
            name: name,
            description: description,
        });
        console.log(categoryDetails);
        //return response
        return res.status(200).json({
            success: true,
            message: "category created successfully",
        });
    } catch (error) {
        return res.status(500).json({
            success: false,
            message: error.message,
        });
    }
};

//getAllTags handler function
exports.showCategory = async (req, res) => {
    try {
        const category = await Category.find({}, { name: true, description: true });
        res.status(200).json({
            success: true,
            message: "Category returned successfully",
            category,
        });
    } catch (error) {
        return res.status(500).json({
            success: false,
            message: error.message,
        });
    }
};

exports.categoryPageDetails = async (req, res) => {
    try {
        //get catrgory id
        const { categoryId } = req.body;
        //get courses for category id
        const selectedCategory = await Category.findById(categoryId).populate("courses").exec();
        //validation
        if (!selectedCategory) {
            return res.status(404).json({
                success: false,
                message: "data not found",
            });
        }
        //get courses for different categories
        const differentCategories = await Category.find({
            _id: { $ne: categoryId },
        })
            .populate("courses")
            .exec();
        //get top selling courses
        const topCourses = await Course.find({ category: new mongoose.Types.ObjectId(categoryId) })
            .sort({ studentsEnrolled: -1 })
            .populate("instructor category")
            .exec();
        //return response
        return res.status(200).json({
            success: true,
            data: {
                differentCategories,
                selectedCategory,
                topCourses,
            },
        });
    } catch (err) {
        console.log(err);
        return res.status(500).json({
            success: false,
            message: "some error occured",
            error: err.messagae,
        });
    }
};
