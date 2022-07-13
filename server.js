const express = require("express");
const cors = require("cors");
const morgan = require("morgan");

// importing the routes
const routes = require("./routes/index");
const helmet = require("helmet");
const path = require("path");

// initializing express
const app = express();
app.use(helmet());
app.use(cors());
app.use(express.json());
// HTTP request middleware logger
app.use(morgan("dev"));

// accessing the routes from the routes folder with /api
app.use("/api", routes);

// defining the port
const PORT = process.env.PORT || 8080;

app.listen(
  PORT,
  console.log(
    `Server running in ${process.env.NODE_ENV} mode on port ${PORT}..`
  )
);
