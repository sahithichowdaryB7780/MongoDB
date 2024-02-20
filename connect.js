const mongoose = require('mongoose');

async function connectToDatabase() {
  try {
    await mongoose.connect('mongodb://localhost:27017/demo_db');
    console.log('Connected to MongoDB');
  } catch (error) {
    console.error('Failed to connect to MongoDB:', error.message);
    // Optionally, throw the error to propagate it to the caller
    throw error;
  }
}

module.exports = connectToDatabase;


