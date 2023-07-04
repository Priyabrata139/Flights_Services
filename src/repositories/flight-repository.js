const CrudRepository = require("../repositories/crud-repository");

const { Sequelize } = require("sequelize");
const { flights, Airplane, Airport, City } = require("../models");
const AppError = require("../utils/errors/app-error");
const { StatusCodes } = require("http-status-codes");
const db = require("../models");
const { addRowLockOnFlights } = require("./queries");

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
    const t =await db.sequelize.transaction();
    try {
      await db.sequelize.query(addRowLockOnFlights(flightId));
      const flight = await flights.findByPk(flightId);
      if (!flight) {
        throw new AppError("Can't find the flight", StatusCodes.NOT_FOUND);
      }
   
      let flag = dec == "true" || dec == true ? true : false;
      if (flag) {
        
        await flight.decrement("totalSeats", { by: seats }, {transaction: t});
      } else {
    
        await flight.increment("totalSeats", { by: seats }, {transaction: t});
      }
      await t.commit();

      return flight;
    } catch (error) {
      
     await t.rollback();
      throw error;
    }
  }
}

module.exports = FlightRepository;
