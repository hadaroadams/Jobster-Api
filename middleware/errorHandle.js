const { CustomError } = require("./../errors/index");
const { StatusCodes } = require("http-status-codes");

const errorHandle = (err, req, res, next) => {
  console.log(err);
  let customError = {
    statusCode: err.status || StatusCodes.INTERNAL_SERVER_ERROR,
    msg: err.message || "something went wrong try again later",
  };
  if (err.name === "ValidatorError") {
    customError.msg = Object.values(err.errors)
      .map((item) => item.message)
      .join(",");
    customError.statusCode = 400;
  }
  if (err.code && err.code === 11000) {
    customError.msg = `Duplication value entered for ${Object.keys(
      err.keyValue
    )} field, Please choose another value`;
    customError.statusCode = 400;
  }
  if (err.name === "CastError") {
    customError.msg = `No item found with id :${err.value} `;
    customError.stastusCode = 404;
  }
  return res
    .status(customError.statusCode)
    .json(customError.msg)
    .json({ message: "something went wrongf" });
};

module.exports = errorHandle;
