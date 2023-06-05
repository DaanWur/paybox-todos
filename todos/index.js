const winston = require("winston");
const express = require("express");

const app = express();

require("dotenv").config();
require("./startup/logging")();
require("./startup/db")();
require("./startup/routes")(app);

const port = process.env.TODOS_PORT || 3000;
app.listen(port, () =>
  winston.info(`Todos service listening on port ${port}...`)
);
