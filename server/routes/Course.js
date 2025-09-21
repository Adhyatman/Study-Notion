const express = require("express");
const router = express.Router();

const { createCourse, showAllCourses, getCourseDetails, getTopCourses } = require("../controllers/Course");

const { showCategory, createCategory, categoryPageDetails } = require("../controllers/Category");

const { createSection, updateSection, deleteSection } = require("../controllers/Section");

const { createSubSection, updateSubSection, deleteSubSection } = require("../controllers/Subsection");

const { createRating, getAverageRating, getAllRating, getCourseRatings } = require("../controllers/RatingAndReviewS");

// const {
//   updateCourseProgress
// } = require("../controllers/courseProgress");

const { auth, isInstructor, isStudent, isAdmin } = require("../middlewares/auth");

// Courses can Only be Created by Instructors
router.post("/createCourse", auth, isInstructor, createCourse);
//Add a Section to a Course
router.post("/addSection", auth, isInstructor, createSection);
// Update a Section
router.post("/updateSection", auth, isInstructor, updateSection);
// Delete a Section
router.post("/deleteSection", auth, isInstructor, deleteSection);
// Edit Sub Section
router.post("/updateSubSection", auth, isInstructor, updateSubSection);
// Delete Sub Section
router.post("/deleteSubSection", auth, isInstructor, deleteSubSection);
// Add a Sub Section to a Section
router.post("/addSubSection", auth, isInstructor, createSubSection);
// Get all Registered Courses
router.get("/getAllCourses", showAllCourses);
// Get Details for a Specific Courses
router.post("/getCourseDetails", getCourseDetails);
// Get Details of Top Courses
router.post("/getTopCourses", getTopCourses);
// // Get Details for a Specific Courses
// router.post("/getFullCourseDetails", auth, getFullCourseDetails)
// // Edit Course routes
// router.post("/editCourse", auth, isInstructor, editCourse)
// // Get all Courses Under a Specific Instructor
// router.get("/getInstructorCourses", auth, isInstructor, getInstructorCourses)
// Delete a Course
// router.delete("/deleteCourse", deleteCourse);

// router.post("/updateCourseProgress", auth, isStudent, updateCourseProgress);

// Category can Only be Created by Admin
// TODO: Put IsAdmin Middleware here
router.post("/createCategory", auth, isAdmin, createCategory);
router.get("/showCategory", showCategory);
router.post("/getCategoryPageDetails", categoryPageDetails);

router.post("/createRating", auth, isStudent, createRating);
router.get("/getAverageRating", getAverageRating);
router.get("/getReviews", getAllRating);
router.get("/getCourseRatings", getCourseRatings);

module.exports = router;
