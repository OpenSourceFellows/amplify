// Routes for getting letter templates
const express = require('express')
const LetterTemplate = require('../../../../db/models/letter-template')
const Handlebars = require('../../../../lib/handlebars')

const router = express.Router()

/**
 * Retrieves a letterTemplate, given its as a query param id
 */
router.get('/:id', async (req, res) => {
  const id = req.params.id

  if (!id) return res.status(404).end()

  try {
    const letterTemplate = await LetterTemplate.query().findById(id)

    if (!letterTemplate) {
      return res.status(404).end()
    }

    return res.status(200).json({ letterTemplate }).end()
  } catch (err) {
    console.error(err)
    return res.status(500).end()
  }
})

/**
 * @params mergeVariables - object
 * @params id             - number, string
 * Renders a template
 */
router.post('/render', async (req, res) => {
  const { mergeVariables, templateId } = req.body

  try {
    const template = await LetterTemplate.query().findById(templateId)

    if (!template) {
      return res.status(404).json({ error: 'Template id does not exist' })
    }

    const letter = Handlebars.render(mergeVariables, template.html)

    return res.status(200).json({ letter })
  } catch (err) {
    console.error(err.message)
    return res.status(500).end()
  }
})

module.exports = router
