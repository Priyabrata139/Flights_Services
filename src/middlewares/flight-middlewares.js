const { StatusCodes } = require("http-status-codes");
const { ErrorResponse, SuccessResponse } = require("../utils/common");
const AppError = require("../utils/errors/app-error");

function validateCreateRequest(req,res,next) {
    if (! req.body.flightNumber) {
        return res
        .status(StatusCodes.BAD_REQUEST)
        .json({
            message:'flightNumber is not found in the incomeing request',
            status:false,
            data:{},
            error:{}
        });

    }
    if (! req.body.airplaneId) {
        return res
        .status(StatusCodes.BAD_REQUEST)
        .json({
            message:'airplaneId is not found in the incomeing request',
            status:false,
            data:{},
            error:{}
        });

    }
    if (! req.body.departureAirportId) {
        return res
        .status(StatusCodes.BAD_REQUEST)
        .json({
            message:'departureAirportId is not found in the incomeing request',
            status:false,
            data:{},
            error:{}
        });

    }
    if (! req.body.arrivalAirportId) {
        return res
        .status(StatusCodes.BAD_REQUEST)
        .json({
            message:'arrivalAirportId is not found in the incomeing request',
            status:false,
            data:{},
            error:{}
        });

    }
    if (! req.body.arrivalTime) {
        return res
        .status(StatusCodes.BAD_REQUEST)
        .json({
            message:'arrivalTime is not found in the incomeing request',
            status:false,
            data:{},
            error:{}
        });

    }
    if (! req.body.departureTime) {
        return res
        .status(StatusCodes.BAD_REQUEST)
        .json({
            message:'departureTime is not found in the incomeing request',
            status:false,
            data:{},
            error:{}
        });

    }
    if (! req.body.price) {
        return res
        .status(StatusCodes.BAD_REQUEST)
        .json({
            message:'price is not found in the incomeing request',
            status:false,
            data:{},
            error:{}
        });

    }
    if (! req.body.totalSeats) {
        return res
        .status(StatusCodes.BAD_REQUEST)
        .json({
            message:'totalSeats is not found in the incomeing request',
            status:false,
            data:{},
            error:{}
        });

    }
    next();
}

async function validateUpdateRequest(req, res, next) {
    if(!req.body.totalSeats) { 
        ErrorResponse.message = 'Something went wrong while updateing flight';
        ErrorResponse.error = new AppError(['totalSeats not found in the incoming request in the correct form'], StatusCodes.BAD_REQUEST);
        return res
                .status(StatusCodes.BAD_REQUEST)
                .json(ErrorResponse);
    }
    next();
}




function validateUpdateSeatsRequest(req, res, next) {
    if(!req.body.seats) {
        ErrorResponse.message = 'Something went wrong while updateing flight setas';
        ErrorResponse.error = new AppError(['seats not found in the incoming request in the correct form'], StatusCodes.BAD_REQUEST);
        return res
                .status(StatusCodes.BAD_REQUEST)
                .json(ErrorResponse);
    }

    if(!req.headers['jwt_token']) {
        ErrorResponse.message = 'Something went wrong while updateing flight seats';
        ErrorResponse.error = new AppError(['jwt_token is not found in the incoming request headers in the correct form'], StatusCodes.BAD_REQUEST);
        return res
                .status(StatusCodes.BAD_REQUEST)
                .json(ErrorResponse);
    }


    next();
}
module.exports={
    validateUpdateRequest,
    validateCreateRequest,
    validateUpdateSeatsRequest
   
}