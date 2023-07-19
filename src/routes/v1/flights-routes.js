const  express  = require('express');
const router = express.Router();
const { FlightMiddlewares, AuthRequestMiddlewares } = require('../../middlewares');
const {  FlightController } = require('../../controllers');
console.log(router);

router.post('/',AuthRequestMiddlewares.isAdminOrFlightCompany, FlightMiddlewares.validateCreateRequest, FlightController.createFlight);

router.get('/',FlightController.getAllFlights);

router.patch('/:id',
AuthRequestMiddlewares.isAdminOrFlightCompany,
FlightMiddlewares.validateUpdateRequest, 
FlightController.updateFlight);

router.get('/:id', 
FlightController.getFlight);



// /api/v1/flights/:id/seats PATCH
router.patch(
    '/:id/seats', 
    FlightMiddlewares.validateUpdateSeatsRequest,
    AuthRequestMiddlewares.isAuthorisedForUpdateflightsSeats,
    FlightController.updateSeats
);

module.exports=router; 