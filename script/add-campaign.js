// Provides a dirty way to add campaigns as we work toward
// archiving this repository. This is not a good practice!

const knexfile = require('../knexfile');
const knex = require('knex')(knexfile['development']);

// get replist


(async() => {
  const result = await knex('campaigns').select()
  console.log(result)
})();