const { StatusCodes } = require("http-status-codes");
const { FlightService } = require("../services");
const { SuccessResponse, ErrorResponse } = require("../utils/common");

async function createFlight(req, res) {
  try {
    const Flight = await FlightService.createFlight({
      flightNumber: req.body.flightNumber,
      airplaneId: req.body.airplaneId,
      departureAirportId: req.body.departureAirportId,
      arrivalAirportId: req.body.arrivalAirportId,
      arrivalTime: req.body.arrivalTime,
      departureTime: req.body.departureTime,
      price: req.body.price,
      boardingGate: req.body.boardingGate,
      totalSeats: req.body.totalSeats,
    });
    SuccessResponse.message = "Flight created Succesfully";
    SuccessResponse.data = Flight;
    return res.status(StatusCodes.CREATED).json(SuccessResponse);
  } catch (error) {
    console.log('error=',error);
    ErrorResponse.message = "Cannot created the Flight";
    ErrorResponse.error = error;
    return res.status(error.statusCode).json(ErrorResponse);
    
  }
}

async function getAllFlights(req, res) {
  console.log('inside flights api= ',req.body);
  try {
    const Flights = await FlightService.getAllFlights(req.query);
    SuccessResponse.data = Flights;
    return res.status(StatusCodes.OK).json(SuccessResponse);
  } catch (error) {
    ErrorResponse.error = error;
    return res.status(error.StatusCodes).json(SuccessResponse);
  }
}

async function updateFlight(req, res) {
  try {
    const flight = await FlightService.updateFlight(
      {
        totalSeats: req.body.totalSeats,
      },
      req.params.id
    );
    SuccessResponse.data = flight;
    return res.status(StatusCodes.OK).json(SuccessResponse);
  } catch (error) {
    ErrorResponse.error = error;
    return res.status(error.statusCode).json(ErrorResponse);
  }
}

/**
 * GET : /flights/:id
 * req-body {}
 */
async function getFlight(req, res) {
  try {
    const flight = await FlightService.getFlight(req.params.id);
    SuccessResponse.data = flight;
    return res.status(StatusCodes.OK).json(SuccessResponse);
  } catch (error) {
    console.log("error=");
    console.log(error);
    ErrorResponse.error = error;
    return res.status(error.statusCode).json(ErrorResponse);
  }
}

/**
 * PATCH : /flights/:id/seats
 * req-body {seats: 3, dec: true}
 */
async function updateSeats(req, res) {
  try {
    console.log(req.body);
    const response = await FlightService.updateSeats({
      flightId: req.params.id,
      seats: req.body.seats,
      dec: req.body.dec,
    });
    SuccessResponse.data = response;
    return res.status(StatusCodes.OK).json(SuccessResponse);
  } catch (error) {
    ErrorResponse.error = error;
    return res.status(error.statusCode).json(ErrorResponse);
  }
}
module.exports = {
  createFlight,
  getAllFlights,
  updateFlight,
  getFlight,
  updateSeats,
};
