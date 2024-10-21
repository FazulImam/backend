const catchAsync = require("../utils/catchAsync");
const ApiError = require("../utils/ApiError");
const Obituary = require("../models/Obituary");
const httpStatus = require("http-status");

exports.getAllObituaries = catchAsync(async (req, res) => {
  const obituaries = await Obituary.findAll();

  // findAll filter

  // {
  //   // where: { mortuaryId: req.mortuaryId },
  // }
  if (!obituaries) {
    throw new ApiError(httpStatus.NOT_FOUND, "No Obituary Found");
  }

  res.status(200).json({
    data: obituaries,
  });
});

exports.getSingleObituary = catchAsync(async (req, res) => {
  const obituary = await Obituary.findOne({ where: { id: req.params.id } });

  if (!obituary) {
    throw new ApiError(httpStatus.NOT_FOUND, "obituary not found");
  }

  res.status(200).json({ success: true, obituary });
});

exports.createObituary = catchAsync(async (req, res) => {
  const image = req.file;

  if (!image) {
    throw new ApiError(422, "Image not found");
  }

  req.body.imageUrl = image.path;

  req.body.mortuaryId = req.mortuaryId;

  const obituary = await Obituary.create(req.body);

  res.status(201).json({ obituary });
});

exports.getSingleObituary = catchAsync(async (req, res) => {
  console.log(req.params.id);
  const obituary = await Obituary.findOne({
    where: { id: req.params.id },
  });

  if (!obituary) {
    throw new ApiError(404, "not found");
  }

  res.status(200).json({ success: true, obituary });
});

exports.updateObituary = catchAsync(async (req, res) => {
  const obituaryToUpdate = await User.findByPk(req.params.id);

  if (!obituaryToUpdate) {
    throw new ApiError(404, "Obituary Not found");
  }

  obituaryToUpdate.country = req.body.country || null;
  obituaryToUpdate.cementry = req.body.cementry || null;
  obituaryToUpdate.funeralTime = req.body.funeralTime || null;
  obituaryToUpdate.funeralDay = req.body.funeralDay || null;

  await userToUpdate.save();

  res.status(200).json({
    success: true,
    obituary: obituaryToUpdate,
  });
});

exports.deleteObituary = catchAsync(async (req, res) => {
  try {
    console.log(req.params.id);
  } catch (error) {}
});
