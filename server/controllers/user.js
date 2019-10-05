'use strict'

const User = require('../models/user')
const bcrypt = require('bcrypt-nodejs')
const config = require('../config')
const service = require('../services')

function getUsers (req, res) {
  User.find({}, { userName: 1, fullName: 1 }).sort({ userName: 1 }).exec((err, users) => {
    if (err) return res.status(500).send({ message: `Error al realizar la petición ${err}` })
    if (!users) return res.status(400).send({ message: `No existen registros en la base de datos.` })

    res.status(200).send({ data: users })
  })
}

function getUser (req, res) {
  User.findOne({ _id: req.params.userId }, (err, user) => {
    if (err) return res.status(500).send({ message: `Error al realizar la petición ${err}` })
    if (!user) return res.status(404).send({ message: `No se encontro registro en la base de datos.` })
    return res.status(200).send({ data: user })
  })
}

function saveUser (req, res) {
  let user = new User()
  user.userName = req.body.userName
  user.password = req.body.password
  user.fullName = req.body.fullName

  user.save((err, userStored) => {
    if (err) return res.status(500).send({ message: `Error al guardar en la base de datos ${err}` })
    res.status(200).send({ data: 'Guardado con exito.' })
  })
}

function updateUser (req, res) {
  let userId = req.params.userId
  let update = req.body

  User.findByIdAndUpdate(userId, update, (err, userUpdated) => {
    if (err) return res.status(500).send({ message: `Error al actualizar en la base de datos ${err}` })
    res.status(200).send({ data: `Se actualizaron los datos.` })
  })
}

function signIn (req, res) {
  User.findOne({ userName: req.body.userName.toLowerCase(), password: bcrypt.hashSync(req.body.password + ' ' + config.SECRET_USER, config.SALT) }).select({ _id: 1, fullName: 1, userName: 1, rol: 1, price: 1 }).exec((err, user) => {
    if (err) return res.status(500).send({ message: `Error al realizar la petición ${err}` })
    if (!user) return res.status(404).send({ message: `La contraseña y/o el usuario son incorrectos.` })
    User.update({ _id: user._id }, { lastDateLog: Date.now() }, (err, affected, res) => {
      if (err) console.log(`Error al realizar la petición ${err}`)
    })
    let loginToken = service.createToken(user, 14)
    req.session.authUser = { fullName: user.fullName, userName: user.userName }
    req.session.authToken = loginToken
    return res.status(200).send({ message: 'Te has logueado correctamente', token: loginToken, user: { fullName: user.fullName, userName: user.userName } })
  })
}

function signUp (req, res) {
  User.findOne({ userName: req.body.userName.toLowerCase() }, (err, userf) => {
    if (err) return res.status(500).send({ message: err })
    if (userf) return res.status(404).send({ message: 'El usuario ya existe' })

    const user = new User({
      userName: req.body.userName,
      fullName: req.body.fullName,
      password: req.body.password
    })

    user.save((err, userStored) => {
      if (err) return res.status(500).send({ message: `Error al crear el usuario: ${err}` })
      // return res.status(201).send({ token: service.createToken(user,14), user: {displayName: user.displayName, email: user.email} })

      let loginToken = service.createToken(user, 14)
      req.session.authUser = { fullName: user.fullName, userName: user.userName }
      req.session.authToken = loginToken
      return res.status(201).send({ token: loginToken, user: { fullName: user.fullName, userName: user.userName } })
    })
  })
}

function logOut (req, res) {
  delete req.session.authUser
  delete req.session.authToken
  res.status(200).send({ ok: true })
}

function changePasword (req, res) {
  User.findOne({ _id: req.user }, (err, user) => {
    if (err) return res.status(500).send({ message: err })
    if (!user) return res.status(404).send({ message: `No se encontro el usuario.` })

    User.update({ _id: user._id }, {
      password: bcrypt.hashSync(req.body.password + ' ' + config.SECRET_USER, config.SALT)
    }, (err, affected, resp) => {
      if (err) return res.status(500).send({ message: err })
      return res.status(200).send({ message: 'se cambio la contraseña' })
    })
  })
}

module.exports = {
  getUsers,
  getUser,
  saveUser,
  updateUser,
  signIn,
  signUp,
  logOut,
  changePasword
}
