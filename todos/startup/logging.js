const winston = require("winston");
const moment = require("moment");
const { format } = require("date-fns");

require("express-async-errors");

module.exports = function () {
  const consoleFormat = winston.format.printf(function (info) {
    return `${
      info.level
    }: ${info.message} (${format(new Date(), "yyyy-MM-dd HH:mm:ss")})`;
  });
  winston.exceptions.handle(
    new winston.transports.Console({
      format: winston.format.combine(winston.format.colorize(), consoleFormat),
    }),
    new winston.transports.File({ filename: "uncaughtExceptions.log" })
  );

  process.on("unhandledRejection", (ex) => {
    throw ex;
  });

  winston.add(new winston.transports.File({ filename: "logfile.log" }));
  winston.add(
    new winston.transports.Console({
      format: winston.format.combine(winston.format.colorize(), consoleFormat),
    })
  );
};
