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

  it('should successfully connect to the MongoDB database', function() {
    return new Promise((resolve, reject) => {
      setTimeout(async () => {
        try {
          assert.strictEqual(mongoose.connection.readyState, 1);
          resolve();
        } catch (error) {
          reject(error);
        }
      }, 2000); // Adjust timeout as needed
    });
  });

it('should create an item', function() {
  return new Promise( (resolve, reject) => {
    mongoDB.createItem({ name: 'Test Item' })
      .then(itemId => {
        assert.ok(itemId);

        return mongoDB.getItem(itemId);
      })
      .then(item => {
        assert.deepStrictEqual(item.toObject(), { name: 'Test Item' });
        resolve();
      })
      .catch(error => {
        reject(error);
      });
  });
});


it('should get an item', function() {
  return new Promise((resolve, reject) => {
    const newItem = { name: 'Test Item' };
    mongoDB.db.collection('items').insertOne(newItem)
      .then(savedItem => {
        mongoDB.getItem(savedItem.insertedId)
          .then(item => {
            assert.deepStrictEqual(item.toObject(), { _id: savedItem.insertedId, name: 'Test Item' });
            resolve();
          })
          .catch(error => {
            reject(error);
          });
      })
      .catch(error => {
        reject(error);
      });
  });
});


  it('should update an item', function() {
  return new Promise((resolve, reject) => {
    mongoDB.createItem({ name: 'Test Item' })
      .then(savedItem => {
        mongoDB.updateItem(savedItem, { name: 'Updated Item' })
          .then(async () => {
            const updatedItem = await mongoDB.getItem(savedItem);
            assert.strictEqual(updatedItem.name, 'Updated Item');
            resolve();
          })
          .catch(error => {
            reject(error);
          });
      })
      .catch(error => {
        reject(error);
      });
  });
});


  it('should delete an item', function() {
    return new Promise( (resolve, reject) => {
      try {
        const savedItem = await mongoDB.createItem({ name: 'Test Item' });
        await mongoDB.deleteItem(savedItem);
        const deletedItem = await mongoDB.getItem(savedItem);
        assert.strictEqual(deletedItem, null);
        resolve();
      } catch (error) {
        reject(error);
      }
    });
  });
});

