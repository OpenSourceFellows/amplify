const axios = require('axios')
const letterData = require('./catchup.js')

;(async () => {
  const data = JSON.parse(letterData)

  for (const transaction of data) {
    try {
      const response = await axios.post(
        'https://amplify-hooks-0194518485a8.herokuapp.com/api/checkout/process-transaction',
        {
          data: {
            object: {
              id: transaction.stripe_id
            }
          },
          type: 'payment_intent.succeeded'
        }
      )

      if (response.statusCode == 201) console.log(transaction.stripe_id)
    } catch (error) {
      console.error(error)
    }
  }
})()
