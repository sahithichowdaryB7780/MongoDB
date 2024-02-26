const {expect} = require('chai');
const {connect, create, read, update, remove, disconnect} = require('../index');

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
      const result = await create('Type-D', '15W', 'ABC Electronics');
      expect(result).to.equal(1);
    });
  });


  describe('read function', () => {
    it('should return 1 if document with given type exists', async () => {
      const result = await read('Type-A');
      expect(result).to.equal(1);
    });

    it('should return 0 if document with given type does not exist', async () => {
      const result = await read('Micro-HDMI');
      expect(result).to.equal(0);
    });
  });

  describe('update function', () => {
    it('should update the manufacturer of existing document', async () => {
      const result = await update('Type-A', '100W');
      expect(result).to.equal(1);
    });

    it('should return 0 if document with given type does not exist', async () => {
      const result = await update('Micro-HDMI', '7.5W');
      expect(result).to.equal(0);
    });
  });

  describe('remove function', () => {
    it('should remove the document with given type', async () => {
      const result = await remove('Type-A');
      expect(result).to.equal(1);
    });

    it('should return 0 if document with given type does not exist', async () => {
      const result = await remove('Micro-HDMI');
      expect(result).to.equal(0);
    });
  });
});
