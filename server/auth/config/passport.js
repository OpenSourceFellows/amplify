const LocalStrategy = require('passport-local').Strategy
// need a User model in db or something of equivalence (mock import)
const { Admin } = require('../../db/models/admin')
const { validatePassword } = require('../../lib/encrypt')

module.exports = function (passport) {
  passport.use(
    new LocalStrategy(
      {
        // by default, local strategy uses username, we will override with email
        usernameField: 'email'
      },
      async (email, password, done) => {
        try {
          const admin = await Admin.findOne({
            where: { email: email.toLowerCase() }
          })
          if (!admin) {
            return done(null, false, { message: 'Email not found' })
          }
          const isMatch = await validatePassword(password, admin.password)
          if (!isMatch) {
            return done(null, false, { message: 'Incorrect password' })
          }
          return done(null, admin)
        } catch (err) {
          return done(err)
        }
      }
    )
  )

  passport.serializeUser((admin, done) => {
    done(null, admin.id)
  })
  passport.deserializeUser(async (id, done) => {
    try {
      const admin = await Admin.query().findById(id)
      done(null, admin)
    } catch (err) {
      done(err)
    }
  })
}
