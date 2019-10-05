'use strict'

const Register = require('../models/register')

function saveRegister (req, res) {
  let register = new Register()
  register.bill = req.body.bill
  register.dateBill = req.body.dateBill
  register.amouPerc = req.body.amouPerc
  register.datesettlement = req.body.datesettlement
  register.voucher = req.body.voucher
  register.idCustomer = req.body.idCustomer
  register.idBase = req.body.idBase
  register.state = req.body.state
  register.incidence = req.body.incidence

  register.save((err, registerStored) => {
    if (err) return res.status(500).send({ message: `Error al guardar en la register de datos ${err}` })
    res.status(200).send({ data: registerStored, message: 'Guardado con exito.' })
  })
}

function getRegister (req, res) {
  Register.aggregate([{
    $lookup: {
      from: 'bases',
      localField: 'idBase',
      foreignField: '_id',
      as: 'base'
    }
  },
  {
    $unwind: {
      path: '$base',
      preserveNullAndEmptyArrays: true
    }
  },
  {
    $lookup: {
      from: 'customers',
      localField: 'idCustomer',
      foreignField: '_id',
      as: 'customer'
    }
  },
  {
    $unwind: {
      path: '$customer',
      preserveNullAndEmptyArrays: true
    }
  }]).exec((err, registers) => {
    if (err) return res.status(500).send({ message: `Error al realizar la petición ${err}` })
    if (!registers) return res.status(400).send({ message: `No existen registros en la register de datos.` })
    res.status(200).send({ data: registers })
  })
}

function getRegisterId (req, res) {
  let registerId = req.params.registerId
  Register.findOne({ _id: registerId }).exec((err, registers) => {
    if (err) return res.status(500).send({ message: `Error al realizar la petición ${err}` })
    if (!registers) return res.status(400).send({ message: `No existen registros en la register de datos.` })
    res.status(200).send({ data: registers })
  })
}

function updateRegister (req, res) {
  let registerId = req.params.registerId
  let update = req.body

  Register.findByIdAndUpdate(registerId, update, (err, registerUpdated) => {
    if (err) return res.status(500).send({ message: `Error al actualizar en la register de datos ${err}` })
    res.status(200).send({ data: `Se actualizaron los datos.` })
  })
}

function deleteRegister (req, res) {
  let registerId = req.params.registerId

  Register.remove({ _id: registerId }, (err, registerUpdated) => {
    if (err) return res.status(500).send({ message: `Error al eliminar en la register de datos ${err}` })
    res.status(200).send({ data: `Se eliminaron los datos.` })
  })
}

module.exports = {
  saveRegister,
  getRegister,
  getRegisterId,
  updateRegister,
  deleteRegister
}
