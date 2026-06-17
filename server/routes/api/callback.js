const express = require('express')
const router = express.Router()
const knex = require('knex')

// Need to add passport object for req.user._json object at later time
router.get('callback', async (req, res) => {
  const { phone_number } = req.user._json // Get the phone number from the user object
  const { name, email } = req.user // Get the name and email from the user object

  try {
    // Check if the user already exists in the constituent table
    const existingConstituent = await knex('constituent')
      .where({ email })
      .first()

    if (existingConstituent) {
      // Update the existing constituent with the phone number
      await knex('constituent').where({ email }).update({ phone_number })
    } else {
      // Create a new constituent with the name, email, and phone number
      await knex('constituent').insert({ name, email, phone_number })
    }

    res.redirect('/')
  } catch (error) {
    console.error(error)
    res.status(500).send('Internal server error')
  }
})

module.exports = router
