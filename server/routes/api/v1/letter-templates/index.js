// Routes for getting letter templates
const express = require('express')
const LetterTemplate = require('../../../../db/models/letter-template')
const { Lob, /*LobError*/ } = require('../../../../lib/lob')

const router = express.Router()

router.get('/:id', async (req, res) => {
  const id = req.params.id

  if (!id) return res.status(404).end()

  try {
    const letterTemplate = await LetterTemplate.query().findById(id)
    console.log(letterTemplate)
    
    // Once we get the template, we will need the html from lob and sendgrid
    const lob = new Lob()
    const lobTemplate = await lob.template(letterTemplate.lobTemplateId)
    
    letterTemplate.lobHtml = lobTemplate.html
    letterTemplate.lobVersion = lobTemplate.id

    return res.status(200).json({ letterTemplate }).end()
  } catch (err) {
    console.error(err)
    return res.status(500).end()
  }
})

module.exports = router
