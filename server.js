const express = require("express");
const mongoose = require("mongoose");
const connectDB = require("./config/dbConfig");
const axios = require('axios');
const userRoutes = require("./routes/userRoutes");
const cors = require("cors");
const profileRoutes = require('./routes/profileRoutes');
const flightRoutes = require('./routes/flightRoutes');

require("dotenv").config();

const app = express();

app.use(cors());
app.use(express.json());  

connectDB();

app.use("/user", userRoutes);

app.use('/api', profileRoutes);

app.use('/api', flightRoutes);

app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).json({ error: "Something went wrong!" });
  });
  
  // Start server
  const PORT = process.env.PORT || 5000;
  if (!process.env.MONGO_URI || !process.env.JWT_SECRET) {
    console.error("Missing essential environment variables: MONGO_URI or JWT_SECRET");
    process.exit(1); 
  }
  app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
  });
