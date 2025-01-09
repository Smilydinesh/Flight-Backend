const mongoose = require('mongoose');

// Define Flight schema
const flightSchema = new mongoose.Schema(
  {
    source: {
      type: String,
      required: true, // Source of the flight (e.g., city or airport)
    },
    destination: {
      type: String,
      required: true, // Destination of the flight (e.g., city or airport)
    },
    date: {
      type: Date,
      required: true, // Date of the flight
    },
    time: {
      type: String,
      required: true, // Time of the flight (e.g., "10:30 AM")
    },
    price: {
      type: Number,
      required: true, // Price of the flight
    },
    seats: {
      type: [String], // Store seats as an array of strings (each seat can be represented by its label)
      required: true, // List of available seats
    },
  },
  { timestamps: true }
);

// Create Flight model
const Flight = mongoose.model('Flight', flightSchema);

module.exports = Flight;
