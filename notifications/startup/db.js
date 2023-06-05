const winston = require("winston");
const mongoose = require("mongoose");

module.exports = async function () {
  await mongoose.connect(process.env.DATABASE_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  });
  winston.info("Connected to MongoDB");
};
