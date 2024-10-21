const jwt = require("jsonwebtoken");
const ApiError = require("../utils/ApiError");

const mortuaryAuth = async (req, res, next) => {
  try {
    if (!req.get("Authorization")) {
      throw new ApiError(401, "not authorized");
    }
    const token = req.get("Authorization").split(" ")[1];
    let verifiedtToken;
    verifiedtToken = jwt.verify(token, process.env.SECRET_KEY);
    console.log(verifiedtToken);
    if (!verifiedtToken) {
      throw new ApiError(httpStatus[401], "Not Authenticated");
    }

    req.mortuaryId = verifiedtToken.mortuaryId;

    next();
  } catch (error) {
    next(error);
  }
};

module.exports = mortuaryAuth;
