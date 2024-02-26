const mongoose = require('mongoose');
const connector = require('./connector');
const {MongoMemoryServer} = require('mongodb-memory-server');

let mongoServer;

async function connect() {
  mongoServer = new MongoMemoryServer();
  await mongoServer.start();
  const uri = await mongoServer.getUri();
  await mongoose.connect(uri);
  return 1;
}


async function create(type, wattage, manufacturer) {
  await connector.create({
    Type: type,
    Wattage: wattage,
    Manufacturer: manufacturer,
  });
  return 1;
}
async function read(type) {
  const result = await connector.find({Type: type});
  return result.length > 0 ? 1 : 0;
}

async function update(type, manufacturer) {
  const existingDocument = await connector.findOne({Type: type});

  // If document exists, perform the update
  if (existingDocument) {
    await connector.updateOne({Type: type}, {$set: {Manufacturer: manufacturer}});
    return 1;
  } else {
    // If document does not exist, return 0
    return 0;
  }
}

async function remove(type) {
  const result = await connector.deleteOne({Type: type});
  return result.deletedCount > 0 ? 1 : 0;
}
async function disconnect() {
  // drops the database
  await mongoose.connection.dropDatabase();
  await mongoose.disconnect();
  await mongoServer.stop();
  return 1;
}
module.exports = {connect, create, read, update, remove, disconnect};


