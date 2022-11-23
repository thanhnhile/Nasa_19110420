const mongoose = require('mongoose')
const Schema = mongoose.Schema

const launcheSchema = new Schema({
  flightNumber: { type: Number, require: true },
  mission: { type: String, require: true },
  rocket: { type: String, require: true },
  launchDate: { type: Date, require: true },
  target: { type: String, require: true },
  customer: { type: [String] },
  upcoming: { type: Boolean, require: true, default: true },
  success: { type: Boolean, require: true, default: true },
})

module.exports = mongoose.model('Lauche', launcheSchema)
