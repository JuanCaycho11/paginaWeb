'use strict'

const mongoose = require('mongoose')
const Schema = mongoose.Schema

var BaseSchema = Schema({
  name: { type: String, required: true, trim: true, maxlenght: 40 },
  description: { type: String, trim: true, maxlenght: 100 }
})

module.exports = mongoose.model('Base', BaseSchema)
