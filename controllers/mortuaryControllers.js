const Mortuary = require("../models/Mortuary");
const httpStatus = require("http-status");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const catchAsync = require("../utils/catchAsync");
const ApiError = require("../utils/ApiError");
const Florist = require("../models/Florist");

exports.mortuaryLogin = catchAsync(async (req, res) => {
  const mortuary = await Mortuary.findOne({ where: { email: req.body.email } });

  if (!mortuary) {
    throw new ApiError(httpStatus.NOT_FOUND, "User Not Found");
  }

  const comparedPassword = await bcrypt.compare(
    req.body.password,
    mortuary.password
  );

  if (!comparedPassword) {
    throw new ApiError(httpStatus.UNAUTHORIZED, "Invalid Credentials");
  }

  const token = jwt.sign(
    { mortuary: mortuary.id, role: mortuary.role },
    process.env.SECRET_KEY
  );

  res.status(200).json({ token });
});

exports.mortuaryRegister = catchAsync(async (req, res) => {
  const body = req.body;

  if (!body.password) {
    throw new ApiError(httpStatus.BAD_REQUEST, "Password can't be Null");
  }

  if (body.password !== body.confirmPassword) {
    throw new ApiError(httpStatus.BAD_REQUEST, "Password do not Match");
  }

  const hashPassword = await bcrypt.hash(body.password, 10);

  req.body.password = hashPassword;

  const mortuary = await Mortuary.create(req.body);

  const token = jwt.sign(
    { mortuaryId: mortuary.id, role: mortuary.role },
    process.env.SECRET_KEY
  );

  res.status(201).json({ result: true, token });
});

exports.getAllMortuaries = catchAsync(async (req, res) => {
  const mortuaries = await Mortuary.findAll();

  if (!mortuaries) {
    throw new ApiError(httpStatus.NOT_FOUND, "No Mortuaries found");
  }

  res.status(200).json({ mortuaries });
});

exports.getSingleMortuary = catchAsync(async (req, res) => {
  const mortuary = await Mortuary.findOne({ where: { id: req.params.id } });

  if (!mortuary) {
    throw new ApiError(404, "no mortuary found");
  }

  res.status(200).json({ success: true, mortuary });
});
