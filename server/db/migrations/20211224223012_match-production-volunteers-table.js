const tableName = 'volunteers'

module.exports = {
  async up(knex) {
    // Prepare the table
    await knex.schema.alterTable(tableName, function (table) {
      // Drop unique indexes
      table.dropUnique(['email'])

      // Drop NOT NULL constraints from simple fields
      table.string('name').nullable().alter()
      table.string('email').nullable().alter()
      table.text('physical_address').nullable().alter()

      // Add new nullable simple fields
      table.string('first_name')
      table.string('last_name')
      table.string('street_address')
      table.string('address_two')
      table.string('city')
      table.string('state')
      table.string('zip')
    })

    // Transition the data
    const volunteerList = await knex.select('*').from(tableName)
    for (const volunteer of volunteerList) {
      const nameObj = convertNameStringToObject(volunteer.name)
      const addressObj = convertAddressStringToObject(
        volunteer.physical_address
      )
      await knex(tableName)
        .where({ id: volunteer.id })
        .update({
          ...nameObj,
          ...addressObj
        })
    }

    // Clean up the table
    await knex.schema.alterTable(tableName, function (table) {
      // Drop old columns
      table.dropColumn('name')
      table.dropColumn('physical_address')
    })
  },

  async down(knex) {
    // Prepare the table
    await knex.schema.alterTable(tableName, function (table) {
      // Create simple fields
      table.string('name').notNullable()
      table.text('physical_address').notNullable()

      // Add NOT NULL constraints to simple fields
      table.string('email').notNullable().alter()

      // Add unique indexes
      table.unique(['email'])
    })

    // Transition the data
    const volunteerList = await knex.select('*').from(tableName)
    for (const volunteer of volunteerList) {
      const nameStr = convertNameObjectToString(volunteer)
      const addressStr = convertAddressObjectToString(volunteer)
      await knex(tableName).where({ id: volunteer.id }).update({
        name: nameStr,
        physical_address: addressStr
      })
    }

    // Clean up the table
    await knex.schema.alterTable(tableName, function (table) {
      // Drop old columns
      table.dropColumn('first_name')
      table.dropColumn('last_name')
      table.dropColumn('street_address')
      table.dropColumn('address_two')
      table.dropColumn('city')
      table.dropColumn('state')
      table.dropColumn('zip')
    })
  }
}

function convertAddressStringToObject(addressStr) {
  const reAddress =
    /^((?<line1>[^,]+), )?((?<line2>.+), )?(?<city>[^,]+), (?<state>[^,]+) (?<zip>[\d-]+)$/
  const match = addressStr.match(reAddress)
  if (!match) return null
  return {
    street_address: match.groups.line1,
    address_two: match.groups.line2,
    city: match.groups.city,
    state: match.groups.state,
    zip: match.groups.zip
  }
}

function convertAddressObjectToString({
  street_address: line1,
  address_two: line2,
  city,
  state,
  zip
}) {
  let streets = ''
  if (line1) {
    streets += `${line1}, `
  }
  if (line2) {
    streets += `${line2}, `
  }
  return `${streets}${city}, ${state} ${zip}`
}

function convertNameStringToObject(nameStr) {
  const names = nameStr.split(' ')
  return {
    first_name: names[0],
    last_name: names.slice(1).join(' ')
  }
}

function convertNameObjectToString({
  first_name: firstName,
  last_name: lastName
}) {
  return `${firstName} ${lastName}`
}
