const httpStatus = require("http-status");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const catchAsync = require("../utils/catchAsync");
const User = require("../models/User");
const ApiError = require("../utils/ApiError");

exports.register = catchAsync(async (req, res, next) => {
  const body = req.body;

  if (!body.password) {
    next(ApiError(httpStatus.BAD_REQUEST, "Password can't be Null"));
  }

  if (body.password !== body.confirmPassword) {
    next(ApiError(httpStatus.BAD_REQUEST, "Password do not Match"));
  }

  const hashPassword = await bcrypt.hash(body.password, 10);

  const user = await User.create({
    email: body.email,
    password: hashPassword,
  });

  const token = jwt.sign(
    { userId: user.id, role: user.role },
    process.env.SECRET_KEY
  );

  res.status(201).json({ success: true, token, user });
});

exports.login = catchAsync(async (req, res) => {
  const user = await User.findOne({ where: { email: req.body.email } });

  if (!user) {
    next(ApiError(httpStatus.NOT_FOUND, "User Not Found"));
  }

  const comparedPassword = await bcrypt.compare(
    req.body.password,
    user.password
  );

  if (!comparedPassword) {
    next(ApiError(httpStatus.UNAUTHORIZED, "Invalid Credentials"));
  }

  const token = jwt.sign(
    { userId: user.id, role: user.role },
    process.env.SECRET_KEY
  );

  res.status(200).json({ token });
});

exports.changePassword = catchAsync(async (req, res) => {});

exports.verifyEmail = catchAsync(async (req, res) => {});
