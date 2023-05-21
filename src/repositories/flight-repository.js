const CrudRepository = require("../repositories/crud-repository");

const { flights, Airplane, Airport, City } = require("../models");

// console.log(Airplane);
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
}

// console.log(FlightRepository);
module.exports = FlightRepository;
