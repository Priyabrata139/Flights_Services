const  express  = require('express');
const router = express.Router();
const { FlightMiddlewares } = require('../../middlewares');
const {  FlightController } = require('../../controllers');
console.log(router);

router.post('/',FlightMiddlewares.validateCreateRequest,FlightController.createFlight);

router.get('/',FlightController.getAllFlights);

router.patch('/:id',
FlightMiddlewares.validateUpdateRequest, 
FlightController.updateFlight);

router.get('/:id', 
FlightController.getFlight);



// /api/v1/flights/:id/seats PATCH
router.patch(
    '/:id/seats', 
    FlightMiddlewares.validateUpdateSeatsRequest,
    FlightController.updateSeats
);

module.exports=router; 