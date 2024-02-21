const assert = require('assert');
const MongoDB = require('../index');
const mongoose = require('mongoose');
describe('MongoDB CRUD operations', function() {
  let mongoDB;

  before(async function() {
    mongoDB = new MongoDB('mongodb://127.0.0.1:27017', 'demo_db'); // Assuming MongoDB is running locally
    await mongoDB.connect();
  });

  after(async function() {
    await mongoDB.disconnect();
  });

  beforeEach(async function() {
    // Clear the items collection before each test
    await mongoDB.db.collection('names').deleteMany({});
  });

  it('should successfully connect to the MongoDB database', async function() {
    assert.strictEqual(mongoose.connection.readyState, 1);
  });

  it('should create an item', async function() {
    const itemId = await mongoDB.createItem({name: 'Test Item'});
    assert.ok(itemId);

    const item = await mongoDB.getItem(itemId);
    assert.deepStrictEqual(item.toObject(), {_id: itemId, name: 'Test Item'});
  });

  it('should get an item', async function() {
    const newItem = {name: 'Test Item'};
    const savedItem = await new mongoDB.db.collection('items').insertOne(newItem);
    const item = await mongoDB.getItem(savedItem.insertedId);
    assert.deepStrictEqual(item.toObject(), {_id: savedItem.insertedId, name: 'Test Item'});
  });

  it('should update an item', async function() {
    const savedItem = await mongoDB.createItem({name: 'Test Item'});

    await mongoDB.updateItem(savedItem, {name: 'Updated Item'});

    const updatedItem = await mongoDB.getItem(savedItem);
    assert.strictEqual(updatedItem.name, 'Updated Item');
  });

  it('should delete an item', async function() {
    const savedItem = await mongoDB.createItem({name: 'Test Item'});

    await mongoDB.deleteItem(savedItem);

    const deletedItem = await mongoDB.getItem(savedItem);
    assert.strictEqual(deletedItem, null);
  });
});
