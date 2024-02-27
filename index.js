const Connector = require('./connector');
async function create(type, wattage, manufacturer) {
  await Connector.create({
    Type: type,
    Wattage: wattage,
    Manufacturer: manufacturer,
  });
  return 1;
}
async function read(type) {
  const result = await Connector.find({Type: type});
  return result.length > 0 ? 1 : 0;
}

async function update(type, manufacturer) {
  const result = await Connector.updateOne({Type: type}, {$set: {Manufacturer: manufacturer}});
  return result.acknowledged && result.modifiedCount > 0 ? 1 : 0;
}


async function remove(type) {
  const result = await Connector.deleteOne({Type: type});
  return result.deletedCount > 0 ? 1 : 0;
}
module.exports = {create, read, update, remove};





