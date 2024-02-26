const mongoose = require('mongoose');

const connector = new mongoose.Schema({
  Type: String,
  Wattage: String,
  Manufacturer: String,
});

module.exports = mongoose.model('connector', connector);


