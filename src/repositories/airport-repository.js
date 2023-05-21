const CrudRepository = require('./crud-repository');

const { Airport } = require('../models');
// console.log(Airport);
class AirportRepository extends CrudRepository{
    constructor(){
        super(Airport);
    }
}

module.exports=AirportRepository;