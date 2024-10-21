const jwt = require("jsonwebtoken");
const ApiError = require("../utils/ApiError");
const httpStatus = require("http-status");

module.exports = (user) => {
  return async (req, res, next) => {
    if (!req.get("Authorization")) {
      throw new ApiError(401, "Not Authenticated");
    }
    const token = req.get("Authorization").split(" ")[1];

    let verifiedtToken;
    try {
      verifiedtToken = jwt.verify(token, process.env.SECRET_KEY);

      if (!verifiedtToken) {
        throw new ApiError(httpStatus[401], "Not Authenticated");
      }

      if (user !== verifiedtToken.role) {
        throw new ApiError(httpStatus.UNAUTHORIZED, "Not Authorized");
      }

      req.userId = verifiedtToken.userId;

      next();
    } catch (error) {
      next(error);
    }
  };
};
