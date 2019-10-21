const { Nuxt, Builder } = require('nuxt')
const mongoose = require('mongoose')
const config = require('./config')
const bodyParser = require('body-parser')
const session = require('express-session')
const router = require('./routes')
const app = require('express')()
const server = require('http').createServer(app)

mongoose.connect(config.db, (err, res) => {
  if (err) console.log('Error en conectar la base de datos', err)
  console.log('Conexion a la base de datos')
})
app.use(session({
  secret: config.SECRET_SESSION,
  resave: false,
  saveUninitialized: false,
  cookie: { maxAge: 604800000 }
}))

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: false }))

app.use('/api', router)

// We instantiate Nuxt.js with the options
let nuxtCfg = require('../nuxt.config.js')
// nuxtCfg.dev = !config.isProd

const nuxt = new Nuxt(nuxtCfg)
// Start build process in dev mode
if (!config.isProd) {
  const builder = new Builder(nuxt)
  builder.build()
}
app.use(nuxt.render)

// Listen the server
server.listen(config.port, '0.0.0.0')
console.log('Server listening on localhost:' + config.port)
