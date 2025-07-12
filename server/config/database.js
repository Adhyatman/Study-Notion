require("dotenv").config();

const mongoose = require("mongoose");

exports.connect = () => {
  mongoose
    .connect(process.env.DATABASE_URL)
    .then(() => console.log("connected to database successfully"))
    .catch((e) => {
      console.log("error in conecting to database");
      process.exit(1);
    });
};
