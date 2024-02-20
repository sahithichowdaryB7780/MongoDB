const connectToDatabase = require('./connect');
const Item = require('./item');

async function main() {
  // Connect to MongoDB
  connectToDatabase();

  // Create a new item
  const newItem = new Item({
    name: 'Sahithi',
    description: 'This is an example item created using Node.js and MongoDB Compass',
  });
  await newItem.save();
  console.log('New item created:', newItem);

  // Read all items
  const allItems = await Item.find();
  console.log('All items:', allItems);

  // Update an item
  const itemToUpdate = allItems[0];
  itemToUpdate.description = 'Updated description';
  await itemToUpdate.save();
  console.log('Updated item:', itemToUpdate);

  // Delete an item
  await Item.deleteOne({_id: itemToUpdate._id});
  console.log('Item deleted');
}

main();
