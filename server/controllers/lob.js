

function verifyRequestAddress(req, res){
	const address = req.body

	// Very rough schema validation
	try {
	  const keys = Object.keys(address || {}).sort()
	  if (!address || keys.length === 0) {
	    throw new Error('Address object cannot be empty')
	  }
      
	  const disallowedKeys = keys.reduce((badKeys, key) => {
	    if (!ALLOWED_ADDRESS_FIELDS.includes(key)) {
	      badKeys.push(key)
	    }
	    return badKeys
	  }, [])
      
	  if (disallowedKeys.length > 0) {
	    throw new Error(
	      `Address object contained unexpected keys: ${JSON.stringify(
		disallowedKeys
	      )}`
	    )
	  }
      
	  if (!(address.line1 || '').trim()) {
	    throw new Error('Address object must contain a primary line (line1)')
	  }
      
	  const { zip } = address
	  if (zip != null && typeof zip !== 'string') {
	    throw new Error('Address object must contain a string-based ZIP code')
	  }
      
	  let zipCode = (zip || '').trim()
	  if (zipCode) {
	    if (!VALID_US_ZIP_CODE_MATCH.test(zipCode)) {
	      throw new Error(
		`Address object contained an invalid ZIP code: ${zipCode}`
	      )
	    }
	  } else if (!((address.city || '').trim() && (address.state || '').trim())) {
	    throw new Error(
	      'Address object must include both city and state, or a ZIP code'
	    )
	  }
	} catch (validationError) {
	  return res.status(400).send({ error: validationError.message })
	}
      
	const { line1, line2, city, state, zip } = address
	// Ensure the ZIP code is at least 5 digits
	const zipCode = zip ? zip.padStart(5, '0') : null
      
	try {
	  const lob = new Lob({ apiKey: getLobApiKey() })
	  const response = await lob.usVerifications.verify({
	    primary_line: line1,
	    secondary_line: line2,
	    city,
	    state,
	    zip_code: zipCode
	  })
      
	  const {
	    deliverability,
	    primary_line: revisedLine1,
	    secondary_line: revisedLine2,
	    components: {
	      city: revisedCity,
	      state: revisedState,
	      zip_code: revisedZip,
	      zip_code_plus_4: revisedZipPlus4,
	      address_type: addressType,
	      record_type: recordType
	    }
	  } = response
      
	  const isUndeliverable =
	    !deliverability || deliverability === 'undeliverable'
	  const isResidential = addressType === 'residential'
	  const isPostOfficeBox = recordType === 'po_box'
	  const isPuertoRico = revisedState === 'PR'
      
	  const deliverable =
	    !isUndeliverable && isResidential && !isPostOfficeBox && !isPuertoRico
	  const warning = DELIVERABILITY_WARNINGS[deliverability] || null
      
	  if (!deliverable) {
	    let errorMessage = 'Address is undeliverable'
	    if (!isUndeliverable) {
	      if (!isResidential) {
		errorMessage = 'Non-residential addresses are not currently supported'
	      } else if (isPostOfficeBox) {
		errorMessage = 'Post office boxes are not currently supported'
	      } else if (isPuertoRico) {
		errorMessage = 'Puerto Rico addresses are not currently supported'
	      }
	    }
      
	    return res.status(400).send({ error: errorMessage })
	  }
      
	  return res.status(200).send({
	    deliverable,
	    warning,
	    revisedAddress: {
	      line1: revisedLine1,
	      line2: revisedLine2 || null,
	      city: revisedCity,
	      state: revisedState,
	      zip: revisedZip + (revisedZipPlus4 ? '-' + revisedZipPlus4 : '')
	    }
	  })
	} catch (error) {
	  // This endpoint should not return anything other than `200` status
	  // codes, even for undeliverable addresses
	  return handleLobError(error, res)
	}
}

export {verifyRequestAddress}