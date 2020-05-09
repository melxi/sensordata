const mongoose = require('mongoose');
const uniqueValidator = require('mongoose-unique-validator');

const sensorSchema = new mongoose.Schema({
  date: {
    type: Date,
    default: Date.now,
    unique: true,
  },
  sensor1: Number,
  sensor2: Number,
  sensor3: Number,
  sensor4: Number
})

sensorSchema.plugin(uniqueValidator)

sensorSchema.set('toJSON', {
  transform: (document, returnedObject) => {
      returnedObject.id = returnedObject._id.toString()
      delete returnedObject._id
      delete returnedObject.__v
  }
})

module.exports = mongoose.model('Sensor', sensorSchema);