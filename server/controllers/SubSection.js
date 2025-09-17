const Section = require("../models/Section");
const SubSection = require("../models/SubSection");
const { uploadImageToCloudinary } = require("../utils/imageUploader");

exports.createSubSection = async (req, res) => {
    try {
        //fetch data from req body
        const { sectionId, title, timeDuration, description } = req.body;
        //extract file/video
        const video = req.files.videoFile;
        //validation
        if (!sectionId || !title || !timeDuration || !description || !video) {
            return res.status(400).json({
                success: false,
                message: "All fields are required",
            });
        }
        //upload video to cloudianry
        const uploadDetails = await uploadImageToCloudinary(video, process.env.FOLDER_NAME);
        //create a sub section
        const subSectionDetails = await SubSection.create({
            title: title,
            timeDuration: timeDuration,
            description: description,
            videoUrl: uploadDetails.secure_url,
        });
        //update section with sub section
        const updatedSection = await Section.findByIdAndUpdate(
            { _id: sectionId },
            {
                $push: {
                    subSection: subSectionDetails._id,
                },
            },
            { new: true }
        );
        return res.status(200).json({
            success: true,
            message: "sub section created successfully",
            updatedSection,
        });
    } catch (err) {
        console.log(err);
        return res.status(500).json({
            success: false,
            message: "unable to create sub section",
            error: err.message,
        });
    }
};

exports.updateSubSection = async (req, res) => {
    try {
        //fetch data from req body
        const { subSectionId, title, timeDuration, description } = req.body;
        //fetch sub section details
        const subSectionDetails = await SubSection.findById(subSectionId);
        //validation
        if (!subSectionDetails) {
            return res.status(404).json({
                success: false,
                message: "sub section cannot be found",
            });
        }
        //creating video url variable
        let video_url = subSectionDetails.videoUrl;
        //ipdating video url
        if (req.files && req.files.videoFile) {
            const video = req.files.videoFile;
            const uploadDetails = await uploadImageToCloudinary(video, process.env.FOLDER_NAME);
            video_url = uploadDetails.secure_url;
        }
        //update sub section
        const updatedSubSection = await SubSection.findByIdAndUpdate(
            { _id: subSectionId },
            {
                title,
                timeDuration,
                description,
                videoUrl: video_url,
            },
            { new: true }
        );
        return res.status(200).json({
            success: true,
            message: "sub section updated successfully",
            updatedSubSection,
        });
    } catch (err) {
        console.log(err);
        return res.status(500).json({
            success: false,
            message: "unable to update sub section",
            error: err.message,
        });
    }
};

exports.deleteSubSection = async (req, res) => {
    try {
        const { subSectionId, sectionId } = req.body;
        const deletedSubSection = await SubSection.findByIdAndDelete(subSectionId);

        if (!deletedSubSection) {
            return res.status(404).json({
                success: false,
                message: "SubSection not found",
            });
        }
        const deleteSubSectionFromSection = await Section.findByIdAndUpdate(sectionId, { $pull: { subSection: subSectionId } });
        if (!deleteSubSectionFromSection) {
            return res.status(404).json({
                success: false,
                message: "Section not found",
            });
        }
        return res.status(200).json({
            success: true,
            message: "sub section deleted successfully",
            deletedSubSection,
        });
    } catch (err) {
        console.log(err);
        return res.status(500).json({
            success: false,
            message: "unable to delete sub section",
            error: err.message,
        });
    }
};
