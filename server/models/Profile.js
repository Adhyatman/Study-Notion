const mongoose = require("mongoose");

const profileSchema = new mongoose.Schema({
    gender: {
        type: String,
        enum: ["male", "female"],
        // required: true,
        trim: true,
    },
    dateOfBirth: {
        type: String,
        // required: true,
        trim: true,
    },
    about: {
        type: String,
        trim: true,
    },
    contactNumber: {
        type: Number,
        trim: true,
        // required: true,
    },
});

module.exports = mongoose.model("Profile", profileSchema);
