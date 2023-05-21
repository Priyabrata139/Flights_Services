const { StatusCodes } = require("http-status-codes");

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

module.exports={
    validateCreateRequest
}