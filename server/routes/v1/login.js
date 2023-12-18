const express = require('express')
const router = express.Router()
const Admin = require('../../db/models/admin')
const { validatePassword } = require('../../lib/encrypt')
// TODO: Add express-session - correct route
const session = require('express-session')

router.post('/', async (req, res) => {
  const { email, password } = req.body

  try {
    const admin = await Admin.query().findOne({ email })

    if (!admin) {
      return res.status(400).json({ error: 'Invalid username or password' })
    }

    const isMatch = await validatePassword(password, admin.password)

    if (!isMatch) {
      return res.status(400).json({ error: 'Invalid username or password' })
    }

    req.session.admin = admin
    res.status(302).send('Logged in successfully')
  } catch (err) {
    console.error(err)
    res.status(500).send('Server error')
  }
})

module.exports = router
