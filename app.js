require("dotenv").config();
require("express-async-errors");
const express = require("express");
const app = express();
// extra security
const helmet = require("helmet");
const cors = require("cors");
const xss = require("xss-clean");
const rateLimit = require("express-rate-limit");
// Swagger
const swaggerUI = require('swagger-ui-express')
const YAML = require('yamljs')
const swaggerDocument = YAML.load('./swagger.yaml')
const mongoose = require("mongoose");
const connectDB = require("./config/dbconn");
const errorHandle = require("./middleware/errorHandle");
const { notFound } = require("./middleware/notFound");
const jobApi = require("./routes/jobs");
const authApi = require("./routes/auth");
const authenticationMiddleWare = require("./middleware/authentication");

connectDB();
const PORT = process.env.PORT || 3900;
// const limiter = rateLimit({
//   windowMS: 15 * 60 * 1000,
//   max: 2,
// });
// middle
//security
app.set("trust proxy", 1);
// app.use(limiter);

//extra security
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(helmet());
app.use(cors());
app.use(xss());

app.use('/api/docs',swaggerUI.serve, swaggerUI.setup(swaggerDocument))
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
