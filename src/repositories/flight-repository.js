const CrudRepository = require("../repositories/crud-repository");

const { Sequelize } = require('sequelize');
const { flights, Airplane, Airport, City } = require("../models");
const AppError = require("../utils/errors/app-error");
const { StatusCodes } = require("http-status-codes");
const db = require('../models');
const { addRowLockOnFlights } = require('./queries');

class FlightRepository extends CrudRepository {
  constructor() {
    super(flights);
  }

  async getAllFlights(filter, sort) {
    const response = await flights.findAll({
      where: filter,
      order: sort,
      include: [
        {
          model: Airplane,
        },
        {
          model: Airport,
          as: "departureAirport",
          include: {
            model: City,
          },
        },
        {
          model: Airport,
          as: "arrivalAirport",
          include: {
            model: City,
          },
        },
      ],
    });
    return response;
  }

 

  async updateRemainingSeats(flightId, seats, dec = true) {
    await db.sequelize.query(addRowLockOnFlights(flightId));
    const flight = await flights.findByPk(flightId);
    if(!flight) {
      throw new AppError('', StatusCodes.NOT_FOUND);
     }
    console.log(flight);
    let flag = dec == "true" || dec == true ? true : false;
    if(flag) {
      console.log("dec");
        await flight.decrement('totalSeats', {by: seats});
    } else {
      console.log("inc");

        await flight.increment('totalSeats', {by: seats});
    }
    return flight;
 }

}

module.exports = FlightRepository;
