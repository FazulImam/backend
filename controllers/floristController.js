const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const httpStatus = require("http-status");
const catchAsync = require("../utils/catchAsync");
const Florist = require("../models/Florist");
const ApiError = require("../utils/ApiError");

exports.getAllFlorist = catchAsync(async (req, res) => {
  try {
    const florists = await Florist.findAll();

    res.status(200).json({ florists });
  } catch (error) {}
});

exports.createFlorist = catchAsync(async (req, res) => {
  try {
    if (req.body.password !== req.body.confirmPassword) {
      throw new ApiError();
    }

    const hashPassword = await bcrypt.hash(req.body.password, 10);

    if (!hashPassword) {
      throw new ApiError();
    }

    const florist = await Florist.create(req.body);

    const token = await jwt.sign(
      { floristId: florist.id },
      process.env.SECRET_KEY
    );

    res.status(201).json({});
  } catch (error) {}
});
