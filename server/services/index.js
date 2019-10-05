'use strict'

const jwt = require('jwt-simple')
const moment = require('moment')
const config = require('../config')

function createToken (user, dia) {
  const payload = {
    sub: user._id,
    fullName: user.fullName,
    userName: user.userName,
    public: false,
    iat: moment().unix(),
    exp: moment().add(dia, 'days').unix()
  }

  return jwt.encode(payload, config.SECRET_TOKEN)
}

function decodeToken (token) {
  const decoded = new Promise((resolve, reject) => {
    try {
      const payload = jwt.decode(token, config.SECRET_TOKEN)
      if (payload.exp <= moment().unix()) {
        reject(new Error({ status: 401, message: 'El token ha expirado' }))
      }

      resolve(payload)
    } catch (e) {
      reject(new Error({ status: 500, message: 'Invalid Token' }))
    }
  })

  return decoded
}

module.exports = {
  createToken,
  decodeToken
}
