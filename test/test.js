const {expect} = require('chai');
const mongoose = require('mongoose');
const {create, read, update, remove} = require('../index');
const {MongoMemoryServer} = require('mongodb-memory-server');

let mongoServer;

async function connect() {
  mongoServer = new MongoMemoryServer();
  await mongoServer.start();
  const uri = await mongoServer.getUri();
  await mongoose.connect(uri);
  return 1;
}
async function disconnect() {
  // drops the database
  await mongoose.connection.dropDatabase();
  await mongoose.disconnect();
  await mongoServer.stop();
  return 1;
}

describe('Test Suite', () => {
  before(async () => {
    const result = await connect();
    expect(result).to.equal(1);// Connect to the in-memory MongoDB server before running tests
  });

  after(async () => {
    const result = await disconnect();
    expect(result).to.equal(1); // Disconnect from the in-memory MongoDB server after running tests
  });

  beforeEach(async () => {
    // Create documents in the database before each test case
    await create('Type-A', '15W', 'ABC Electronics');
  });

  afterEach(async () => {
    // Check if document of type 'Type-A' exists before attempting to remove it
    const existingDocument = await read('Type-A');

    if (existingDocument === 1) {
      // If document of type 'Type-A' exists, remove it
      await remove('Type-A');
    }
  });


  describe('create function', () => {
    it('should create a document in the database', async () => {
      const createDone = await create('Type-D', '15W', 'ABC Electronics');
      expect(createDone).to.equal(1);
    });
  });


  describe('read function', () => {
    it('should return 1 if document with given type exists', async () => {
      const readDone = await read('Type-A');
      expect(readDone).to.equal(1);
    });

    it('should return 0 if document with given type does not exist', async () => {
      const readDone = await read('Micro-HDMI');
      expect(readDone).to.equal(0);
    });
  });

  describe('update function', () => {
    it('should update the manufacturer of existing document', async () => {
      const updateDone = await update('Type-A', 'A Electronics');
      expect(updateDone).to.equal(1);
    });

    it('should return 0 if document with given type does not exist', async () => {
      const updateDone = await update('Micro-HDMI', 'ABC Electronics');
      expect(updateDone).to.equal(0);
    });
  });

  describe('remove function', () => {
    it('should remove the document with given type', async () => {
      const removeDone = await remove('Type-A');
      expect(removeDone).to.equal(1);
    });

    it('should return 0 if document with given type does not exist', async () => {
      const removeDone = await remove('Micro-HDMI');
      expect(removeDone).to.equal(0);
    });
  });
});
