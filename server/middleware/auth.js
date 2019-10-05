'use strict'

const services = require('../services')

function isAuth (req, res, next) {
  if (!req.headers.authorization) {
    return res.status(403).send({ message: 'No tienes autorización' })
  } else {
    const token = req.headers.authorization.split(' ')[1]

    services.decodeToken(token)
      .then(response => {
        if (!response.public) {
          req.user = response.sub
          req.userName = response.userName
          req.fullName = response.fullName
        } else {
          return res.status(403).send({ message: 'No tienes autorización' })
        }
        next()
      })
      .catch(response => {
        res.status(500).send({ message: 'Token invalido' })
      })
  }
}

module.exports = isAuth
