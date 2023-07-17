const express = require('express');

const { AirplaneController } = require('../../controllers');
const { AirplaneMiddlewares, AuthRequestMiddlewares } = require('../../middlewares');

const router = express.Router();

// /api/v1/airplanes POST
router.post('/', 
        AuthRequestMiddlewares.isAdminOrFlightCompany,
        AirplaneMiddlewares.validateCreateRequest,
        AirplaneController.createAirplane);

// /api/v1/airplanes GET
router.get('/', 
        AirplaneController.getAirplanes);

// /api/v1/airplanes/:id GET
router.get('/:id', 
        AirplaneController.getAirplane);

// /api/v1/airplanes/:id DELETE
router.delete('/:id',
        AuthRequestMiddlewares.isAdminOrFlightCompany,
        AirplaneController.destroyAirplane);

 // /api/v1/airplanes/:id PATCH
router.patch('/:id', 
AuthRequestMiddlewares.isAdminOrFlightCompany,
AirplaneMiddlewares.validateUpdateRequest,
AirplaneController.updateAirplane);

module.exports = router;