module.exports = {
  port: process.env.PORT || 4000,
  isProd: process.env.NODE_ENV === 'production',
  db:
    process.env.MONGODB_URI ||
    `mongodb://admin:2uofnum5223btiq54bnvict12j@ds259596.mlab.com:59596/heroku_r3nvg1tl`,
  SECRET_USER: 'percepcions7234r7r79wyfwfu9890e1021042314234',
  SALT: '$2a$10$zDJ.bZdOeUGiyWQ9AN1hO.',
  SECRET_TOKEN: 'percepcions287239847234823748',
  SECRET_SESSION: 'sessionpercepcionsdsfuir23485985935983495834'
}
