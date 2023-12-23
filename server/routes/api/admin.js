const express = require('express')
const router = express.Router()

// TODO: // PLACEHOLDER ADMIN. Add the correct path
const Admin = require('./path/to/Admin')

router.post('/', async (req, res) => {
  try {
    const admin_data = {
      first_name: req.body.firstName,
      last_name: req.body.lastName,
      email: req.body.email,
      password: req.body.password,
      active: req.body.active,
      created_at: req.body.created_at,
      updated_at: req.body.updated_at
    }

    const newAdmin = await Admin.query().insert(admin_data)

    return res.status(201).json({ admin: newAdmin }).end()
  } catch (error) {
    console.log(error)
    return res.status(500).json({ error: error.message }).end()
  }
})

module.exports = router
