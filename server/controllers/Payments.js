const { instance } = require("../config/razorpay");
const Course = require("../models/Course");
const User = require("../models/User");
const mailSender = require("../utils/mailSender");
const { courseEnrollmentEmail } = require("../templates/courseEnrollmentEmail");

//capture the payment and initiate the razorpay order
exports.capturePayment = async (req, res) => {
    try {
        //get courseId and userId
        const { course_id } = req.body;
        const user_id = req.user.id;
        //validation
        //valid courseId
        if (!course_id) {
            return res.json({
                success: false,
                message: "Please provide valid course ID",
            });
        }
        //valid courseDetail
        let course;
        try {
            course = await Course.findById(course_id);
            if (!course) {
                return res.json({
                    success: false,
                    message: "Could not find the course",
                });
            }
        } catch (err) {}
        //check if user has not already paid for the same course
        const uid = new mongoose.Types.ObjectId(user_id);
        if (course.studentsEnrolled.includes(uid)) {
            return res.status(200).json({
                success: false,
                message: "Student is already enrolled",
            });
        }
        //order create
        const amount = course.price;
        const currency = "INR";
        const options = {
            amount: amount * 100,
            currency,
            receipt: Math.random(Date.now().toString()),
            notes: {
                courseId: course_id,
                userId,
            },
        };
        try {
            //initiate payment using razorpay
            const paymentResponse = await instance.orders.create(options);
            console.log(paymentResponse);
            //return response
            return res.status(200).json({
                success: true,
                courseName: course.courseName,
                courseDescription: course.courseDescription,
                thumbnail: course.thumbnail,
                orderId: paymentResponse.id,
                currency: paymentResponse.currency,
                amount: paymentResponse.amount,
            });
        } catch (err) {
            console.log(err);
            return res.status(500).json({
                success: false,
                message: "could not initiate order",
                error: err.message,
            });
        }
    } catch (err) {
        console.log(err);
        return res.status(500).json({
            success: false,
            message: "could not capture payment",
            error: err.message,
        });
    }
};

//verify signature of Razorpay and server

exports.verifySignature = async (req, res) => {
    const webhookSecret = "12345678";
    const signature = req.headers["x-razorpay-signature"];
    const shasum = crypto.createHmac("sha256", webhookSecret);
    shasum.update(JSON.stringify(req.body));
    const digest = shasum.digest("hex");

    if (signature === digest) {
        console.log("payment is authorized");
        const { courseId, userId } = req.body.payload.payment.entity.notes;
        try {
            const enrolledCourse = await Course.findOneAndUpdate(
                { _id: courseId },
                {
                    $push: {
                        studentsEnrolled: userId,
                    },
                },
                { new: true }
            );
            if (!enrolledCourse) {
                return res.status(500).json({
                    success: false,
                    message: "could not find course",
                });
            }
            const enrolledStudent = await User.findOneAndUpdate(
                { _id: userId },
                {
                    $push: {
                        course: courseId,
                    },
                },
                { new: true }
            );
            if (!enrolledStudent) {
                return res.status(500).json({
                    success: false,
                    message: "could not find user",
                });
            }
            const emailResponse = await mailSender(
                enrolledStudent.email,
                "Congratulations from us",
                "Congralations, you are onboard with the course"
            );
            console.log(emailResponse);
            return res.status(200).json({
                success: true,
                message: "signatutre verified and course added",
            });
        } catch (err) {
            console.log(err);
            return res.status(500).json({
                success: false,
                message: "could not verify signature",
                error: err.message,
            });
        }
    } else {
        return res.status(400).json({
            success: false,
            message: "invalid request",
        });
    }
};
