const winston = require("winston");

// middleware to handle errors
module.exports = function (err, req, res, next) {
  winston.error(err.message, { metadata: err.stack });
  res.status(500).send("Something Failed.");
};
