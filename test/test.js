const connectToDatabase = require('../connect');
const Item = require('../item');
const mongoose = require('mongoose');
const { expect } = require('chai');

describe('main function', () => {
  // Establish database connection before tests
  beforeEach(async function () {
  this.timeout(5000); // Set timeout to 5 seconds
  await connectToDatabase();
});

afterEach(async function () {
  this.timeout(5000); // Set timeout to 5 seconds
  await mongoose.connection.close();
});
  it('should create, read, update, and delete an item', async () => {
    // Create a new item
    const newItem = new Item({
      name: 'Sahithi',
      description: 'This is an example item created using Node.js and MongoDB Compass',
    });
    await newItem.save();

    // Read all items
    const allItems = await Item.find();
    expect(allItems).to.deep.include(newItem.toObject());

    // Update an item
    newItem.description = 'Updated description';
    await newItem.save();

    // Verify the item was updated
    const updatedItem = await Item.findById(newItem._id);
    expect(updatedItem.description).to.equal('Updated description');

    // Delete an item
    await Item.deleteOne({_id: newItem._id});

    // Verify the item was deleted
    const deletedItem = await Item.findById(newItem._id);
    expect(deletedItem).to.be.null;
  });

  
});
