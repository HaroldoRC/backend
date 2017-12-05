const restful = require('node-restful')
const mongoose = restful.mongoose

const paramSchema = new mongoose.Schema({
  name: { type: String },
  chanel: {type: Number },
  value: { type: Number }
})

const cannonSchema = new mongoose.Schema({
  name: { type: String },
  ip: { type: String },
  chanel: { type: Number },
  params: [paramSchema]
})

const cannonSceneSchema = new mongoose.Schema({
  name: { type: String },
  desc: { type: String },
  cannons: [cannonSchema]
})

module.exports = restful.model('CannonScene', cannonSceneSchema)