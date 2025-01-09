const express = require('express');
const router = express.Router();
const flightController = require('../controllers/flightController');

// Route to create a new flight
router.post('/flights', flightController.createFlight);

// Route to update an existing flight
router.put('/flights/:flightNumber', flightController.updateFlight);

// Route to delete a flight
router.delete('/flights/:flightNumber', flightController.deleteFlight);

module.exports = router;
