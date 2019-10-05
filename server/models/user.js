'use strict'

const mongoose = require('mongoose')
const Schema = mongoose.Schema
const bcrypt = require('bcrypt-nodejs')
const config = require('../config')

const UserSchema = Schema({
  userName: { type: String, required: true, lowercase: true, trim: true, minlength: 6, maxlenght: 30 },
  password: { type: String, select: false, required: true, minlength: 8, maxlenght: 100 },
  fullName: { type: String, required: true, maxlenght: 100 },
  lastDateLog: Date,
  signUpDate: { type: Date, default: Date.now },
  active: { type: Boolean, default: true }
})

UserSchema.pre('save', function (next) {
  let user = this
  if (!user.isModified('password')) return next()

  bcrypt.hash(user.password + ' ' + config.SECRET_USER, config.SALT, null, (err, hash) => {
    if (err) return next(err)
    user.password = hash
    next()
  })
})

module.exports = mongoose.model('User', UserSchema)
