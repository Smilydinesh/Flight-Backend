const Flight = require('../models/flightModel');

// Create a new flight
exports.createFlight = async (req, res) => {
  try {
    const { source, destination, date, time, price, seats } = req.body;

    // Validate that all fields are provided
    if (!source || !destination || !date || !time || !price || !seats) {
      return res.status(400).json({ message: 'All fields are required' });
    }

    // Split the seats string into an array
    const seatArray = seats.split(',').map(seat => seat.trim());

    // Create a new flight instance
    const newFlight = new Flight({
      source,
      destination,
      date,
      time,
      price,
      seats: seatArray,
    });

    // Save the new flight to the database
    await newFlight.save();

    res.status(201).json({
      message: 'Flight created successfully',
      flight: newFlight,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error creating flight' });
  }
};

// Update a flight
exports.updateFlight = async (req, res) => {
  try {
    const { source, destination, date, time, price, seats } = req.body;
    const flightNumber = req.params.flightNumber;

    // Split the seats string into an array
    const seatArray = seats.split(',').map(seat => seat.trim());

    // Find and update the flight
    const updatedFlight = await Flight.findByIdAndUpdate(
      flightNumber,
      { source, destination, date, time, price, seats: seatArray },
      { new: true }
    );

    // Check if the flight was found and updated
    if (!updatedFlight) {
      return res.status(404).json({ message: 'Flight not found' });
    }

    res.status(200).json({
      message: 'Flight updated successfully',
      flight: updatedFlight,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error updating flight' });
  }
};

// Delete a flight
exports.deleteFlight = async (req, res) => {
  try {
    const flightNumber = req.params.flightNumber;

    // Find and delete the flight
    const deletedFlight = await Flight.findByIdAndDelete(flightNumber);

    // Check if the flight was found and deleted
    if (!deletedFlight) {
      return res.status(404).json({ message: 'Flight not found' });
    }

    res.status(200).json({ message: 'Flight deleted successfully' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error deleting flight' });
  }
};
