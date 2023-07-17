const express = require('express');

const { CityController } = require('../../controllers');
const { CityMiddlewares, AuthRequestMiddlewares } = require('../../middlewares');

const router = express.Router();

// /api/v1/cities POST
router.post('/',
        AuthRequestMiddlewares.isAdmin,
        CityMiddlewares.validateCreateRequest,
        CityController.createCity);

// /api/v1/cities/:id PATCH
router.patch('/:id', 
AuthRequestMiddlewares.isAdmin,
CityController.updateCity);


// /api/v1/cities/:id DELETE
router.delete('/:id', 
AuthRequestMiddlewares.isAdmin,
CityController.destroyCity);

module.exports = router;