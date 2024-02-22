require("dotenv").config();
require("express-async-errors");
const express = require("express");
const app = express();
const mongoose = require("mongoose");
const connectDB = require("./config/dbconn");
const errorHandle = require("./middleware/errorHandle");
const { notFound } = require("./middleware/notFound");
const jobApi = require("./routes/jobs");
const authApi = require("./routes/auth");
const authenticationMiddleWare = require("./middleware/authentication");

connectDB();
const PORT = process.env.PORT || 3900;
// middle ware

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// routes
app.use("/api/v1/auth", authApi);
app.use("/api/v1/jobs", authenticationMiddleWare, jobApi);

// error handle middle ware
app.use(errorHandle);
app.use(notFound);

mongoose.connection.once("open", () => {
  console.log("conneted to mongoDB");
  app.listen(PORT, () => {
    console.log(`server running on port ${PORT} `);
  });
});
