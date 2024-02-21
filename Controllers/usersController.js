const User = require("./../models/Users");
const { BadRequest, Unathorized } = require("./../errors/index");
const { StatusCodes } = require("http-status-codes");

const register = async (req, res) => {
  try {
    const { name, email, password } = req.body;
    console.log(req.body);
    console.log(User);
    const user = await User.create({ name, email, password });
    console.log(user);
    const token = user.createJWT();
    res.status(StatusCodes.CREATED).json({ user: { name: user.name }, token });
  } catch (error) {
    console.log(error);
  }
};

const logIn = async (req, res, next) => {
  try {
    const { email, password } = req.body;
    if (!email || !password) {
      return next(new BadRequest("please provide email and password"));
    }
    const user = await User.findOne({ email });
    console.log(user)
    if (!user) {
      return next(new Unathorized("1Invalid Credential"));
    }
    const isPasswordCorrect = user.comparePassword(password);
    if (!isPasswordCorrect) {
      return next(new Unathorized("2Invalid Credential"));
    }
    const token = user.createJWT();
    res.status(StatusCodes.OK).json({ user: { name: user.name }, token });
  } catch (erro) {
    console.log(erro);
  }
};

module.exports = { register, logIn };
