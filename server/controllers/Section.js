const Section = require("../models/Section");
const Course = require("../models/Course");

exports.createSection = async (req, res) => {
    try {
        //data fetch
        const { sectionName, courseId } = req.body;
        //data validation
        if (!sectionName || !courseId) {
            return res.status(400).json({
                success: false,
                message: "Missing porperties",
            });
        }
        //create section
        const newSection = await Section.create({ sectionName });
        //update course with section object id
        const updatedCourseDetails = await Course.findByIdAndUpdate(
            courseId,
            {
                $push: {
                    courseContent: newSection._id,
                },
            },
            { new: true }
        );
        //use populate to replace sections and subsections both in the updated course deatails
        return res.status(200).json({
            success: true,
            message: "Section created successfully",
            updatedCourseDetails,
        });
    } catch (err) {
        console.log(err);
        return res.status(500).json({
            success: false,
            message: "unable to create section",
            error: err.message,
        });
    }
};

exports.updateSection = async (req, res) => {
    try {
        //data input
        const { sectionName, sectionId } = req.body;
        //data validation
        if (!sectionName || !sectionId) {
            return res.status(400).json({
                success: false,
                message: "Missing porperties",
            });
        }
        //update data
        const section = await Section.findByIdAndUpdate(sectionId, { sectionName }, { new: true }).populate("subSection").exec();
        return res.status(200).json({
            success: true,
            message: "Section updated successfully",
            section,
        });
    } catch (err) {
        console.log(err);
        return res.status(500).json({
            success: false,
            message: "unable to update section",
            error: err.message,
        });
    }
};

exports.deleteSection = async (req, res) => {
    try {
        //get Id - assuming that we are sending section id in params
        const { sectionId } = req.body;
        //delete section using id
        await Section.findByIdAndDelete(sectionId);
        return res.status(200).json({
            success: true,
            message: "section deleted successfully",
        });
    } catch (err) {
        console.log(err);
        return res.status(500).json({
            success: false,
            message: "unable to delete section",
            error: err.message,
        });
    }
};
