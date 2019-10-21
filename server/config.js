module.exports = {
  port: process.env.PORT || 3000,
  isProd: process.env.NODE_ENV === 'production',
  db:'mongodb://localhost:27017/sursa',
  SECRET_USER: 'percepcions7234r7r79wyfwfu9890e1021042314234',
  SALT: '$2a$10$zDJ.bZdOeUGiyWQ9AN1hO.',
  SECRET_TOKEN: 'percepcions287239847234823748',
  SECRET_SESSION: 'sessionpercepcionsdsfuir23485985935983495834'
}
