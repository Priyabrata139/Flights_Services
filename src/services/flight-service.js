const { StatusCodes } = require('http-status-codes');
const {FlightRepository} = require('../repositories');

const AppError = require('../utils/errors/app-error');
const { Op } = require('sequelize');
console.log(FlightRepository);
const flightRepository = new FlightRepository();


async function createFlight(data) {
    try {
        const response = await flightRepository.create(data);
        return response;
    } catch (error) {
        if (error.name == 'SequelizeUniqueConstraintError') {
            let explantion=[];
            error.errors.forEach(err => {
                explantion.push(err.message);
            });
        throw new AppError(explantion,StatusCodes.BAD_REQUEST);
        }
        console.log(error);
        throw new AppError(['Something went wrong while creating the fligjt'],StatusCodes.INTERNAL_SERVER_ERROR);
    }
}


async function getAllFlights(query) {
    try {
    
    let customFilter={};
    let sortFilter;
    if(query.trips){
        let departureAirportId,arrivalAirportId;
        [departureAirportId,arrivalAirportId] = query.trips.split('-');
        
      
        customFilter.departureAirportId=departureAirportId;
        customFilter.arrivalAirportId=arrivalAirportId;
    
    }
    if (query.price) {
        let startingPrice,endingPrice;
        let defaultEndingPrice;

        [startingPrice,endingPrice] = query.price.split('-');

        defaultEndingPrice= parseInt(startingPrice) +1000;
        customFilter.price = {
            [Op.between] : [startingPrice,endingPrice==undefined?defaultEndingPrice:endingPrice]
        }
    }
    if (query.travellers) {
        customFilter.totalSeats = {
            [Op.gte] : query.travellers
        }
    }
    if (query.tripDate) {
        let startingDepartureTime, endingDepartureTime, defaultTime;
        

        startingDepartureTime = query.tripDate;
        [endingDepartureTime, defaultTime] = startingDepartureTime.split('T');
        defaultTime = 'T23:59:59.000Z';
        endingDepartureTime=endingDepartureTime+defaultTime;
        customFilter.departureTime = {
            [Op.between] : [startingDepartureTime, endingDepartureTime]
        }
        console.log(endingDepartureTime);
    }


    if (query.sort) {
        let params = query.sort.split(',');
        console.log(params);
        sortFilter = params.map((val)=>val.split('_'));
    }
    
    const Flights= await flightRepository.getAllFlights(customFilter,sortFilter);
    return Flights;
    } catch (error) {
        console.log(error);
        throw new AppError(['Something went wrong while creating the fligjt'],StatusCodes.INTERNAL_SERVER_ERROR);
    }

}


async function getFlight(id) {
    try {
        const flight = await flightRepository.get(id);
        return flight;
    } catch(error) {
        if(error.statusCode == StatusCodes.NOT_FOUND) {
            throw new AppError('The flight you requested is not present', error.statusCode);
        }
        throw new AppError('Cannot fetch data of all the flights', StatusCodes.INTERNAL_SERVER_ERROR);
    }
}

async function updateFlight(data,id) {
    try {
       
        const flight = await flightRepository.update(data,id);
        return flight;
    } catch(error) { 
        console.log(error);
        if(error.statusCode == StatusCodes.NOT_FOUND) {
            throw new AppError('The flight you requested to update is not present', error.statusCode);
        }
        else if(error.name == 'SequelizeValidationError') {
            let explanation = [];
            error.errors.forEach((err) => {
                explanation.push(err.message);
            });
            throw new AppError(explanation, StatusCodes.BAD_REQUEST);
        }
        throw new AppError('Cannot fetch data of all the flights', StatusCodes.INTERNAL_SERVER_ERROR);
    }
}





async function updateSeats(data) {
    try {
        const response = await flightRepository.updateRemainingSeats(data.flightId, data.seats, data.dec);
        return response;
    } catch(error) {
       
        if(error.statusCode == StatusCodes.NOT_FOUND) {
            throw new AppError('The flight you requested to update is not present', error.statusCode);
        }
        throw new AppError('Cannot update data of the flight', StatusCodes.INTERNAL_SERVER_ERROR);
    }
}

module.exports={
    createFlight,
    getAllFlights,
    getFlight,
    updateFlight,
    updateSeats
    
}