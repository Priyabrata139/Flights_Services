const express = require('express');

const { AirportController } = require('../../controllers');
const { AirportMiddlewares, AuthRequestMiddlewares } = require('../../middlewares');

const router = express.Router();

// /api/v1/airports POST
router.post('/', 
        AuthRequestMiddlewares.isAdminOrFlightCompany,
        AirportMiddlewares.validateCreateRequest,
        AirportController.createAirport);

// /api/v1/airports GET
router.get('/', 
        AirportController.getAirports);

// /api/v1/airports/:id GET
router.get('/:id', 
        AirportController.getAirport);

// /api/v1/airports/:id DELETE
router.delete('/:id', 
        AuthRequestMiddlewares.isAdminOrFlightCompany,
        AirportController.destroyAirport);

 // /api/v1/airports/:id PATCH
router.patch('/:id', 
AuthRequestMiddlewares.isAdminOrFlightCompany,
AirportMiddlewares.validateUpdateRequest,
AirportController.updateAirport);

module.exports = router;