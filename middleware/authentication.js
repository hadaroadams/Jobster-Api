const { Unathorized } = require("./../errors/index");
const jwt = require("jsonwebtoken");

const authenticationMiddleWare = (req, res, next) => {
  const { authorization } = req.headers;
  if (!authorization || !authorization.startsWith("Bearer ")) {
    return next(new Unathorized("Authentication Invalid"));
  }
  const token = authorization.split(" ")[1];
  console.log(token);

  jwt.verify(token, process.env.JWT_SECRETE, (error, payload) => {
    if (error) {
      return next(new Unathorized("Authentication Invalid"));
    } else {
      const { id, name } = payload;
      req.user = { userId: id, username: name };
      next()
    }
  });
};

module.exports = authenticationMiddleWare