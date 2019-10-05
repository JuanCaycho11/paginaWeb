const express = require('express')
const api = express.Router()

const auth = require('../middleware/auth')
const user = require('../controllers/user')

const base = require('../controllers/base')
const customer = require('../controllers/customer')
const register = require('../controllers/register')

api.post('/signIn', user.signIn)
api.post('/signUp', user.signUp)
api.post('/logOut', user.logOut)

api.post('/changePasword', auth, user.changePasword)

api.get('/user', auth, user.getUsers)
api.get('/user/:userId', auth, user.getUser)
api.post('/user', auth, user.saveUser)
api.put('/user/:userId', auth, user.updateUser)

api.get('/base', auth, base.getBase)
api.get('/base/:baseId', auth, base.getBaseId)
api.post('/base', auth, base.saveBase)
api.put('/base/:baseId', auth, base.updateBase)
api.delete('/base/:baseId', auth, base.deleteBase)

api.get('/customer', auth, customer.getCustomer)
api.get('/customer/:customerId', auth, customer.getCustomerId)
api.post('/customer', auth, customer.saveCustomer)
api.put('/customer/:customerId', auth, customer.updateCustomer)
api.delete('/customer/:customerId', auth, customer.deleteCustomer)

api.get('/register', auth, register.getRegister)
api.get('/register/:registerId', auth, register.getRegisterId)
api.post('/register', auth, register.saveRegister)
api.put('/register/:registerId', auth, register.updateRegister)
api.delete('/register/:registerId', auth, register.deleteRegister)

module.exports = api
