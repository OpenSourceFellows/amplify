const express = require('express')
const router = express.Router()

// const session = require('express-session')
router.get('/logout', (req, res) => {
  try {
    if (req.session) {
      req.session.destroy((err) => {
        if (err) {
          console.error(err)
          res.status(500).send('Error occurred while logging out')
        } else {
          // TODO: wait for session object
          // res.clearCookie('name of cookie');
          res.status(200).send('Logged out successfully')
        }
      })
    } else {
      res.status(200).send('You are already logged out')
    }
  } catch (error) {
    console.error(error)
    res.status(500).send('An unexpected error occurred')
  }
})

module.exports = router
