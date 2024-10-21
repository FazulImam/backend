module.exports = (err, req, res, next) => {
  res.status(err.statusCode || 500).json({
    Error: err.message || "Server error",
  });
};
