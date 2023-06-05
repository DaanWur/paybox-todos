const winston = require("winston");
const express = require("express");

const app = express();

require("dotenv").config();
require("./startup/logging")();
require("./startup/db")();
require("./startup/routes")(app);

const port = process.env.NOTIFICATIONS_PORT || 3100;
app.listen(port, () =>
  winston.info(`Notifications service listening on port ${port}...`)
);
