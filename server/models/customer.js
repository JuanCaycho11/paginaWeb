'use strict'

const mongoose = require('mongoose')
const Schema = mongoose.Schema

var CustomerSchema = Schema({
  idBase: { type: Schema.Types.ObjectId, ref: 'Base', required: true },
  name: { type: String, required: true, trim: true, maxlenght: 100 },
  address: { type: String, trim: true },
  phone: { type: Number, trim: true }
})

module.exports = mongoose.model('Customer', CustomerSchema)
