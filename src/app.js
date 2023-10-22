const express = require("express");
const http = require("http");
const https = require("https");
const cors = require("cors");
require("dotenv").config();

// middleware
const app = express();
app.use(express.json());
app.use(cors());

// Using all the routes
const routes = require("./routes/plants.route");
app.use("/", routes);

// App server
app.listen(process.env.PORT || 3000, function (err) {
  if (err) console.log("Error in server setup");
  console.log("Server listening on Port", process.env.PORT);
});

module.exports = { app };
