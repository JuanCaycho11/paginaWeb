'use strict'

const Customer = require('../models/customer')

function saveCustomer (req, res) {
  let customer = new Customer()
  customer.idBase = req.body.idBase
  customer.name = req.body.name
  customer.address = req.body.address
  customer.phone = req.body.phone

  customer.save((err, customerStored) => {
    if (err) return res.status(500).send({ message: `Error al guardar en la customer de datos ${err}` })
    res.status(200).send({ data: customerStored, message: 'Guardado con exito.' })
  })
}

function getCustomer (req, res) {
  Customer.aggregate([{
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
  }]).exec((err, customers) => {
    if (err) return res.status(500).send({ message: `Error al realizar la petición ${err}` })
    if (!customers) return res.status(400).send({ message: `No existen registros en la customer de datos.` })
    res.status(200).send({ data: customers })
  })
}

function getCustomerId (req, res) {
  let customerId = req.params.customerId
  Customer.findOne({ _id: customerId }).exec((err, customers) => {
    if (err) return res.status(500).send({ message: `Error al realizar la petición ${err}` })
    if (!customers) return res.status(400).send({ message: `No existen registros en la customer de datos.` })
    res.status(200).send({ data: customers })
  })
}

function updateCustomer (req, res) {
  let customerId = req.params.customerId
  let update = req.body

  Customer.findByIdAndUpdate(customerId, update, (err, customerUpdated) => {
    if (err) return res.status(500).send({ message: `Error al actualizar en la customer de datos ${err}` })
    res.status(200).send({ data: `Se actualizaron los datos.` })
  })
}

function deleteCustomer (req, res) {
  let customerId = req.params.customerId

  Customer.remove({ _id: customerId }, (err, customerUpdated) => {
    if (err) return res.status(500).send({ message: `Error al eliminar en la customer de datos ${err}` })
    res.status(200).send({ data: `Se eliminaron los datos.` })
  })
}

module.exports = {
  saveCustomer,
  getCustomer,
  getCustomerId,
  updateCustomer,
  deleteCustomer
}
