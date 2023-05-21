const { StatusCodes } = require('http-status-codes');
const { FlightService } = require('../services');
const { SuccessResponse,ErrorResponse } = require('../utils/common');


async function createFlight(req,res) {
    try {
        const Flight = await FlightService.createFlight({
            flightNumber:req.body.flightNumber,
            airplaneId:req.body.airplaneId,
            departureAirportId:req.body.departureAirportId,
            arrivalAirportId: req.body.arrivalAirportId,
            arrivalTime: req.body.arrivalTime,
            departureTime: req.body.departureTime,
            price: req.body.price,
            boardingGate: req.body.boardingGate,
            totalSeats: req.body.totalSeats

        });
        SuccessResponse.message='Flight created Succesfully';
        SuccessResponse.data=Flight;
        return res.status(StatusCodes.CREATED).json(SuccessResponse);

    } catch (error) {
        ErrorResponse.message='Cannot created the Flight';
        ErrorResponse.error=error;
        return res.status(error.StatusCodes).json(ErrorResponse);
    }
}

async function getAllFlights(req,res) {
    try {
        
        const Flights = await FlightService.getAllFlights(req.query);
        SuccessResponse.data=Flights;
        return res
        .status(StatusCodes.OK)
        .json(SuccessResponse);
    } catch (error) {
        ErrorResponse.error=error;
        return res
        .status(error.StatusCodes)
        .json(SuccessResponse);
    }
}

module.exports={
    createFlight,
    getAllFlights
}