const connectToDatabase = require('../connect');
const Item = require('../item');
const mongoose = require('mongoose');
const { expect } = require('chai');

describe('main function', () => {
  // Establish database connection before tests
  before(async () => {
    await connectToDatabase();
  });

  // Disconnect from database after tests
  after(async () => {
    await mongoose.connection.close();
  });

  
});
