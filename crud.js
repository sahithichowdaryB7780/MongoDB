const mongoose = require('mongoose');

// Define item schema
const itemSchema = new mongoose.Schema({
  name: String,
});

// Define item model
const Item = mongoose.model('Item', itemSchema);

// MongoDB class with CRUD operations
class MongoDB {
  constructor(url, dbName) {
    this.url = url;
    this.dbName = dbName;
  }

  async connect() {
    await mongoose.connect(this.url, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
  }

  async disconnect() {
    await mongoose.disconnect();
  }

  async createItem(itemData) {
    const newItem = new Item(itemData);
    await newItem.save();
    return newItem._id;
  }

  async getItem(id) {
    return await Item.findById(id);
  }

  async updateItem(id, updates) {
    await Item.findByIdAndUpdate(id, updates);
    return id;
  }

  async deleteItem(id) {
    await Item.findByIdAndDelete(id);
    return id;
  }
}

module.exports = MongoDB;


