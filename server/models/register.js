'use strict'

const mongoose = require('mongoose')
const Schema = mongoose.Schema

var RegisterSchema = Schema({
  bill: { type: String, required: true, trim: true },
  dateBill: { type: Date, default: Date.now },
  amouPerc: { type: Number },
  datesettlement: { type: Date, default: Date.now },
  voucher: { type: String, trim: true },
  idCustomer: { type: Schema.Types.ObjectId, ref: 'Customer', required: true },
  idBase: { type: Schema.Types.ObjectId, ref: 'Base', required: true },
  state: { type: String },
  incidence: { type: String, trim: true }
})

module.exports = mongoose.model('Register', RegisterSchema)
