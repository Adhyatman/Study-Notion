const mongoose = require("mongoose");
const mailSender = require("../utils/mailSender");

const OTPSchema = new mongoose.Schema({
  email: {
    type: String,
    required: true,
  },
  otp: {
    type: String,
    required: true,
  },
  createdAt: {
    type: Date,
    default: Date.now(),
    expires: 5 * 60,
  },
});

//a function to send email
async function sendVerificationEmail(email, otp) {
  try {
    const mailResponse = await mailSender(email, "verification email from studynotion", otp);
    console.log("email sent successfully", mailResponse);
  } catch (e) {
    console.log("error occured in sending mail", e.message);
    throw e;
  }
}

OTPSchema.pre("save", async function (next) {
  await sendVerificationEmail(this.email, this.otp);
  next();
});

module.exports = mongoose.model("OTP", OTPSchema);
