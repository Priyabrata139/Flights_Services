const  CrudRepository  = require('../repositories/crud-repository');

const { flights } = require('../models');
// console.log(flights);
class FlightRepository extends CrudRepository{
    constructor(){
        super(flights);
    }

   async getAllFlights(filter,sort){
    //    console.log(sort);
        const response = await flights.findAll({
            where:filter,
            order: sort
        });
        return response;
    }
}

// console.log(FlightRepository);
module.exports=FlightRepository;