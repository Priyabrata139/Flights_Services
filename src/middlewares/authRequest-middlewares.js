const { StatusCodes } = require("http-status-codes");

const { ErrorResponse } = require("../utils/common");
const AppError = require("../utils/errors/app-error");
var jwt = require('jsonwebtoken');


async function isAdminOrFlightCompany(req, res, next) {
  var userRoles = req.headers["user-roles"];
     userRoles = userRoles.split(",");

  for (role of userRoles) {
    if (role === " admin" || role === "flight_company") {
      console.log("executing next()");
      next();
      return;
    }
  }

  console.log("executeing after next");
  ErrorResponse.message = "Only Admin or Flight-Company can do this operation";
  ErrorResponse.error = new AppError(
    ["Unauthorized access"],
    StatusCodes.BAD_REQUEST
  );
  return res.status(StatusCodes.UNAUTHORIZED).json(ErrorResponse);
}

async function isAdmin(req, res, next) {
    var userRoles = req.headers["user-roles"];
  
    userRoles = userRoles.split(",");
  
    for (role of userRoles) {
      if (role === " admin") {
        console.log("executing next()");
        next();
        return;
      }
    }
  
    console.log("executeing after next");
    ErrorResponse.message = "Only Admin can do this operation";
    ErrorResponse.error = new AppError(
      ["Unauthorized access"],
      StatusCodes.BAD_REQUEST
    );
    return res.status(StatusCodes.UNAUTHORIZED).json(ErrorResponse);
  }

  async function isAuthorisedForUpdateflightsSeats(req, res, next) {

    try {
      const token = req.headers["jwt_token"];
      const jwt_secret_key = req.headers["jwt_secret_key"];
      var decoded = jwt.verify(token, jwt_secret_key);
      next();
    } catch (error) {
      ErrorResponse.message = "This operation can't be done without any booking";
      ErrorResponse.error = new AppError(["jwt token verification failed in updateSeats api in flights service"], StatusCodes.BAD_REQUEST);
      return res.status(StatusCodes.UNAUTHORIZED).json(ErrorResponse);
    }
  }

module.exports = {
  isAuthorisedForUpdateflightsSeats,
  isAdminOrFlightCompany,
  isAdmin
};
