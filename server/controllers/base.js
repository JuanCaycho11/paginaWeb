'use strict'

const Base = require('../models/base')

function saveBase (req, res) {
  let base = new Base()
  base.name = req.body.name
  base.description = req.body.description

  base.save((err, baseStored) => {
    if (err) return res.status(500).send({ message: `Error al guardar en la base de datos ${err}` })
    res.status(200).send({ data: baseStored, message: 'Guardado con exito.' })
  })
}

function getBase (req, res) {
  Base.find({ }).exec((err, bases) => {
    if (err) return res.status(500).send({ message: `Error al realizar la petición ${err}` })
    if (!bases) return res.status(400).send({ message: `No existen registros en la base de datos.` })
    res.status(200).send({ data: bases })
  })
}

function getBaseId (req, res) {
  let baseId = req.params.baseId
  Base.findOne({ _id: baseId }).exec((err, bases) => {
    if (err) return res.status(500).send({ message: `Error al realizar la petición ${err}` })
    if (!bases) return res.status(400).send({ message: `No existen registros en la base de datos.` })
    res.status(200).send({ data: bases })
  })
}

function updateBase (req, res) {
  let baseId = req.params.baseId
  let update = req.body

  Base.findByIdAndUpdate(baseId, update, (err, baseUpdated) => {
    if (err) return res.status(500).send({ message: `Error al actualizar en la base de datos ${err}` })
    res.status(200).send({ data: `Se actualizaron los datos.` })
  })
}

function deleteBase (req, res) {
  let baseId = req.params.baseId

  Base.remove({ _id: baseId }, (err, baseUpdated) => {
    if (err) return res.status(500).send({ message: `Error al eliminar en la base de datos ${err}` })
    res.status(200).send({ data: `Se eliminaron los datos.` })
  })
}

module.exports = {
  saveBase,
  getBase,
  getBaseId,
  updateBase,
  deleteBase
}
